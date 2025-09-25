// ===========================================
// DATI: Punti di Interesse GPS
// ===========================================
const ARCO_LOCATIONS = [
    // Devi popolare questa lista con le coordinate reali dei tuoi archi.
    // L'ID deve corrispondere al nome del file HTML (es. 'arco119')
    // Esempio:
    // { id: 'arco119', lat: 44.4984, lon: 11.3392, distanceThreshold: 20 }, 
    // { id: 'arco182', lat: 44.4975, lon: 11.3385, distanceThreshold: 20 },
];
// ===========================================
// FINE DATI GPS
// ===========================================


// Funzione per determinare l'ID della pagina corrente
const getCurrentPageId = () => {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);

    if (fileName === '' || fileName === 'index.html') {
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

// ===========================================
// FUNZIONI UTILITY PER GPS
// ===========================================

// Calcola la distanza tra due coordinate (Formula di Haversine)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Raggio della terra in metri
    const φ1 = lat1 * Math.PI/180; 
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distanza in metri
};

// Funzione principale che verifica la vicinanza
const checkProximity = (position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const userLang = document.documentElement.lang || 'it'; // Ottiene la lingua attuale

    for (const location of ARCO_LOCATIONS) {
        const distance = calculateDistance(userLat, userLon, location.lat, location.lon);

        if (distance <= location.distanceThreshold) {
            console.log(`Vicino a ${location.id}! Distanza: ${distance.toFixed(1)}m`);
            
            // Reindirizza l'utente alla pagina dell'arco nella LINGUA CORRETTA
            const currentPath = window.location.pathname;
            let targetPage = `${location.id}.html`;
            
            if (userLang !== 'it') {
                targetPage = `${location.id}-${userLang}.html`;
            }
            
            // Reindirizza solo se non siamo già sulla pagina corretta (per evitare loop)
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
    // Qui puoi mostrare un messaggio all'utente in caso di fallimento GPS
};


// Funzione per avviare il monitoraggio GPS
const startGeolocation = () => {
    if (navigator.geolocation) {
        // Usa watchPosition per monitorare la posizione continuamente
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
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playAudio');

    if (audioPlayer && playButton) {
        audioPlayer.addEventListener('ended', () => {
            audioPlayer.currentTime = 0;
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
    
    // 💡 AGGIUNTA FONDAMENTALE 1: Salva la lingua selezionata dall'utente nel browser
    localStorage.setItem('userLanguage', lang);

    try {
        const pageId = getCurrentPageId();

        // fetch su JSON (rimane invariato)
        const response = await fetch(`data/translations/${lang}/texts.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const translations = await response.json();

        const data = translations[pageId];

        // ... (Log e gestione errore data non trovati) ...
        if (!data) {
             console.error(`Dati non trovati per la pagina: ${pageId} nella lingua: ${lang}`);
             return;
        }

        // AGGIORNAMENTO DEL CONTENUTO (invariato)
        updateTextContent('pageTitle', data.pageTitle);
        updateTextContent('mainText', data.mainText);
        updateTextContent('mainText1', data.mainText1);
        updateTextContent('mainText2', data.mainText2);
        updateTextContent('mainText3', data.mainText3);
        updateTextContent('mainText4', data.mainText4);
        updateTextContent('mainText5', data.mainText5);

        updateTextContent('playAudio', data.playAudioButton);

        if (audioPlayer) {
            audioPlayer.src = data.audioSource;
        }

        if (playButton) {
            // 1. SALVA I TESTI PLAY/PAUSE
            playButton.dataset.playText = data.playAudioButton;
            playButton.dataset.pauseText = data.pauseAudioButton;

            // 2. APPLICA LO STILE INIZIALE CORRETTO (BLU)
            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
        }

        console.log(`Lingua impostata su: ${lang}`);
        document.documentElement.lang = lang;

    } catch (error) {
        console.error('Errore nel caricamento dei testi:', error);
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

// Imposta la lingua di default (italiano) al caricamento della pagina
window.onload = () => {
    const playButton = document.getElementById('playAudio');

    if (playButton) {
        playButton.addEventListener('click', toggleAudio);
    }

    // 💡 AGGIUNTA FONDAMENTALE 2: Carica la lingua salvata, altrimenti usa 'it'
    const savedLang = localStorage.getItem('userLanguage') || 'it';
    setLanguage(savedLang);
    
    // 💡 AVVIA IL MONITORAGGIO GPS
    startGeolocation();
};