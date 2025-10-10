// ===========================================
// DATI: Punti di Interesse GPS (DA COMPILARE)
// ===========================================
const ARCO_LOCATIONS = [
    // L'ID deve corrispondere al nome del file HTML (es. 'arco119')
    // Nota: Ho corretto gli ID generici (es. 'arco', 'lapide') per puntare a ID specifici che hai nel menu.
    
    { id: 'psontuoso', lat: 44.4906555555556, lon: 11.3292888888889, distancethreshold: 2 },
    { id: 'lapide1', lat: 44.4905777777778, lon: 11.3291777777778, distancethreshold: 2 },
    { id: 'lapide2', lat: 44.4905694444444, lon: 11.3291861111111, distancethreshold: 2 },
    { id: 'arco53c', lat: 44.4904611111111, lon: 11.325975, distancethreshold: 2 },
    // arco52 è un ID mancante nel menu, uso arco53c come fallback
    { id: 'arco53c', lat: 44.4904611111111, lon: 11.325975, distancethreshold: 2 }, 
    { id: 'arco53c', lat: 44.4895444444444, lon: 11.3256527777778, distancethreshold: 2 },
    { id: 'arco53c', lat: 44.4905555555556, lon: 11.3260166666667, distancethreshold: 2 },
    { id: 'arco119', lat: 44.4899083333333, lon: 11.3221305555556, distancethreshold: 2 },
    { id: 'arco119', lat: 44.4899083333333, lon: 11.3223944444444, distancethreshold: 2 },
    { id: 'arco119', lat: 44.4899416666667, lon: 11.3221583333333, distancethreshold: 2 },
    // arco126 è un ID mancante nel menu, uso arco126b come fallback
    { id: 'arco126b', lat: 44.4898138888889, lon: 11.3217194444444, distancethreshold: 2 },
    { id: 'arco126b', lat: 44.4898166666667, lon: 11.3216722222222, distancethreshold: 2 },
    { id: 'arco126b', lat: 44.4898166666667, lon: 11.3216722222222, distancethreshold: 2 },
    { id: 'arco132a', lat: 44.4897666666667, lon: 11.3214361111111, distancethreshold: 2 },
    { id: 'arco132a', lat: 44.4897666666667, lon: 11.3214361111111, distancethreshold: 2 },
    { id: 'arco132a', lat: 44.489775, lon: 11.3214083333333, distancethreshold: 2 },
    // arco131, arco132, arco133 sono IDs mancanti nel menu, uso i più vicini (arco133a)
    { id: 'arco133a', lat: 44.4897777777778, lon: 11.3214666666667, distancethreshold: 2 }, 
    { id: 'arco133a', lat: 44.4897777777778, lon: 11.3214666666667, distancethreshold: 2 }, 
    { id: 'arco133a', lat: 44.4897611111111, lon: 11.3214111111111, distancethreshold: 2 }, 
    { id: 'arco136b', lat: 44.4897472222222, lon: 11.3212333333333, distancethreshold: 2 },
    { id: 'arco142a', lat: 44.4897111111111, lon: 11.3209055555556, distancethreshold: 2 },
    { id: 'arco142a', lat: 44.4897111111111, lon: 11.3209055555556, distancethreshold: 2 },
    { id: 'arco143c', lat: 44.4896972222222, lon: 11.3208805555556, distancethreshold: 2 },
    { id: 'arco148', lat: 44.4895333333333, lon: 11.3204222222222, distancethreshold: 2 },
    { id: 'arco163', lat: 44.48935, lon: 11.3195666666667, distancethreshold: 2 },
    { id: 'arco171b', lat: 44.4892611111111, lon: 11.3191833333333, distancethreshold: 2 },
    { id: 'arco180', lat: 44.489075, lon: 11.3185305555556, distancethreshold: 2 },
    { id: 'arco182', lat: 44.4890333333333, lon: 11.3184555555556, distancethreshold: 2 },
    { id: 'arco182', lat: 44.4890416666667, lon: 11.3184583333333, distancethreshold: 2 }, // Corretto 'arco' -> 'arco182'
    { id: 'arco183', lat: 44.4890416666667, lon: 11.3184583333333, distancethreshold: 2 },
    { id: 'arco182', lat: 44.489025, lon: 11.3184055555556, distancethreshold: 2 }, // Corretto 'arco' -> 'arco182'
    { id: 'arco186b', lat: 44.4889527777778, lon: 11.3182138888889, distancethreshold: 2 },
    { id: 'arco188b', lat: 44.4889111111111, lon: 11.3180777777778, distancethreshold: 2 },
    { id: 'arco190', lat: 44.4888888888889, lon: 11.3180111111111, distancethreshold: 2 },
    { id: 'arco192c', lat: 44.4889055555556, lon: 11.3180277777778, distancethreshold: 2 },
    { id: 'arco192c', lat: 44.4889083333333, lon: 11.318025, distancethreshold: 2 },
    { id: 'arco201a', lat: 44.488775, lon: 11.3177194444444, distancethreshold: 2 },
    { id: 'arco202a', lat: 44.4888222222222, lon: 11.3176722222222, distancethreshold: 2 },
    { id: 'arco203b', lat: 44.4888416666667, lon: 11.3175222222222, distancethreshold: 2 },
    { id: 'arco208b', lat: 44.4888722222222, lon: 11.3168722222222, distancethreshold: 2 },
    { id: 'arco208b', lat: 44.4888722222222, lon: 11.3168722222222, distancethreshold: 2 },
    { id: 'arco211b', lat: 44.4887916666667, lon: 11.3164027777778, distancethreshold: 2 }, // Corretto da arco211
    { id: 'arco211b', lat: 44.4887916666667, lon: 11.3164027777778, distancethreshold: 2 }, // Corretto 'arco' -> 'arco211b'
    { id: 'arco218b', lat: 44.4888694444444, lon: 11.3161555555556, distancethreshold: 2 }, // Corretto da arco218
    { id: 'arco249a', lat: 44.489775, lon: 11.3150916666667, distancethreshold: 2 },
    { id: 'lapide1', lat: 44.4898805555556, lon: 11.3145527777778, distancethreshold: 2 },
    { id: 'arco256', lat: 44.4899638888889, lon: 11.3144055555556, distancethreshold: 2 },
    { id: 'arco256', lat: 44.4899638888889, lon: 11.3143611111111, distancethreshold: 2 },
    // arco258 è un ID mancante nel menu, uso arco256 come fallback
    { id: 'arco256', lat: 44.4900722222222, lon: 11.3141138888889, distancethreshold: 2 }, 
    { id: 'arco283a', lat: 44.4900694444444, lon: 11.3127166666667, distancethreshold: 2 }, // Corretto da arco283
    { id: 'lapide1', lat: 44.4902444444444, lon: 11.3111833333333, distancethreshold: 2 }, // Corretto 'lapide' -> 'lapide1'
    { id: 'lapide1', lat: 44.4901805555556, lon: 11.3111888888889, distancethreshold: 2 }, // Corretto 'lapide' -> 'lapide1'
    { id: 'lapide2', lat: 44.4901638888889, lon: 11.3112527777778, distancethreshold: 2 }, // Corretto 'lapide' -> 'lapide2'
    { id: 'lapide1', lat: 44.4901694444444, lon: 11.3111944444444, distancethreshold: 2 }, // Corretto 'lapide' -> 'lapide1'
    { id: 'lapide1', lat: 44.4901694444444, lon: 11.3111944444444, distancethreshold: 2 },
    { id: 'lapide2', lat: 44.4899916666667, lon: 11.311125, distancethreshold: 2 }, // Corretto 'lapide' -> 'lapide2'
    { id: 'lapide2', lat: 44.4899916666667, lon: 11.311125, distancethreshold: 2 }, // Corretto 'lapide' -> 'lapide2'
    { id: 'lapide2', lat: 44.4900222222222, lon: 11.3108361111111, distancethreshold: 2 } // Corretto 'lapide' -> 'lapide2'
];

