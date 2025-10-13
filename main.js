// ===========================================
// DATI: Punti di Interesse GPS (DA COMPILARE)
// ===========================================
const ARCO_LOCATIONS = [
    // Devi popolare questa lista con le coordinate reali dei tuoi archi.
    // L'ID deve corrispondere al nome del file HTML (es. 'arco119')
    // Esempio:
    // { id: 'arco119', lat: 44.4984, lon: 11.3392, distanceThreshold: 20 }, 
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

        // 6. VISIBILITÀ BOTTONE POI (Senza logica GPS)
        if (nearbyPoiButton && nearbyMenuPlaceholder) {
            nearbyPoiButton.textContent = pageData.nearbyButtonText || 'POI Vicini';
            nearbyPoiButton.style.display = 'block';

            // MOCKUP del contenuto POI (Sostituire con updatePoiMenu(poiList, lang) quando la logica GPS è pronta)
            const mockPoiContent = `
                <ul class="poi-links"><li><a href="#poi1">Stazione (15m)</a></li></ul>
                <div style="color:white; padding: 20px; font-size: 0.8em; border-top: 1px solid rgba(255,255,255,0.1);">Dati POI simulati.</div>
            `;
            nearbyMenuPlaceholder.innerHTML = mockPoiContent;
        }

        // 7. FINALIZZA
        initEventListeners(lang);
        updateLanguageSelectorActiveState(lang); // Assicura che le bandiere siano correttamente attive
        localStorage.setItem(LAST_LANG_KEY, lang);

    } catch (error) {
        console.error('Errore critico nel caricamento dei testi:', error);
    } finally {
        document.body.classList.add('content-loaded');
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

/** Aggiorna lo stato 'active' dei bottoni bandiera. */
function updateLanguageSelectorActiveState(lang) {
    document.querySelectorAll('.language-selector button').forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/** Gestisce il click sulla bandiera e reindirizza alla pagina tradotta. */
function handleLanguageChange(event) {
    const newLang = event.currentTarget.getAttribute('data-lang');

    if (newLang && LANGUAGES.includes(newLang) && newLang !== currentLang) {
        localStorage.setItem(LAST_LANG_KEY, newLang);

        const urlPath = document.location.pathname;
        const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        let fileBase = fileName.replace(/-[a-z]{2}\.html$/, '');

        // Assicura che la base del file sia sempre 'index' se è vuota
        if (fileBase === '') fileBase = 'index';

        // Crea il nuovo percorso: es. index-en.html o meloncello-es.html
        const newPath = `${fileBase}-${newLang}.html`;

        // Reindirizza l'utente
        document.location.href = newPath;
    }
}



// ===========================================
// ASSEGNAZIONE EVENT LISTENER
// ===========================================

function initEventListeners(currentLang) {
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.getElementById('navPlaceholder');

    // --- Logica Menu Hamburger Principale ---
    if (menuToggle && navBar && !menuToggle.dataset.listenerAttached) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navBar.classList.toggle('active');

            // Chiudi il menu POI
            if (nearbyMenuPlaceholder) {
                nearbyMenuPlaceholder.classList.remove('poi-active');
            }
        });

        navBar.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                menuToggle.classList.remove('active');
                navBar.classList.remove('active');
            }
        });
        menuToggle.dataset.listenerAttached = 'true';
    }

    // --- Logica Menu Hamburger POI ---
    if (nearbyPoiButton && nearbyMenuPlaceholder && !nearbyPoiButton.dataset.listenerAttached) {
        nearbyPoiButton.addEventListener('click', () => {
            nearbyMenuPlaceholder.classList.toggle('poi-active');

            // Chiudi il menu principale
            if (menuToggle && navBar) {
                menuToggle.classList.remove('active');
                navBar.classList.remove('active');
            }
        });

        nearbyMenuPlaceholder.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                nearbyMenuPlaceholder.classList.remove('poi-active');
            }
        });
        nearbyPoiButton.dataset.listenerAttached = 'true';
    }

    // --- Logica Audio (Collega le funzioni create sopra) ---
    if (audioPlayer && playButton && !playButton.dataset.listenerAttached) {
        playButton.addEventListener('click', toggleAudioPlayback);
        audioPlayer.addEventListener('ended', handleAudioEnded);
        playButton.dataset.listenerAttached = 'true';
    }


    // --- Logica Selettore Lingua (FIX APPLICATO QUI) ---
    document.querySelectorAll('.language-selector button').forEach(button => {
        // 1. Rimuovi sempre l'event listener precedente per evitare duplicati.
        //    Questo è il FIX principale per i problemi di "blocco" dopo il reindirizzamento.
        button.removeEventListener('click', handleLanguageChange);

        // 2. Aggiungi il nuovo event listener.
        button.addEventListener('click', handleLanguageChange);
    });
}


// ===========================================
// PUNTO DI INGRESSO (DOM LOADED)
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // ASSEGNAZIONE DELLE VARIABILI GLOBALI (CRUCIALE)
    audioPlayer = document.getElementById('audioPlayer');
    playButton = document.getElementById('playAudio');
    nearbyPoiButton = document.getElementById('nearbyPoiButton');
    nearbyMenuPlaceholder = document.getElementById('nearbyMenuPlaceholder');

    const urlPath = document.location.pathname;
    const langMatch = urlPath.match(/-([a-z]{2})\.html/);
    const urlLang = langMatch ? langMatch[1] : 'it';

    currentLang = urlLang;
    loadContent(currentLang);

    // AVVIA IL MONITORAGGIO GPS
    startGeolocation();
});