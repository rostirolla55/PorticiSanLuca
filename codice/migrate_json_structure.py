import os
import json
import sys
import re

# --- CONFIGURAZIONE ---
JSON_BASE_PATH = "data/translations"
LANGUAGES = ['it', 'en', 'es', 'fr'] 

# Pattern per identificare un percorso di file (es. "Arco126b.mp3" o "Assets/images/...")
# Questo è usato per determinare se il campo di testo contiene un file path o testo grezzo.
FILE_PATH_PATTERN = re.compile(r'(\.html|\.txt)$', re.IGNORECASE)

def migrate_single_json(lang_code):
    """Esegue la migrazione su un singolo file texts.json per la lingua specificata."""
    json_path = os.path.join(JSON_BASE_PATH, lang_code, "texts.json")
    
    if not os.path.exists(json_path):
        print(f"AVVISO: File JSON non trovato per la lingua '{lang_code}' in: {json_path}. Saltato.")
        return True # Non è un errore critico

    print(f"-> Inizio migrazione per {lang_code}/texts.json...")

    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        modified_data = {}

        for page_id, page_data in data.items():
            print(f"   Processing page: {page_id}")
            new_page_data = page_data.copy()
            
            # 1. Pulizia e standardizzazione dei percorsi Asset (imageSourceX e audioSource)
            
            # --- Audio Source ---
            if 'audioSource' in new_page_data and new_page_data['audioSource']:
                original_path = new_page_data['audioSource']
                # Rimuove prefissi noti e lascia il percorso relativo
                cleaned_path = original_path.replace('Assets/Audio/', '').replace('Assets/Audio\\', '').replace('\\', '/')
                new_page_data['audioSource'] = cleaned_path
                print(f"      AudioSource: '{original_path}' -> '{cleaned_path}'")
                
            # --- Image Sources ---
            for i in range(1, 6): # Itera su imageSource1 a imageSource5
                key = f'imageSource{i}'
                if key in new_page_data and new_page_data[key]:
                    original_path = new_page_data[key]
                    # Rimuove prefissi noti e lascia il percorso relativo
                    cleaned_path = original_path.replace('Assets/images/', '').replace('Assets/images\\', '').replace('\\', '/')
                    new_page_data[key] = cleaned_path
                    print(f"      {key}: '{original_path}' -> '{cleaned_path}'")


            # 2. Gestione e Rimpiazzo dei campi Testo (mainText/mainTextX)
            
            # Rinomina la vecchia chiave 'mainText' in 'mainText1' se presente,
            # per garantire che tutti i blocchi inizino da 1.
            if 'mainText' in new_page_data and 'mainText1' not in new_page_data:
                new_page_data['mainText1'] = new_page_data.pop('mainText')
                print(f"      Rinominato 'mainText' in 'mainText1'.")


            # Rimpiazza il contenuto di testo con i nomi dei file HTML attesi
            for i in range(1, 6): # Itera su mainText1 a mainText5
                key = f'mainText{i}'
                
                if key in new_page_data:
                    current_content = new_page_data[key]
                    
                    # Se il campo e' vuoto, lo lasciamo vuoto.
                    if not current_content.strip():
                        new_page_data[key] = ""
                        continue

                    # Se il campo è già un nome di file (es. se la migrazione è stata parziale), saltiamo.
                    if FILE_PATH_PATTERN.search(current_content):
                        print(f"      {key}: Contiene già un nome di file ({current_content}). Saltato.")
                        continue
                    
                    # Altrimenti, rimpiazziamo il contenuto con il nome del file atteso:
                    # Formato atteso: [lingua]_[id_pagina]_maintext[X].html
                    expected_filename = f"{lang_code}_{page_id}_maintext{i}.html"
                    
                    # Solo per debug:
                    # print(f"      {key}: Contenuto rimpiazzato. Lunghezza originale: {len(current_content)}")
                    
                    new_page_data[key] = expected_filename
            
            modified_data[page_id] = new_page_data

        # 3. Scrittura del file JSON aggiornato
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(modified_data, f, ensure_ascii=False, indent=4)
            
        print(f"✅ Migrazione completata con successo per {lang_code}/texts.json.")
        return True

    except Exception as e:
        print(f"❌ ERRORE CRITICO durante la migrazione di {lang_code}/texts.json: {e}")
        return False


def main():
    """Funzione principale per lanciare la migrazione su tutte le lingue."""
    print("=====================================================")
    print("🚀 Inizio Script di Migrazione Struttura JSON")
    print("=====================================================")
    print("ASSICURATI DI AVER FATTO UN BACKUP DEI TUOI FILE JSON ORIGINALI.")
    print("=====================================================")
    
    # 1. Controlla che le cartelle esistano
    if not os.path.exists(JSON_BASE_PATH):
        print(f"ERRORE: La directory base JSON '{JSON_BASE_PATH}' non esiste.")
        sys.exit(1)
        
    all_success = True
    for lang in LANGUAGES:
        if not migrate_single_json(lang):
            all_success = False

    if all_success:
        print("\n🎉 TUTTE le migrazioni sono state completate con successo.")
        print("I file JSON sono ora nel formato atteso da QuartierePorto.")
        print("Puoi iniziare a usare tutti gli script di automazione!")
        sys.exit(0)
    else:
        print("\n⚠️ ATTENZIONE: Alcune migrazioni sono fallite. Controlla i messaggi di errore sopra.")
        sys.exit(1)


if __name__ == "__main__":
    main()