// ===========================================
// NAVIGAZIONE DINAMICA (Generato da REXX, IDs uniformati in minuscolo)
// ===========================================
const NAV_MARKUP_TEMPLATE = `
<button class="menu-toggle" aria-label="Toggle menu">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
</button>

<nav class="nav-bar nav-list">
    <ul class="nav-links">
        <li><a id="navhome" href="#">Home</a></li>
        <li><a id="navarco119" href="#">ARCO119</a></li>
        <li><a id="navarco126b" href="#">ARCO126B</a></li>
        <li><a id="navarco132a" href="#">ARCO132A</a></li>
        <li><a id="navarco133a" href="#">ARCO133A</a></li>
        <li><a id="navarco136b" href="#">ARCO136B</a></li>
        <li><a id="navarco142a" href="#">ARCO142A</a></li>
        <li><a id="navarco143c" href="#">ARCO143C</a></li>
        <li><a id="navarco148" href="#">ARCO148</a></li>
        <li><a id="navarco163" href="#">ARCO163</a></li>
        <li><a id="navarco171b" href="#">ARCO171B</a></li>
        <li><a id="navarco180" href="#">ARCO180</a></li>
        <li><a id="navarco182" href="#">ARCO182</a></li>
        <li><a id="navarco183" href="#">ARCO183</a></li>
        <li><a id="navarco186b" href="#">ARCO186B</a></li>
        <li><a id="navarco188b" href="#">ARCO188B</a></li>
        <li><a id="navarco190" href="#">ARCO190</a></li>
        <li><a id="navarco192c" href="#">ARCO192C</a></li>
        <li><a id="navarco201a" href="#">ARCO201A</a></li>
        <li><a id="navarco202a" href="#">ARCO202A</a></li>
        <li><a id="navarco203b" href="#">ARCO203B</a></li>
        <li><a id="navarco208b" href="#">ARCO208B</a></li>
        <li><a id="navarco211b" href="#">ARCO211B</a></li>
        <li><a id="navarco218b" href="#">ARCO218B</a></li>
        <li><a id="navarco249a" href="#">ARCO249A</a></li>
        <li><a id="navarco252a" href="#">ARCO252A</a></li>
        <li><a id="navarco256" href="#">ARCO256</a></li>
        <li><a id="navarco282a" href="#">ARCO282A</a></li>
        <li><a id="navarco283a" href="#">ARCO283A</a></li>
        <li><a id="navarco306b" href="#">ARCO306B</a></li>
        <li><a id="navarco307a" href="#">ARCO307A</a></li>
        <li><a id="navarco53c" href="#">ARCO53C</a></li>
        <li><a id="navlapide1" href="#">LAPIDE1</a></li>
        <li><a id="navlapide2" href="#">LAPIDE2</a></li>
        <li><a id="navpsontuoso" href="#">PSONTUOSO</a></li>
    </ul>
</nav>
`;

