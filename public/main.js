// ===========================================
// DATI: Punti di Interesse GPS (DA COMPILARE)
// ===========================================
const ARCO_LOCATIONS = [
    // Devi popolare questa lista con le coordinate reali dei tuoi archi.
    // L'ID deve corrispondere al nome del file HTML (es. 'arco119')
    // Esempio:
    // { id: 'arco119', lat: 44.4984, lon: 11.3392, distanceThreshold: 20 },
    // Chiesa_Santa_Caterina_di_Saragozza
    { id: 'Chiesa_Santa_Caterina_di_Saragozza', lat: 44.4899888888889, lon: 11.3327638888889, distanceThreshold: 2 },
    // Chiesa_Santa_Caterina_di_Saragozza
    { id: 'Chiesa_Santa_Caterina_di_Saragozza', lat: 44.4900444444444, lon: 11.3328472222222, distanceThreshold: 2 },
    // Chiesa_Santa_Caterina_di_Saragozza
    { id: 'Chiesa_Santa_Caterina_di_Saragozza', lat: 44.4900305555556, lon: 11.3328472222222, distanceThreshold: 2 },
    // Numero_civico_vecchio_di_Saragozza
    { id: 'Numero_civico_vecchio_di_Saragozza', lat: 44.4900055555556, lon: 11.3328444444444, distanceThreshold: 2 },
    // Rione_Falansterio
    { id: 'Rione_Falansterio', lat: 44.4903861111111, lon: 11.3311861111111, distanceThreshold: 2 },
    // Rione_Falansterio
    { id: 'Rione_Falansterio', lat: 44.4903944444444, lon: 11.3310305555556, distanceThreshold: 2 },
    // Arco_Bonaccorsi
    { id: 'Arco_Bonaccorsi', lat: 44.4906555555556, lon: 11.3292888888889, distanceThreshold: 2 },
    // Lapide_Saragozza_inizio
    { id: 'Lapide_Saragozza_inizio', lat: 44.4905777777778, lon: 11.3291777777778, distanceThreshold: 2 },
    // Lapide_Saragozza_inizio
    { id: 'Lapide_Saragozza_inizio', lat: 44.4905694444444, lon: 11.3291861111111, distanceThreshold: 2 },
    // Arco53
    { id: 'Arco53', lat: 44.4904611111111, lon: 11.325975, distanceThreshold: 2 },
    // Arco52
    { id: 'Arco52', lat: 44.4904611111111, lon: 11.325975, distanceThreshold: 2 },
    // Arco53
    { id: 'Arco53', lat: 44.4895444444444, lon: 11.3256527777778, distanceThreshold: 2 },
    // Arco53
    { id: 'Arco53', lat: 44.4905555555556, lon: 11.3260166666667, distanceThreshold: 2 },
    // Arco119
    { id: 'Arco119', lat: 44.4899083333333, lon: 11.3221305555556, distanceThreshold: 2 },
    // Arco119
    { id: 'Arco119', lat: 44.4899083333333, lon: 11.3223944444444, distanceThreshold: 2 },
    // Arco119
    { id: 'Arco119', lat: 44.4899416666667, lon: 11.3221583333333, distanceThreshold: 2 },
    // Arco126
    { id: 'Arco126', lat: 44.4898138888889, lon: 11.3217194444444, distanceThreshold: 2 },
    // Arco126
    { id: 'Arco126', lat: 44.4898166666667, lon: 11.3216722222222, distanceThreshold: 2 },
    // Arco126
    { id: 'Arco126', lat: 44.4898166666667, lon: 11.3216722222222, distanceThreshold: 2 },
    // Arco132a
    { id: 'Arco132a', lat: 44.4897666666667, lon: 11.3214361111111, distanceThreshold: 2 },
    // Arco132a
    { id: 'Arco132a', lat: 44.4897666666667, lon: 11.3214361111111, distanceThreshold: 2 },
    // Arco132a
    { id: 'Arco132a', lat: 44.489775, lon: 11.3214083333333, distanceThreshold: 2 },
    // Arco131
    { id: 'Arco131', lat: 44.4897777777778, lon: 11.3214666666667, distanceThreshold: 2 },
    // Arco132
    { id: 'Arco132', lat: 44.4897777777778, lon: 11.3214666666667, distanceThreshold: 2 },
    // Arco133
    { id: 'Arco133', lat: 44.4897611111111, lon: 11.3214111111111, distanceThreshold: 2 },
    // Arco136b
    { id: 'Arco136b', lat: 44.4897472222222, lon: 11.3212333333333, distanceThreshold: 2 },
    // Arco142a
    { id: 'Arco142a', lat: 44.4897111111111, lon: 11.3209055555556, distanceThreshold: 2 },
    // Arco142a
    { id: 'Arco142a', lat: 44.4897111111111, lon: 11.3209055555556, distanceThreshold: 2 },
    // Arco143c
    { id: 'Arco143c', lat: 44.4896972222222, lon: 11.3208805555556, distanceThreshold: 2 },
    // Arco148
    { id: 'Arco148', lat: 44.4895333333333, lon: 11.3204222222222, distanceThreshold: 2 },
    // Arco163
    { id: 'Arco163', lat: 44.48935, lon: 11.3195666666667, distanceThreshold: 2 },
    // Arco171
    { id: 'Arco171', lat: 44.4892611111111, lon: 11.3191833333333, distanceThreshold: 2 },
    // Arco180
    { id: 'Arco180', lat: 44.489075, lon: 11.3185305555556, distanceThreshold: 2 },
    // Arco182
    { id: 'Arco182', lat: 44.4890333333333, lon: 11.3184555555556, distanceThreshold: 2 },
    // Arco
    { id: 'Arco', lat: 44.4890416666667, lon: 11.3184583333333, distanceThreshold: 2 },
    // Arco183
    { id: 'Arco183', lat: 44.4890416666667, lon: 11.3184583333333, distanceThreshold: 2 },
    // Arco
    { id: 'Arco', lat: 44.489025, lon: 11.3184055555556, distanceThreshold: 2 },
    // Arco186b
    { id: 'Arco186b', lat: 44.4889527777778, lon: 11.3182138888889, distanceThreshold: 2 },
    // Arco188
    { id: 'Arco188', lat: 44.4889111111111, lon: 11.3180777777778, distanceThreshold: 2 },
    // Arco190
    { id: 'Arco190', lat: 44.4888888888889, lon: 11.3180111111111, distanceThreshold: 2 },
    // Arco192
    { id: 'Arco192', lat: 44.4889055555556, lon: 11.3180277777778, distanceThreshold: 2 },
    // Arco192c
    { id: 'Arco192c', lat: 44.4889083333333, lon: 11.318025, distanceThreshold: 2 },
    // Arco201a
    { id: 'Arco201a', lat: 44.488775, lon: 11.3177194444444, distanceThreshold: 2 },
    // Arco202a
    { id: 'Arco202a', lat: 44.4888222222222, lon: 11.3176722222222, distanceThreshold: 2 },
    // Arco203b
    { id: 'Arco203b', lat: 44.4888416666667, lon: 11.3175222222222, distanceThreshold: 2 },
    // Arco208
    { id: 'Arco208', lat: 44.4888722222222, lon: 11.3168722222222, distanceThreshold: 2 },
    // Arco208b
    { id: 'Arco208b', lat: 44.4888722222222, lon: 11.3168722222222, distanceThreshold: 2 },
    // Arco211
    { id: 'Arco211', lat: 44.4887916666667, lon: 11.3164027777778, distanceThreshold: 2 },
    // Arco
    { id: 'Arco', lat: 44.4887916666667, lon: 11.3164027777778, distanceThreshold: 2 },
    // Arco218
    { id: 'Arco218', lat: 44.4888694444444, lon: 11.3161555555556, distanceThreshold: 2 },
    // Arco249a
    { id: 'Arco249a', lat: 44.489775, lon: 11.3150916666667, distanceThreshold: 2 },
    // Lapide1
    { id: 'Lapide1', lat: 44.4898805555556, lon: 11.3145527777778, distanceThreshold: 2 },
    // Arco256
    { id: 'Arco256', lat: 44.4899638888889, lon: 11.3144055555556, distanceThreshold: 2 },
    // Arco256
    { id: 'Arco256', lat: 44.4899638888889, lon: 11.3143611111111, distanceThreshold: 2 },
    // Arco258
    { id: 'Arco258', lat: 44.4900722222222, lon: 11.3141138888889, distanceThreshold: 2 },
    // Arco283
    { id: 'Arco283', lat: 44.4900694444444, lon: 11.3127166666667, distanceThreshold: 2 },
    // lapide
    { id: 'lapide', lat: 44.4902444444444, lon: 11.3111833333333, distanceThreshold: 2 },
    // Lapide
    { id: 'Lapide', lat: 44.4901805555556, lon: 11.3111888888889, distanceThreshold: 2 },
    // Lapide
    { id: 'Lapide', lat: 44.4901638888889, lon: 11.3112527777778, distanceThreshold: 2 },
    // Lapide
    { id: 'Lapide', lat: 44.4901694444444, lon: 11.3111944444444, distanceThreshold: 2 },
    // PSontuoso
    { id: 'PSontuoso', lat: 44.4901694444444, lon: 11.3111944444444, distanceThreshold: 2 },
    // Lapide
    { id: 'Lapide', lat: 44.4899916666667, lon: 11.311125, distanceThreshold: 2 },
    // Lapide
    { id: 'Lapide', lat: 44.4899916666667, lon: 11.311125, distanceThreshold: 2 },
    // Lapide
    { id: 'Lapide', lat: 44.4900222222222, lon: 11.3108361111111, distanceThreshold: 2 }

];
// ===========================================
// FINE DATI GPS
// ===========================================


