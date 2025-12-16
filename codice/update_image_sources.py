import os
import json
import csv
import sys

# --- CONFIGURAZIONE ---
# Percorso base dove si trovano le cartelle delle lingue (e i texts.json)
JSON_BASE_PATH = "data/translations" 
# Nome del file manifesto CSV che contiene gli aggiornamenti
IMAGE_MANIFEST_FILE = "manifesto_immagini.csv"
# Lingue da processare (IT, EN, ES, FR per coerenza con QuartierePorto)
LANGUAGES = ['it', 'en', 'es', 'fr']
# Campi immagine da aggiornare nel JSON
IMAGE_FIELDS = ['imageSource1', 'imageSource2', 'imageSource3', 'imageSource4', 'imageSource5']

def update_image_sources():
    """Aggiorna i campi imageSource nei JSON in base al manifesto CSV."""
    
    print("=====================================================")
    print("✨ Inizio Aggiornamento Sorgenti Immagini (PageID incluso)")
    print("=====================================================")
    
    # 1. Carica il manifesto CSV
    manifesto = {}
    if not os.path.exists(IMAGE_MANIFEST_FILE):
        print(f"ERRORE: File manifesto immagini non trovato in {IMAGE_MANIFEST_FILE}.")
        print("Assicurati di creare un file CSV con le colonne: page_id, imageSource1, ...")
        sys.exit(1)

    print(f"Caricamento manifesto da {IMAGE_MANIFEST_FILE}...")
    try:
        with open(IMAGE_MANIFEST_FILE, mode='r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                page_id = row['page_id']
                manifesto[page_id] = {}
                
                for field in IMAGE_FIELDS:
                    if field in row and row[field].strip():
                        image_file = row[field].strip()
                        
                        # --- PUNTO CRUCIALE: AGGIUNTA DELLA PAGINA ID ---
                        # Qui costruiamo il percorso finale che andrà nel JSON.
                        # Formato: [ID_pagina]/[nome_file.ext]
                        # Esempio: "arco126b/foto_principale.jpg"
                        # Questo è il percorso relativo alla cartella Assets/images/
                        final_path = f"{page_id}/{image_file}"
                        # -----------------------------------------------
                        
                        manifesto[page_id][field] = final_path
                        
        print(f"Trovati {len(manifesto)} POI da aggiornare.")
        
    except Exception as e:
        print(f"❌ ERRORE nella lettura del file CSV: {e}")
        sys.exit(1)


    # 2. Aggiorna i file JSON per ogni lingua
    for lang_code in LANGUAGES:
        json_path = os.path.join(JSON_BASE_PATH, lang_code, "texts.json")
        
        if not os.path.exists(json_path):
            print(f"AVVISO: JSON non trovato per '{lang_code}'. Saltato.")
            continue
            
        print(f"\nAggiornamento {lang_code}/texts.json...")
        
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            modified_count = 0
            
            for page_id, page_data in data.items():
                if page_id in manifesto:
                    updates = manifesto[page_id]
                    is_modified = False
                    
                    for field, new_path in updates.items():
                        # L'if è qui per prevenire la scrittura se il valore è già corretto
                        if page_data.get(field) != new_path:
                            data[page_id][field] = new_path
                            is_modified = True
                            
                    if is_modified:
                        modified_count += 1
                        
            # Scrivi il file JSON aggiornato solo se ci sono state modifiche
            if modified_count > 0:
                with open(json_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=4)
                print(f"✅ Aggiornati {modified_count} POI in {lang_code}/texts.json.")
            else:
                print(f"Nessuna modifica necessaria in {lang_code}/texts.json.")


        except Exception as e:
            print(f"❌ ERRORE durante l'aggiornamento di {lang_code}/texts.json: {e}")
            
    print("\n=====================================================")
    print("✅ Aggiornamento sorgenti immagini completato.")
    print("=====================================================")
    
if __name__ == "__main__":
    update_image_sources()