// ===========================================
// VARIABILI GLOBALI (Dichiarate, non inizializzate subito)
// ===========================================
let audioPlayer;
let playButton;
let menuButton; // Riferimento al nuovo bottone
let menuContainer; // Riferimento al nuovo menu

// ===========================================
// FUNZIONI UTILITY
// ===========================================

// Restituisce l'ID base della pagina (es. 'home', 'arco119') leggendolo dall'ID del body
const getCurrentPageId = () => {
    // Legge l'ID dal tag body (es. <body id="home">)
    const bodyId = document.body.id;
    if (bodyId) {
        return bodyId.toLowerCase();
    }
    // Fallback se l'ID non è impostato o è index, usa 'home'
    const path = window.location.pathname;
    let baseId = path.substring(path.lastIndexOf('/') + 1).replace(/-[a-z]{2}\.html/i, '').replace('.html', '').toLowerCase();
    return baseId || 'home';
};

// Aggiorna il testo solo se l'elemento esiste
const updateTextContent = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value || '';
    }
};

// Funzione helper per ottenere il nome del file di destinazione (usata da GPS)
const getDestinationPageName = (pageId, langCode) => {
    // pageId è già in minuscolo (es. 'arco119')
    return `${pageId}-${langCode}.html`;
};

// Funzione helper per il reindirizzamento (Ora definita SOLO qui)
function redirectToPage(targetId, currentLang) {
    const targetPage = getDestinationPageName(targetId, currentLang);
    const currentPath = window.location.pathname;

    // Evita un reindirizzamento infinito
    if (!currentPath.includes(targetPage)) {
        // Nascondi il menu prima di reindirizzare
        hideContextualMenu();
        console.log(`GPS: Reindirizzamento a ${targetPage}`);
        window.location.href = targetPage;
    }
};

