import sys
import os
import json
import datetime
import shutil
import re

# --- CONFIGURAZIONI GLOBALI ---
LANGUAGES = ['it', 'en', 'es', 'fr']
NAV_MARKER = '// ** MARKER: START NEW NAV LINKS **' 
POI_MARKER = '// ** MARKER: START NEW POIS **' 
HTML_NAV_MARKER = '</ul>' 
HTML_TEMPLATE_NAME = 'template-it.html' 

LANGUAGE_SWITCHER_MARKER = '<!-- LANGUAGE_SWITCHER_PLACEHOLDER -->'
LANGUAGE_NAMES = {'it': 'Italiano', 'en': 'English', 'es': 'Español', 'fr': 'Français'}

# ----------------------------------------------------------------------------------

def get_translations_for_nav(page_title_it):
    """
    Genera traduzioni per il link di navigazione basandosi sul titolo italiano.
    Invece di placeholder fissi, cerchiamo di mappare termini comuni o mantenere
    il nome proprio se non identificato.
    """
    print(f"DEBUG: Generazione traduzioni dinamiche per: '{page_title_it}'")
    
    # Dizionario di mappatura per termini comuni nei titoli (espandibile)
    mapping = {
        "Template": {"en": "Template", "es": "Plantilla", "fr": "Modèle"},
        "Portico": {"en": "Portico", "es": "Pórtico", "fr": "Portique"},
        "Chiesa": {"en": "Church", "es": "Iglesia", "fr": "Église"},
        "San": {"en": "Saint", "es": "San", "fr": "Saint"},
        "Centrale": {"en": "Power Station", "es": "Central", "fr": "Centrale"}
    }

    translations = {'it': page_title_it}
    
    # Logica di traduzione semplificata:
    # Se il titolo contiene parole note, le traduciamo, altrimenti manteniamo il titolo originale
    # (spesso i nomi dei luoghi non cambiano drasticamente).
    for lang in ['en', 'es', 'fr']:
        translated_title = page_title_it
        for word_it, trans_dict in mapping.items():
            if word_it.lower() in page_title_it.lower():
                # Sostituzione case-insensitive
                reg = re.compile(re.escape(word_it), re.IGNORECASE)
                translated_title = reg.sub(trans_dict[lang], translated_title)
        
        translations[lang] = translated_title

    print(f"✅ Traduzioni generate: {translations}")
    return translations

def update_main_js(repo_root, page_id, nav_key_id, lat, lon, distance):
    """Aggiorna POIS_LOCATIONS e navLinksData in main.js."""
    js_path = os.path.join(repo_root, 'main.js')
    new_poi = f"    {{ id: '{page_id}', lat: {lat}, lon: {lon}, distanceThreshold: {distance} }},"
    new_nav = f"    {{ id: '{nav_key_id}', key: '{nav_key_id}', base: '{page_id}' }},"
    
    new_poi_injection = new_poi + '\n' + POI_MARKER
    new_nav_injection = new_nav + '\n' + NAV_MARKER
    
    try:
        with open(js_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if POI_MARKER in content:
            content = content.replace(POI_MARKER, new_poi_injection)
        if NAV_MARKER in content:
            content = content.replace(NAV_MARKER, new_nav_injection)
            
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ main.js aggiornato.")
    except Exception as e:
        print(f"ERRORE aggiornando main.js: {e}")

def update_texts_json_nav(repo_root, page_id, nav_key_id, translations):
    """Aggiorna i file JSON di traduzione."""
    current_date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    NEW_PAGE_SCHEMA = {
        "pageTitle": "", 
        "mainText": "", "mainText1": "", "mainText2": "", "mainText3": "", "mainText4": "", "mainText5": "",
        "playAudioButton": "Ascolta", "pauseAudioButton": "Pausa",
        "imageSource1": "", "imageSource2": "", "imageSource3": "", "imageSource4": "", "imageSource5": "",
        "headImage": "", "sourceText": "", "creationDate": current_date, "lastUpdate": current_date,
        "audioSource": "" 
    }
    
    for lang in LANGUAGES:
        json_path = os.path.join(repo_root, 'data', 'translations', lang, 'texts.json')
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            data['nav'][nav_key_id] = translations[lang]

            if page_id not in data:
                new_block = NEW_PAGE_SCHEMA.copy()
                new_block['pageTitle'] = translations[lang]
                new_block['audioSource'] = f"{lang}/{page_id}.mp3"
                if lang in ['it', 'en']:
                    new_block['mainText'] = "Inserire testo qui."
                data[page_id] = new_block
            else:
                data[page_id]['pageTitle'] = translations[lang]
                data[page_id]['lastUpdate'] = current_date

            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4, ensure_ascii=False)
            print(f"✅ {lang}/texts.json aggiornato.")
        except Exception as e:
            print(f"ERRORE JSON {lang}: {e}")