// Funzione per determinare l'ID della pagina corrente
const getCurrentPageId = () => {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);

    // 🔥 FIX: Gestisce index.html o index-xx.html
    if (fileName === '' || fileName.startsWith('index')) {
        return 'home';
    }

    // Rimuove l'estensione e qualsiasi suffisso di lingua (-en, -fr, ecc.)
    return fileName.replace(/-[a-z]{2}\.html/i, '').replace('.html', '').toLowerCase();
};

// Funzione flessibile per aggiornare il contenuto solo se l'elemento esiste
const updateTextContent = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value || '';
    }
};

// Funzione flessibile per iniettare HTML solo se l'elemento esiste
const updateHTMLContent = (id, htmlContent) => {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = htmlContent || '';
    }
};

// ===========================================
// FUNZIONI UTILITY PER GPS
// ===========================================

// Calcola la distanza tra due coordinate (Formula di Haversine)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Raggio della terra in metri
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distanza in metri
};

// Funzione principale che verifica la vicinanza
const checkProximity = (position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const userLang = document.documentElement.lang || 'it';

    for (const location of ARCO_LOCATIONS) {
        const distance = calculateDistance(userLat, userLon, location.lat, location.lon);

        if (distance <= location.distanceThreshold) {
            console.log(`Vicino a ${location.id}! Distanza: ${distance.toFixed(1)}m`);

            const currentPath = window.location.pathname;
            let targetPage = `${location.id}.html`;

            if (userLang !== 'it') {
                targetPage = `${location.id}-${userLang}.html`;
            }

            if (!currentPath.includes(targetPage)) {
                window.location.href = targetPage;
            }
            return;
        }
    }
};