// ===========================================
// LOGICA CARICAMENTO CONTENUTI (Requisito 5, 7, 8, 9, 11)
// ===========================================

const loadContent = async (lang) => {
    document.documentElement.lang = lang;

    try {
        const pageId = getCurrentPageId();

        const response = await fetch(`data/translations/${lang}/texts.json`);

        if (!response.ok) {
            console.error(`File di traduzione non trovato per la lingua: ${lang}. Tentativo di fallback su 'it'.`);
            if (lang !== 'it') {
                loadContent('it');
                return;
            }
            throw new Error(`Impossibile caricare i dati per ${lang}.`);
        }

        const data = await response.json();
        const pageData = data[pageId];

        if (!pageData) {
            console.warn(`Dati non trovati per la chiave pagina: ${pageId} nel file JSON per la lingua: ${lang}.`);
            updateTextContent('pageTitle', `[ERRORE] Dati mancanti (${pageId}/${lang})`);
            document.body.classList.add('content-loaded');
            return;
        }

        // AGGIORNAMENTO NAVIGAZIONE (Requisito 5)
        if (data.nav) {
            const suffix = `-${lang}.html`;

            // Aggiorna gli href del menu (USANDO GLI ID IN MINUSCOLO)
            document.getElementById('navarco119').href = `arco119${suffix}`;
            document.getElementById('navarco126b').href = `arco126b${suffix}`;
            document.getElementById('navarco132a').href = `arco132a${suffix}`;
            document.getElementById('navarco133a').href = `arco133a${suffix}`;
            document.getElementById('navarco136b').href = `arco136b${suffix}`;
            document.getElementById('navarco142a').href = `arco142a${suffix}`;
            document.getElementById('navarco143c').href = `arco143c${suffix}`;
            document.getElementById('navarco148').href = `arco148${suffix}`;
            document.getElementById('navarco163').href = `arco163${suffix}`;
            document.getElementById('navarco171b').href = `arco171b${suffix}`;
            document.getElementById('navarco180').href = `arco180${suffix}`;
            document.getElementById('navarco182').href = `arco182${suffix}`;
            document.getElementById('navarco183').href = `arco183${suffix}`;
            document.getElementById('navarco186b').href = `arco186b${suffix}`;
            document.getElementById('navarco188b').href = `arco188b${suffix}`;
            document.getElementById('navarco190').href = `arco190${suffix}`;
            document.getElementById('navarco192c').href = `arco192c${suffix}`;
            document.getElementById('navarco201a').href = `arco201a${suffix}`;
            document.getElementById('navarco202a').href = `arco202a${suffix}`;
            document.getElementById('navarco203b').href = `arco203b${suffix}`;
            document.getElementById('navarco208b').href = `arco208b${suffix}`;
            document.getElementById('navarco211b').href = `arco211b${suffix}`;
            document.getElementById('navarco218b').href = `arco218b${suffix}`;
            document.getElementById('navarco249a').href = `arco249a${suffix}`;
            document.getElementById('navarco252a').href = `arco252a${suffix}`;
            document.getElementById('navarco256').href = `arco256${suffix}`;
            document.getElementById('navarco282a').href = `arco282a${suffix}`;
            document.getElementById('navarco283a').href = `arco283a${suffix}`;
            document.getElementById('navarco306b').href = `arco306b${suffix}`;
            document.getElementById('navarco307a').href = `arco307a${suffix}`;
            document.getElementById('navarco53c').href = `arco53c${suffix}`;
            document.getElementById('navhome').href = `index${suffix}`;
            document.getElementById('navlapide1').href = `lapide1${suffix}`;
            document.getElementById('navlapide2').href = `lapide2${suffix}`;
            document.getElementById('navpsontuoso').href = `psontuoso${suffix}`;

            // Aggiorna il testo dei link (USANDO GLI ID IN MINUSCOLO PER updateTextContent)
            // Mantengo le chiavi JSON (data.nav.navXXXX) come le avevi definite (presumibilmente in maiuscolo nel JSON)
            updateTextContent('navarco119', data.nav.navARCO119);
            updateTextContent('navarco126b', data.nav.navARCO126B);
            updateTextContent('navarco132a', data.nav.navARCO132A);
            updateTextContent('navarco133a', data.nav.navARCO133A);
            updateTextContent('navarco136b', data.nav.navARCO136B);
            updateTextContent('navarco142a', data.nav.navARCO142A);
            updateTextContent('navarco143c', data.nav.navARCO143C);
            updateTextContent('navarco148', data.nav.navARCO148);
            updateTextContent('navarco163', data.nav.navARCO163);
            updateTextContent('navarco171b', data.nav.navARCO171B);
            updateTextContent('navarco180', data.nav.navARCO180);
            updateTextContent('navarco182', data.nav.navARCO182);
            updateTextContent('navarco183', data.nav.navARCO183);
            updateTextContent('navarco186b', data.nav.navARCO186B);
            updateTextContent('navarco188b', data.nav.navARCO188B);
            updateTextContent('navarco190', data.nav.navARCO190);
            updateTextContent('navarco192c', data.nav.navARCO192C);
            updateTextContent('navarco201a', data.nav.navARCO201A);
            updateTextContent('navarco202a', data.nav.navARCO202A);
            updateTextContent('navarco203b', data.nav.navARCO203B);
            updateTextContent('navarco208b', data.nav.navARCO208B);
            updateTextContent('navarco211b', data.nav.navARCO211B);
            updateTextContent('navarco218b', data.nav.navARCO218B);
            updateTextContent('navarco249a', data.nav.navARCO249A);
            updateTextContent('navarco252a', data.nav.navARCO252A);
            updateTextContent('navarco256', data.nav.navARCO256);
            updateTextContent('navarco282a', data.nav.navARCO282A);
            updateTextContent('navarco283a', data.nav.navARCO283A);
            updateTextContent('navarco306b', data.nav.navARCO306B);
            updateTextContent('navarco307a', data.nav.navARCO307A);
            updateTextContent('navarco53c', data.nav.navARCO53C);
            updateTextContent('navhome', data.nav.navHome);
            updateTextContent('navlapide1', data.nav.navLAPIDE1);
            updateTextContent('navlapide2', data.nav.navLAPIDE2);
            updateTextContent('navpsontuoso', data.nav.navPSONTUOSO);
        }

        // AGGIORNAMENTO IMMAGINE DI FONDO TESTATA (Requisito 8)
        const headerImage = document.getElementById('headerImage');
        if (headerImage && pageData.headerImageSource) {
            headerImage.src = pageData.headerImageSource;
        }

        // AGGIORNAMENTO DEL CONTENUTO (Requisito 7: Testi principali)
        updateTextContent('pageTitle', pageData.pageTitle);
        updateTextContent('mainText', pageData.mainText);
        updateTextContent('mainText1', pageData.mainText1);
        updateTextContent('mainText2', pageData.mainText2);
        updateTextContent('mainText3', pageData.mainText3);
        updateTextContent('mainText4', pageData.mainText4);
        updateTextContent('mainText5', pageData.mainText5);

        // AGGIORNAMENTO INFORMAZIONI SULLA FONTE E DATA
        if (pageData.sourceText) {
            updateTextContent('infoSource', `Fonte: ${pageData.sourceText}`);
        }

        if (pageData.creationDate) {
            updateTextContent('infoCreatedDate', pageData.creationDate);
        }

        if (pageData.lastUpdate) {
            updateTextContent('infoUpdatedDate', pageData.lastUpdate);
        }

        // AGGIORNAMENTO AUDIO E BOTTONE (Requisito 3)
        if (audioPlayer && playButton && pageData.audioSource) {
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }

            // Imposta i testi del bottone
            playButton.textContent = pageData.playAudioButton;
            playButton.dataset.playText = pageData.playAudioButton;
            playButton.dataset.pauseText = pageData.pauseAudioButton;

            // Imposta la sorgente audio
            audioPlayer.src = pageData.audioSource;
            audioPlayer.load();

            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
        }

        // AGGIORNAMENTO IMMAGINI DINAMICHE (Requisito 9: Max 5 immagini)
        for (let i = 1; i <= 5; i++) {
            const imageElement = document.getElementById(`pageImage${i}`);
            const imageSource = pageData[`imageSource${i}`];

            if (imageElement) {
                imageElement.src = imageSource || '';
                imageElement.style.display = imageSource ? 'block' : 'none';
            }
        }

        console.log(`✅ Contenuto caricato con successo per la lingua: ${lang} e pagina: ${pageId}`);

        // CORREZIONE FOUT: Rendi visibile il corpo della pagina
        document.body.classList.add('content-loaded');

    } catch (error) {
        console.error('Errore critico nel caricamento dei testi:', error);
        updateTextContent('pageTitle', `[ERRORE CRITICO] Caricamento fallito.`);

        // CORREZIONE FOUT: Rendi comunque visibile il corpo per non lasciare la pagina vuota
        document.body.classList.add('content-loaded');
    }
};
// ===========================================
// FUNZIONI DI GESTIONE EVENTI AUDIO
// ===========================================