def generate_language_switcher(page_id, current_lang):
    """Genera i tag <li> per il cambio lingua."""
    switcher_html = ['<ul class="language-switcher">']
    for lang in LANGUAGES:
        target_file = f'{page_id}-{lang}.html'
        is_active = ' active' if lang == current_lang else ''
        switcher_html.append(f'        <li class="lang-item{is_active}"><a href="{target_file}" lang="{lang}">{LANGUAGE_NAMES[lang]}</a></li>')
    switcher_html.append('    </ul>')
    return '\n'.join(switcher_html)

def update_html_files(repo_root, page_id, nav_key_id, translations, page_title_it):
    """Crea e aggiorna i file HTML."""
    today_version = datetime.datetime.now().strftime("%Y%m%d_%H%M") 
    template_path = os.path.join(repo_root, HTML_TEMPLATE_NAME)

    if not os.path.exists(template_path):
        print("ERRORE: Template non trovato.")
        return

    # Creazione pagine specifiche per lingua
    for lang in LANGUAGES:
        new_page_filename = f'{page_id}-{lang}.html'
        new_page_path = os.path.join(repo_root, new_page_filename)
        if not os.path.exists(new_page_path):
            shutil.copyfile(template_path, new_page_path)
            with open(new_page_path, 'r', encoding='utf-8') as f:
                content = f.read()
            content = content.replace('id="template"', f'id="{page_id}"')
            content = re.sub(r'<html lang="[a-z]{2}">', f'<html lang="{lang}">', content)
            lang_switcher_html = generate_language_switcher(page_id, lang)
            if LANGUAGE_SWITCHER_MARKER in content:
                content = content.replace(LANGUAGE_SWITCHER_MARKER, lang_switcher_html)
            with open(new_page_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Creato {new_page_filename}")

    # Aggiornamento link di navigazione in tutti i file
    all_html_files = [os.path.join(repo_root, f) for f in os.listdir(repo_root) if f.endswith('.html')]
    for existing_path in all_html_files:
        filename = os.path.basename(existing_path)
        if filename == HTML_TEMPLATE_NAME: continue 
        try:
            with open(existing_path, 'r', encoding='utf-8') as f:
                content = f.read()
            nav_link_to_insert = f'        <li><a id="{nav_key_id}" href="{page_id}.html">{{{{ {nav_key_id} }}}}</a></li>'
            if HTML_NAV_MARKER in content and nav_link_to_insert not in content:
                content = content.replace(HTML_NAV_MARKER, nav_link_to_insert + '\n    ' + HTML_NAV_MARKER)
            content = re.sub(r'main\.js\?v=([0-9A-Z_]*)', f'main.js?v={today_version}', content)
            with open(existing_path, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"ERRORE HTML {filename}: {e}")

def main():
    if len(sys.argv) != 8:
        sys.exit(1)
    page_id, nav_key_id, page_title_it, lat, lon, distance, repo_root = sys.argv[1:8]
    
    translations = get_translations_for_nav(page_title_it)
    update_texts_json_nav(repo_root, page_id, nav_key_id, translations)
    update_main_js(repo_root, page_id, nav_key_id, lat, lon, distance)
    update_html_files(repo_root, page_id, nav_key_id, translations, page_title_it)

if __name__ == "__main__":
    main()