// Funzione di gestione degli errori GPS
const handleGeolocationError = (error) => {
    console.warn(`ERRORE GPS: ${error.code}: ${error.message}`);
};

// Funzione per avviare il monitoraggio GPS
const startGeolocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(checkProximity, handleGeolocationError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
        console.log("Monitoraggio GPS avviato.");
    } else {
        console.error("Il tuo browser non supporta la geolocalizzazione.");
    }
};

// ===========================================
// FINE FUNZIONI UTILITY PER GPS
// ===========================================


// Gestione del menu a scomparsa e dell'evento 'ended'
document.addEventListener('DOMContentLoaded', () => {
    // Si noti che .nav-list è ora dentro l'HTML iniettato
    // La gestione degli eventi per il toggle deve essere aggiornata o gestita dopo l'iniezione.

    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playAudio');

    if (audioPlayer && playButton) {
        audioPlayer.addEventListener('ended', () => {
            audioPlayer.currentTime = 0;
            // Usa il testo play salvato in data-
            playButton.textContent = playButton.dataset.playText || "Ascolta l'audio!";
            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
        });
    }
});


// Funzione principale per impostare la lingua
const setLanguage = async (lang) => {

    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playAudio');

    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }

    // 🚀 Salva e imposta la lingua immediatamente
    localStorage.setItem('userLanguage', lang);
    document.documentElement.lang = lang;

    try {
        const pageId = getCurrentPageId();

        // fetch su JSON 
        const response = await fetch(`data/translations/${lang}/texts.json`);

        if (!response.ok) {
            throw new Error(`File di traduzione non trovato per la lingua: ${lang}`);
        }

        const translations = await response.json();
        const data = translations[pageId];

        // ==========================================================
        // 🔥 LOGICA: INIETTA LA BARRA DI NAVIGAZIONE COMPLETA
        // ==========================================================
        if (translations.nav && translations.nav.nav_content) {
            // Iniettiamo il blocco nav_content generato da Rexx nell'elemento con ID 'nav-container'
            updateHTMLContent('nav-container', translations.nav.nav_content);

            // Ricolleghiamo il toggle del menu (se presente e necessario)
            const menuToggle = document.querySelector('.menu-toggle');
            const navList = document.querySelector('.nav-list');
            if (menuToggle && navList) {
                menuToggle.addEventListener('click', () => {
                    navList.classList.toggle('active');
                });
            }
        } else {
            console.warn("Il blocco 'nav' o la chiave 'nav_content' non sono stati trovati nel JSON.");
        }
        // ==========================================================

        if (!data) {
            console.error(`Dati non trovati per la pagina: ${pageId} nella lingua: ${lang}. Verifica il file texts.json.`);
            updateTextContent('pageTitle', `[ERRORE] Testi ${lang} non trovati per questa pagina.`);
            return;
        }

        // AGGIORNAMENTO DEL CONTENUTO DELLA PAGINA
        updateTextContent('pageTitle', data.pageTitle);
        updateTextContent('mainText', data.mainText);
        updateTextContent('mainText1', data.mainText1);
        updateTextContent('mainText2', data.mainText2);
        updateTextContent('mainText3', data.mainText3);
        updateTextContent('mainText4', data.mainText4);
        updateTextContent('mainText5', data.mainText5);

        // 🔥 AGGIORNAMENTO INFORMAZIONI SULLA FONTE E DATA
        if (data.sourceText) {
            // Usiamo il testo come etichetta e valore
            updateTextContent('infoSource', `Fonte: ${data.sourceText}`);
        }

        if (data.creationDate) {
            updateTextContent('infoCreatedDate', data.creationDate);
        }

        if (data.lastUpdate) {
            updateTextContent('infoUpdatedDate', data.lastUpdate);
        }


        updateTextContent('playAudio', data.playAudioButton);

        if (audioPlayer) {
            audioPlayer.src = data.audioSource;
        }

        if (playButton) {
            // SALVA I TESTI PLAY/PAUSE
            playButton.dataset.playText = data.playAudioButton;
            playButton.dataset.pauseText = data.pauseAudioButton;

            // APPLICA LO STILE INIZIALE CORRETTO (BLU)
            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
        }

        console.log(`Lingua impostata su: ${lang}`);

    } catch (error) {
        // Gestisce gli errori di rete o parsing JSON
        console.error('Errore critico nel caricamento dei testi:', error);
        updateTextContent('pageTitle', `[ERRORE DI CARICAMENTO] Lingua ${lang} fallita. Controlla i file JSON.`);
    }
};


// Funzione per gestire la riproduzione e pausa dell'audio (invariato)
const toggleAudio = () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playAudio');

    if (!audioPlayer || !playButton) return;

    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = playButton.dataset.pauseText;
        playButton.classList.remove('play-style');
        playButton.classList.add('pause-style');
    } else {
        audioPlayer.pause();
        playButton.textContent = playButton.dataset.playText;
        playButton.classList.remove('pause-style');
        playButton.classList.add('play-style');
    }
};

// Imposta la lingua di default al caricamento della pagina
window.onload = () => {
    const playButton = document.getElementById('playAudio');

    if (playButton) {
        playButton.addEventListener('click', toggleAudio);
    }

    // Carica la lingua salvata, altrimenti usa 'it'
    const savedLang = localStorage.getItem('userLanguage') || 'it';
    setLanguage(savedLang);

    // AVVIA IL MONITORAGGIO GPS
    startGeolocation();
};