const handleAudioClick = function () {
    const currentPlayText = playButton.dataset.playText || "Ascolta";
    const currentPauseText = playButton.dataset.pauseText || "Pausa";

    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = currentPauseText;
        playButton.classList.replace('play-style', 'pause-style');
    } else {
        audioPlayer.pause();
        playButton.textContent = currentPlayText;
        playButton.classList.replace('pause-style', 'play-style');
    }
};

const handleAudioEnded = function () {
    const currentPlayText = playButton.dataset.playText || "Ascolta";
    audioPlayer.currentTime = 0;
    playButton.textContent = currentPlayText;
    playButton.classList.replace('pause-style', 'play-style');
};


// ===========================================
// LOGICA AUDIO E GPS
// ===========================================

// Gestione Play/Pause (Requisito 3)
const setupAudioControl = () => {
    if (audioPlayer && playButton) {

        // Rimuovi listener precedenti (più robusto)
        playButton.removeEventListener('click', handleAudioClick);
        audioPlayer.removeEventListener('ended', handleAudioEnded);

        // Aggiungi listener usando le funzioni nominate
        playButton.addEventListener('click', handleAudioClick);
        audioPlayer.addEventListener('ended', handleAudioEnded);
    }
};

// Funzioni GPS (Requisito 6.3)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

