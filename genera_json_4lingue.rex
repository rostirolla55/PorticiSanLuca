/* GENERA_JSON_4_LINGUE.REX - Implementazione con rc = LineOut(...) e accesso VALUE() */
Parse ARG LangList TemplateDir NavJSON

rc = 0

/* ---------------------------------------------------- */
/* 1. CONFIGURAZIONE */
/* ---------------------------------------------------- */
PAGINE = "arco119 arco126b arco132a arco133a arco136b arco142a arco143c arco148 arco163 arco171b arco180 arco182 arco183 arco186b arco188b arco190 arco192c arco201a arco202a arco203b arco208b arco211b arco218b arco249a arco252a arco256 arco282a arco283a arco306b arco307a arco53c lapide1 lapide2 psontuoso"
Pagine. = 0 
PAGES_COUNT = 0
Do i = 1 To WORDS(PAGINE)
    PAGES_COUNT = PAGES_COUNT + 1
    Pagine.PAGES_COUNT = WORD(PAGINE, i)
End

/* Definizione delle 4 lingue: IT, EN, ES, FR */
Langs = .array~of("it", "en", "es", "fr")

/* DATE FISSE */
CreationDate = "30-08-2025"
LastUpdate = "01-10-2025"


/* ---------------------------------------------------- */
/* 2. DATI DI TEMPLATE E TRADUZIONI BOTTONI */
/* ---------------------------------------------------- */

/* TRADUZIONI UNIFORMI (Home e POI) */
audioButton.it.play = "Ascolta l'audio in italiano!"
audioButton.it.pause = "Metti in pausa"
audioButton.it.source = "Archivio Storico del Comune di Bologna."
audioButton.it.audio_path = "Assets/Audio/it"

audioButton.en.play = "Listen to the audio in English!"
audioButton.en.pause = "Pause"
audioButton.en.source = "Historical Archive of the Municipality of Bologna."
audioButton.en.audio_path = "Assets/Audio/en"

audioButton.es.play = "Escucha el audio en español!"
audioButton.es.pause = "Pausa"
audioButton.es.source = "Archivo Histórico del Ayuntamiento de Bolonia."
audioButton.es.audio_path = "Assets/Audio/es"

audioButton.fr.play = "Écoutez l'audio en français!"
audioButton.fr.pause = "Pause"
audioButton.fr.source = "Archives historiques de la municipalité de Bologne."
audioButton.fr.audio_path = "Assets/Audio/fr"


/* ---------------------------------------------------- */
/* 3. CICLO DI GENERAZIONE PER LINGUA */
/* ---------------------------------------------------- */
Do l = 1 To Langs~size
    lang = Langs[l]
    
    DirName = "data\translations\" || lang || "\"
    FileName = DirName || "texts.json"
    
    Say "Generazione del file: " || FileName

    ADDRESS SYSTEM "MKDIR " || DirName
    
    rc = LineOut(FileName) 
    
    /* 1. Scrivi l'apertura del JSON */
    rc = LineOut(FileName, "{")
    
    /* 2. Scrivi il blocco HOME (CON BOTTONI E DATE UNIFORMI) */
    rc = LineOut(FileName, '  "home": {')
    rc = LineOut(FileName, '    "pageTitle": "Home Page Portici San Luca (' || lang || ')",')
    rc = LineOut(FileName, '    "mainText": "Benvenuto nel nuovo progetto PorticiSanLuca. Sostituisci questo testo.",')
    
    /* 🔥 ACCESSO INDIRETTO CON VALUE() */
    rc = LineOut(FileName, '    "playAudioButton": "' || value('audioButton.' || lang || '.play') || '",')
    rc = LineOut(FileName, '    "pauseAudioButton": "' || value('audioButton.' || lang || '.pause') || '",')
    rc = LineOut(FileName, '    "sourceText": "' || value('audioButton.' || lang || '.source') || '",')
    
    /* Date Fisse */
    rc = LineOut(FileName, '    "creationDate": "' || CreationDate || '",')
    rc = LineOut(FileName, '    "lastUpdate": "' || LastUpdate || '",')
    
    rc = LineOut(FileName, '    "audioSource": "' || value('audioButton.' || lang || '.audio_path') || '/Home.mp3"')
    rc = LineOut(FileName, '  },')

    /* 3. Scrivi il blocco NAV (PLACEHOLDER - SOSTITUIRE MANUALMENTE!) */
    rc = LineOut(FileName, '  "nav": {')
    rc = LineOut(FileName, '    "navHome": "Home",')
    rc = LineOut(FileName, '    "navLastre": "Lastre",')
    rc = LineOut(FileName, '    "navPugliole": "Pugliole"')
    rc = LineOut(FileName, '  },')

    
    /* 4. Ciclo per tutte le pagine POI (TUTTO UNIFORME) */
    Do p = 1 To PAGES_COUNT
        key = Pagine.p
        comma = ","
        If p = PAGES_COUNT Then comma = "" 

        /* Determina il nome del file audio */
        audio_name = key
        If LEFT(key, 4) = "arco" Then audio_name = "Arco" || SUBSTR(key, 5) 
        If key = "lapide1" Then audio_name = "Lapide1"
        If key = "lapide2" Then audio_name = "Lapide2"
        If key = "psontuoso" Then audio_name = "PSontuoso"

        /* Inizio blocco POI */
        rc = LineOut(FileName, '  "' || key || '": {')
        
        rc = LineOut(FileName, '    "pageTitle": "' || key || ' - Portico di San Luca",')
        rc = LineOut(FileName, '    "mainText": "Testo base per l''arco o la lapide ' || key || '...",')
        rc = LineOut(FileName, '    "mainText1": "",')
        rc = LineOut(FileName, '    "mainText2": "",')
        rc = LineOut(FileName, '    "mainText3": "",')
        rc = LineOut(FileName, '    "mainText4": "",')
        rc = LineOut(FileName, '    "mainText5": "",')
        
        /* 🔥 ACCESSO INDIRETTO CON VALUE() */
        rc = LineOut(FileName, '    "playAudioButton": "' || value('audioButton.' || lang || '.play') || '",')
        rc = LineOut(FileName, '    "pauseAudioButton": "' || value('audioButton.' || lang || '.pause') || '",')
        
        /* Immagini e Metadati */
        rc = LineOut(FileName, '    "imageSource1": "public/images/' || key || '.jpg",')
        rc = LineOut(FileName, '    "imageSource2": "",')
        rc = LineOut(FileName, '    "imageSource3": "",')
        rc = LineOut(FileName, '    "imageSource4": "",')
        rc = LineOut(FileName, '    "imageSource5": "",')
        rc = LineOut(FileName, '    "sourceText": "' || value('audioButton.' || lang || '.source') || '",')
        
        /* Date Fisse */
        rc = LineOut(FileName, '    "creationDate": "' || CreationDate || '",')
        rc = LineOut(FileName, '    "lastUpdate": "' || LastUpdate || '",')
        
        /* Sorgente Audio */
        rc = LineOut(FileName, '    "audioSource": "' || value('audioButton.' || lang || '.audio_path') || '/' || audio_name || '.mp3"')

        /* Chiusura blocco POI */
        rc = LineOut(FileName, '  }' || comma)
    End
    
    /* 5. Scrivi la chiusura del JSON */
    rc = LineOut(FileName, "}")
    
    /* Chiudi il file */
    rc = LineOut(FileName)
    
    Say "File " || FileName || " generato con successo."
End

Exit 0