// ===========================================
// FUNZIONI MENU CONTESTUALE GPS
// ===========================================

// 1. Nasconde il bottone e chiude il menu contestuale
const hideContextualMenu = () => {
    if (menuButton) {
        menuButton.style.display = 'none';
        menuButton.onclick = null; // Rimuove il listener di click
    }
    if (menuContainer) {
        menuContainer.classList.remove('active');
    }
};

// 2. Mostra il bottone e popola il menu contestuale con i POI vicini
const renderContextualMenu = (locations, currentLang) => {
    if (!menuButton || !menuContainer) {
        console.error("Mancano gli elementi HTML per il menu contestuale.");
        return;
    }

    // 1. Popola il menu
    let htmlContent = '';

    locations.forEach(location => {
        // L'ID è già in minuscolo (da ARCO_LOCATIONS)
        htmlContent += `
            <li>
                <a href="#" onclick="redirectToPage('${location.id}', '${currentLang}'); return false;">
                    Vai a: ${location.id} (${location.distance} m)
                </a>
            </li>
        `;
    });

    // Inserisci il contenuto nella lista del menu
    const ul = menuContainer.querySelector('ul');
    if (ul) {
        ul.innerHTML = htmlContent;
    }

    // 2. Rendi visibile il bottone e gestisci l'apertura del menu
    menuButton.style.display = 'block';

    // Toggle menu: Se il bottone è cliccato, mostra/nascondi il contenitore
    menuButton.onclick = () => {
        menuContainer.classList.toggle('active');
    };
};

// ===========================================
// FUNZIONI DI GEOLOCALIZZAZIONE (GPS) - Versione Stabile
// ===========================================

const checkProximity = (position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const currentLang = document.documentElement.lang || 'it';

    const currentPageId = document.body.id;
    const isOnHomePage = (currentPageId === 'index' || currentPageId === 'home' || currentPageId === '');

    // Filtro critico: interveniamo solo dalla Home page
    if (!isOnHomePage) {
        // Assicurati che il menu sia nascosto se l'utente si sposta dalla home
        hideContextualMenu();
        return;
    }

    let nearbyLocations = []; // Array per collezionare TUTTI i POI vicini

    // 1. SCORRI TUTTI I POI PER TROVARE QUELLI NEL RAGGIO CONSENTITO
    for (const location of ARCO_LOCATIONS) {
        const distance = calculateDistance(userLat, userLon, location.lat, location.lon);

        if (distance <= 20) { // Usiamo 20 metri come soglia massima
            // Aggiungiamo i dati necessari (ID pagina e distanza)
            nearbyLocations.push({
                id: location.id,
                distance: distance.toFixed(1)
            });
        }
    }

    // 2. ELIMINA I DUPLICATI E ORDINA PER DISTANZA
    const uniqueLocations = nearbyLocations.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        }
        return acc;
    }, []).sort((a, b) => a.distance - b.distance); // Ordina dal più vicino al più lontano


    // 3. DECISIONE SUL DISPLAY
    if (uniqueLocations.length === 0) {
        // Nessun POI vicino
        console.log("GPS: Nessun POI significativo nelle vicinanze.");
        hideContextualMenu();
    } else if (uniqueLocations.length === 1) {
        // UN SOLO POI VICINO: Reindirizzamento immediato
        console.log(`GPS: Trovato un solo POI: ${uniqueLocations[0].id}. Reindirizzamento automatico.`);
        hideContextualMenu(); // Nascondi il bottone prima di reindirizzare
        redirectToPage(uniqueLocations[0].id, currentLang);

    } else {
        // DUE O PIÙ POI VICINI: Mostra il menu di selezione
        console.log(`GPS: Trovati ${uniqueLocations.length} POI concorrenti. Mostro menu.`);
        renderContextualMenu(uniqueLocations, currentLang);
    }
};

const startGeolocation = () => {
    if (navigator.geolocation && ARCO_LOCATIONS.length > 0) {
        navigator.geolocation.watchPosition(checkProximity,
            (error) => console.warn(`ERRORE GPS: ${error.code}: ${error.message}`),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
        console.log("GPS: Monitoraggio avviato.");
    }
};


// ===========================================
// INIZIALIZZAZIONE
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. INIETTA IL MARKUP PER CREARE GLI ELEMENTI
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = NAV_MARKUP_TEMPLATE;
    }

    // 2. ASSEGNAZIONE DELLE VARIABILI GLOBALI
    audioPlayer = document.getElementById('audioPlayer');
    playButton = document.getElementById('playAudio');
    menuButton = document.getElementById('show-contextual-menu');
    menuContainer = document.getElementById('contextual-menu-container');

    // 3. GESTIONE MENU HAMBURGER (Ora gli elementi esistono nel DOM)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
         // Aggiungi la chiusura del menu dopo aver cliccato un link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }

    setupAudioControl();
    startGeolocation();

    // 4. CHIAMATA A loadContent (ORA GLI ELEMENTI DEL MENU SONO STATI CREATI)
    const currentHTMLlang = document.documentElement.lang;
    loadContent(currentHTMLlang);

    // 5. Blocco Google Analytics
    if (typeof gtag === 'function') {
        gtag('set', { 'lingua_pagina': currentHTMLlang });

        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'lingua_pagina': currentHTMLlang
        });
    }
});