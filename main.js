// ====================================================================
// DICHIARAZIONE VARIABILI GLOBALI (NECESSARIE)
// ====================================================================
const LANGUAGES = ['it', 'en', 'fr', 'es']; // Lista delle lingue supportate per le bandiere
const LAST_LANG_KEY = 'last_selected_lang'; // Chiave per salvare l'ultima lingua in localStorage
let currentLang = 'it'; // Lingua corrente, inizializzata a 'it'
let audioPlayer, playButton, nearbyPoiButton, nearbyMenuPlaceholder; // Variabili per elementi DOM

// ===========================================
// DATI: Punti di Interesse GPS (DA COMPILARE)
// ⚠️ Consigliato: aumentare 'distanceThreshold' a 10-15m per affidabilità GPS in città!
// ===========================================
// Attenzione le coordinate sono della zona PORTORENO
// in C:\Users\User\Documents\salvataggi_github\ARCO_LOCATIONS_PORTICISANLUCA_js.txt
const ARCO_LOCATIONS = [
    // I tuoi dati GPS:
    { id: 'Arco119', lat: 44.499175, lon: 11.3394638888889, distanceThreshold: 15 },
    { id: 'Arco126b', lat: 44.4992083333333, lon: 11.3399972222222, distanceThreshold: 15 },
    { id: 'Arco132a', lat: 44.499175, lon: 11.3394638888889, distanceThreshold: 15 },
    { id: 'Arco133a', lat: 44.4989861111111, lon: 11.3395166666667, distanceThreshold: 15 },
    { id: 'Arco136b', lat: 44.4992111111111, lon: 11.3400027777778, distanceThreshold: 15 },
    { id: 'Arco142a', lat: 44.4990916666667, lon: 11.3399666666667, distanceThreshold: 15 },
    { id: 'Arco143c', lat: 44.4991888888889, lon: 11.3399694444444, distanceThreshold: 15 },
    { id: 'Arco148', lat: 44.4991555555556, lon: 11.3399916666667, distanceThreshold: 15 },
    { id: 'Arco163', lat: 44.4993055555556, lon: 11.3400611111111, distanceThreshold: 15 },
    { id: 'Arco171b', lat: 44.5000472222222, lon: 11.3376694444444, distanceThreshold: 15 },
    { id: 'Arco180', lat: 44.5000472222222, lon: 11.3376694444444, distanceThreshold: 15 },
    { id: 'Arco182', lat: 44.4992333333333, lon: 11.3400222222222, distanceThreshold: 15 },
    { id: 'Arco183', lat: 44.499025, lon: 11.3399, distanceThreshold: 15 },
    { id: 'Arco186b', lat: 44.4990777777778, lon: 11.3399388888889, distanceThreshold: 15 },
    { id: 'Arco188b', lat: 44.4991416666667, lon: 11.3394777777778, distanceThreshold: 15 },
    { id: 'Arco190', lat: 44.4990888888889, lon: 11.3394194444444, distanceThreshold: 15 },
    { id: 'Arco192c', lat: 44.4992611111111, lon: 11.3400472222222, distanceThreshold: 15 },
    { id: 'Arco201a', lat: 44.4992, lon: 11.3394972222222, distanceThreshold: 15 },
    { id: 'Arco202a', lat: 44.4991416666667, lon: 11.3394777777778, distanceThreshold: 15 },
    { id: 'Arco203b', lat: 44.4992361111111, lon: 11.340025, distanceThreshold: 15 },
    { id: 'Arco208b', lat: 44.4992722222222, lon: 11.3400277777778, distanceThreshold: 15 },
    { id: 'Arco211b', lat: 44.4992472222222, lon: 11.3395083333333, distanceThreshold: 15 },
    { id: 'Arco218b', lat: 44.4990888888889, lon: 11.3394194444444, distanceThreshold: 15 },
    { id: 'Arco252a', lat: 44.5001833333333, lon: 11.3399833333333, distanceThreshold: 15 },
    { id: 'Arco256', lat: 44.4992472222222, lon: 11.3395083333333, distanceThreshold: 15 },
    { id: 'Arco282a', lat: 44.4993027777778, lon: 11.339525, distanceThreshold: 15 },
    { id: 'Arco283a', lat: 44.4992722222222, lon: 11.3396527777778, distanceThreshold: 15 },
    { id: 'Arco306b', lat: 44.4993027777778, lon: 11.339525, distanceThreshold: 15 },
    { id: 'Arco307a', lat: 44.4993916666667, lon: 11.3395222222222, distanceThreshold: 15 },
    { id: 'Arco53c', lat: 44.4996055555556, lon: 11.3395166666667, distanceThreshold: 15 },
];
// ===========================================
// FINE DATI GPS
// ===========================================


// ===========================================
// FUNZIONI UTILITY GENERALI (Lingua e DOM)
// ===========================================

// Funzione per determinare l'ID della pagina corrente
const getCurrentPageId = () => {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);

    if (fileName === '' || fileName.startsWith('index')) {
        return 'home';
    }

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
// FUNZIONI AUDIO (Recuperate)
// ===========================================

const toggleAudioPlayback = function () {
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
// FUNZIONE POI (PULSANTE VERDE) - PLACEHOLDER
// ===========================================

/**
 * Formatta la distanza in metri (m) o chilometri (km).
 */
const formatDistance = (distance) => {
    if (distance < 1000) {
        return `${Math.round(distance)}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
};

// ===========================================
// FUNZIONE POI (PULSANTE VERDE) - LOGICA COMPLETA
// ===========================================

/**
 * Filtra, ordina e genera l'HTML per il menu dei POI vicini.
 */
function updatePoiMenu(locations, userLat, userLon, userLang) {
    const nearbyLocations = [];
    const minProximity = 500; // Distanza massima per essere considerato 'vicino' (500 metri)

    // 1. Calcola la distanza e filtra i POI vicini
    locations.forEach(location => {
        // La funzione calculateDistance deve esistere altrove nel tuo main.js
        const distance = calculateDistance(userLat, userLon, location.lat, location.lon);

        if (distance <= minProximity) {
            nearbyLocations.push({
                ...location,
                distance: distance
            });
        }
    });

    // 2. Ordina per distanza crescente
    nearbyLocations.sort((a, b) => a.distance - b.distance);

    // 3. Genera l'HTML del menu
    let menuHtml = '';

    if (nearbyLocations.length > 0) {
        // Rimuovi i duplicati basati sull'ID per mostrare ogni POI una sola volta
        // Assicurati che l'utente veda ogni POI una sola volta
        const uniquePois = [...new Map(nearbyLocations.map(item => [item['id'], item])).values()];

        // Determina il suffisso corretto del file (es. Arco53-en.html)
        const langSuffix = userLang === 'it' ? '' : `-${userLang}`;

        menuHtml += '<ul class="poi-links">';
        uniquePois.forEach(poi => {
            const distanceText = formatDistance(poi.distance);

            // 🔥 CORREZIONE CRUCIALE: Converti l'ID in minuscolo prima di costruire l'URL
            const fileBaseName = poi.id.toLowerCase();
            const poiLink = `${fileBaseName}${langSuffix}.html`;

            // Formatta l'ID per renderlo leggibile (es. "Arco53" diventa "Arco 53")
            const displayTitle = poi.id.replace(/_/g, ' ').replace(/([a-z])(\d)/i, '$1 $2');

            menuHtml += `<li><a href="${poiLink}">${displayTitle} (${distanceText})</a></li>`;
        });
        menuHtml += '</ul>';

    } else {
        // Nessun POI trovato: mostra un messaggio informativo
        let noPoiMessage;

        switch (userLang) {
            case 'en':
                noPoiMessage = `No Points of Interest found within ${minProximity}m.`;
                break;
            case 'es':
                noPoiMessage = `No se encontraron Puntos de Interés a menos de ${minProximity}m.`;
                break;
            case 'fr':
                noPoiMessage = `Aucun Point d'Intérêt trouvé à moins de ${minProximity}m.`;
                break;
            case 'it':
            default:
                noPoiMessage = `Nessun Punto di Interesse trovato entro ${minProximity}m.`;
                break;
        }

        menuHtml = `<div style="color:white; padding: 20px; text-align: center; font-size: 0.9em;">${noPoiMessage}</div>`;
    }

    // 4. Inietta l'HTML nel placeholder
    if (nearbyMenuPlaceholder) {
        nearbyMenuPlaceholder.innerHTML = menuHtml;
    }
}


// ===========================================
// FUNZIONI DI CARICAMENTO CONTENUTI (loadContent)
// ===========================================

async function loadContent(lang) {
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
        // AGGIORNAMENTO NAVIGAZIONE (Assicurati che l'HTML sia corretto per 'navHome', ecc.)
        if (data.nav) {
            // Determina il suffisso corretto. Per 'it', usiamo '' (es. index.html)
            const langSuffix = lang === 'it' ? '' : `-${lang}`;

            // Lista di tutti gli ID del menu che devono essere aggiornati
            const navLinksData = [
                { id: 'navarco119', key: 'navARCO119', base: 'arco119' },
                { id: 'navarco126b', key: 'navARCO126B', base: 'arco126b' },
                { id: 'navarco132a', key: 'navARCO132A', base: 'arco132a' },
                { id: 'navarco133a', key: 'navARCO133A', base: 'arco133a' },
                { id: 'navarco136b', key: 'navARCO136B', base: 'arco136b' },
                { id: 'navarco142a', key: 'navARCO142A', base: 'arco142a' },
                { id: 'navarco143c', key: 'navARCO143C', base: 'arco143c' },
                { id: 'navarco148', key: 'navARCO148', base: 'arco148' },
                { id: 'navarco163', key: 'navARCO163', base: 'arco163' },
                { id: 'navarco171b', key: 'navARCO171B', base: 'arco171b' },
                { id: 'navarco180', key: 'navARCO180', base: 'arco180' },
                { id: 'navarco182', key: 'navARCO182', base: 'arco182' },
                { id: 'navarco183', key: 'navARCO183', base: 'arco183' },
                { id: 'navarco186b', key: 'navARCO186B', base: 'arco186b' },
                { id: 'navarco188b', key: 'navARCO188B', base: 'arco188b' },
                { id: 'navarco190', key: 'navARCO190', base: 'arco190' },
                { id: 'navarco192c', key: 'navARCO192C', base: 'arco192c' },
                { id: 'navarco201a', key: 'navARCO201A', base: 'arco201a' },
                { id: 'navarco202a', key: 'navARCO202A', base: 'arco202a' },
                { id: 'navarco203b', key: 'navARCO203B', base: 'arco203b' },
                { id: 'navarco208b', key: 'navARCO208B', base: 'arco208b' },
                { id: 'navarco211b', key: 'navARCO211B', base: 'arco211b' },
                { id: 'navarco218b', key: 'navARCO218B', base: 'arco218b' },
                { id: 'navarco249a', key: 'navARCO249A', base: 'arco249a' },
                { id: 'navarco252a', key: 'navARCO252A', base: 'arco252a' },
                { id: 'navarco256', key: 'navARCO256', base: 'arco256' },
                { id: 'navarco282a', key: 'navARCO282A', base: 'arco282a' },
                { id: 'navarco283a', key: 'navARCO283A', base: 'arco283a' },
                { id: 'navarco306b', key: 'navARCO306B', base: 'arco306b' },
                { id: 'navarco307a', key: 'navARCO307A', base: 'arco307a' },
                { id: 'navarco53c', key: 'navARCO53C', base: 'arco53c' },
                // Link pagine speciali
                { id: 'navHome', key: 'navHome', base: 'index' },
                { id: 'navlapide1', key: 'navLAPIDE1', base: 'lapide1' },
                { id: 'navlapide2', key: 'navLAPIDE2', base: 'lapide2' },
                { id: 'navpsontuoso', key: 'navPSONTUOSO', base: 'psontuoso' }
            ];

            // Aggiorna HREF e Testo per tutti i link del menu principale
            navLinksData.forEach(link => {
                const linkElement = document.getElementById(link.id);
                if (linkElement) { // <-- IL CONTROLLO DI ESISTENZA CHE PREVIENE L'ERRORE
                    // Costruzione dell'URL: arco119-en.html O arco119.html
                    linkElement.href = `${link.base}${langSuffix}.html`;

                    // Aggiornamento del testo
                    if (data.nav[link.key]) {
                        linkElement.textContent = data.nav[link.key];
                    }
                } else {
                    // Se vedi questo, devi aggiungere l'ID mancante al tuo HTML
                    console.warn(`[Nav Warning] Elemento di navigazione non trovato con ID: ${link.id}`);
                }
            });

            // 🔥 MOLTO IMPORTANTE: Rimuovi qui TUTTI i vecchi getElementById e updateTextContent
            // che aggiornavano i link di navigazione (navarcoXXX e navHome, navlapide, ecc.).
        }


        // AGGIORNAMENTO NAVIGAZIONE (Assicurati che l'HTML sia corretto per 'navHome', ecc.)


        // AGGIORNAMENTO TESTATA (Titolo e Immagine)
        updateTextContent('pageTitle', pageData.pageTitle);
        // 🔥 FIX: Uso updateHTMLContent per consentire <strong> nell'H1
        updateHTMLContent('headerTitle', pageData.pageTitle);

        // AGGIORNAMENTO IMMAGINE DI FONDO TESTATA (Usando l'ID corretto 'pageImage1')
        const headerImage = document.getElementById('pageImage1');
        if (headerImage && pageData.imageSource1) {
            headerImage.src = pageData.imageSource1;
            headerImage.alt = pageData.pageTitle || "Immagine di testata";
        }


        // AGGIORNAMENTO DEL CONTENUTO (Testi principali)
        // 🔥 FIX: Uso updateHTMLContent per consentire <strong>, <p> ecc. nei testi
        updateHTMLContent('mainText', pageData.mainText || '');
        updateHTMLContent('mainText1', pageData.mainText1 || '');
        updateHTMLContent('mainText2', pageData.mainText2 || '');
        updateHTMLContent('mainText3', pageData.mainText3 || '');
        updateHTMLContent('mainText4', pageData.mainText4 || '');
        updateHTMLContent('mainText5', pageData.mainText5 || '');

        // AGGIORNAMENTO INFORMAZIONI SULLA FONTE E DATA
        if (pageData.sourceText) {
            updateTextContent('infoSource', `Fonte: ${pageData.sourceText}`);
        }
        if (pageData.creationDate) {
            updateTextContent('infoCreatedDate', `Data Creazione: ${pageData.creationDate}`);
        }
        if (pageData.lastUpdate) {
            updateTextContent('infoUpdatedDate', `Ultimo Aggiornamento: ${pageData.lastUpdate}`);
        }

        // AGGIORNAMENTO AUDIO E BOTTONE
        if (audioPlayer && playButton && pageData.audioSource) {
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }
            playButton.textContent = pageData.playAudioButton;
            playButton.dataset.playText = pageData.playAudioButton;
            playButton.dataset.pauseText = pageData.pauseAudioButton;
            audioPlayer.src = pageData.audioSource;
            audioPlayer.load();
            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
        }

        // AGGIORNAMENTO IMMAGINI DINAMICHE (dalla 2 alla 5)
        for (let i = 2; i <= 5; i++) {
            const imageElement = document.getElementById(`pageImage${i}`);
            const imageSource = pageData[`imageSource${i}`];

            if (imageElement) {
                imageElement.src = imageSource || '';
                // Nasconde l'elemento se non c'è una sorgente
                imageElement.style.display = imageSource ? 'block' : 'none';
                imageElement.alt = pageData.pageTitle || `Immagine ${i}`;
            }
        }

        console.log(`✅ Contenuto caricato con successo per la lingua: ${lang} e pagina: ${pageId}`);
        document.body.classList.add('content-loaded');

    } catch (error) {
        console.error('Errore critico nel caricamento dei testi:', error);
        document.body.classList.add('content-loaded');
    }
}


// ===========================================
// FUNZIONI UTILITY PER GPS E POI
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

// Funzione principale che verifica la vicinanza (per reindirizzamento automatico)
const checkProximity = (position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const userLang = currentLang; // <-- Usa la variabile globale aggiornata

    // Logica di reindirizzamento
    /*
    for (const location of ARCO_LOCATIONS) {
        const distance = calculateDistance(userLat, userLon, location.lat, location.lon);

        if (distance <= location.distanceThreshold) {
            console.log(`Vicino a ${location.id}! Distanza: ${distance.toFixed(1)}m`);

            const currentPath = window.location.pathname;

            // 🔥 CORREZIONE: Converti l'ID del POI in minuscolo prima di costruire l'URL
            const fileBaseName = location.id.toLowerCase();
            let targetPage = `${fileBaseName}.html`;

            if (userLang !== 'it') {
                targetPage = `${fileBaseName}-${userLang}.html`;
            }

            if (!currentPath.includes(targetPage)) {
                window.location.href = targetPage;
            }
            return;
        }
    }
    */

    // Logica per aggiornare il menu POI del pulsante verde
    if (nearbyPoiButton) {
        nearbyPoiButton.style.display = 'block';
        if (typeof updatePoiMenu === 'function') {
            updatePoiMenu(ARCO_LOCATIONS, userLat, userLon, userLang);
        }
    }
};

// Funzione di gestione degli errori GPS
const handleGeolocationError = (error) => {
    console.warn(`ERRORE GPS: ${error.code}: ${error.message}`);
    // Se c'è un errore, è meglio nascondere il pulsante POI per evitare confusione
    if (nearbyPoiButton) { nearbyPoiButton.style.display = 'none'; }
};

// Funzione per avviare il monitoraggio GPS
const startGeolocation = () => {
    if (navigator.geolocation) {
        // Avvia il monitoraggio con le opzioni desiderate
        navigator.geolocation.watchPosition(checkProximity, handleGeolocationError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
        console.log("Monitoraggio GPS avviato.");
    } else {
        console.error("Il tuo browser non supporta la geolocalizzazione.");
        if (nearbyPoiButton) { nearbyPoiButton.style.display = 'none'; }
    }
};

// ===========================================
// FUNZIONI LINGUA E BANDIERE
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
        let fileBase = fileName.replace(/-[a-z]{2}\.html$/, '').replace('.html', '');

        if (fileBase === '') fileBase = 'index';

        const newPath = `${fileBase}-${newLang}.html`;

        document.location.href = newPath;
    }
}


// ===========================================
// ASSEGNAZIONE EVENT LISTENER (Menu Hamburger, Pulsante Verde, Audio)
// ===========================================

// main.js - Sostituisci l'intera funzione initEventListeners

function initEventListeners(currentLang) {
    const menuToggle = document.querySelector('.menu-toggle');
    // 🔥 CORREZIONE: Usa l'ID corretto #navBarMain
    const navBarMain = document.getElementById('navBarMain');
    const body = document.body;

    // --- Logica Menu Hamburger Principale ---
    if (menuToggle && navBarMain && !menuToggle.dataset.listenerAttached) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navBarMain.classList.toggle('active');

            // Blocca/Sblocca lo scroll del body
            body.classList.toggle('menu-open');

            // Chiudi il menu POI
            if (nearbyMenuPlaceholder) {
                nearbyMenuPlaceholder.classList.remove('poi-active');
            }
        });

        // Chiudi il menu quando si clicca su un link al suo interno
        navBarMain.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                menuToggle.classList.remove('active');
                navBarMain.classList.remove('active');

                // Rimuovi il blocco dello scroll
                body.classList.remove('menu-open');
            }
        });
        menuToggle.dataset.listenerAttached = 'true';
    }

    // --- Logica Menu Hamburger POI (Pulsante Verde) ---
    if (nearbyPoiButton && nearbyMenuPlaceholder && !nearbyPoiButton.dataset.listenerAttached) {
        nearbyPoiButton.addEventListener('click', () => {
            nearbyMenuPlaceholder.classList.toggle('poi-active');

            // Chiudi il menu principale
            if (menuToggle && navBarMain) {
                menuToggle.classList.remove('active');
                navBarMain.classList.remove('active');
                // IMPORTANTE: Rimuovi il blocco scroll se il menu principale si stava chiudendo
                if (!nearbyMenuPlaceholder.classList.contains('poi-active')) {
                    body.classList.remove('menu-open');
                }
            }

            // Gestione dello scroll quando apri/chiudi il POI menu
            if (nearbyMenuPlaceholder.classList.contains('poi-active')) {
                body.classList.add('menu-open');
            } else {
                // Rilascia solo se il menu principale è già chiuso
                if (!navBarMain.classList.contains('active')) {
                    body.classList.remove('menu-open');
                }
            }
        });

        nearbyMenuPlaceholder.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                nearbyMenuPlaceholder.classList.remove('poi-active');
                // Rimuovi il blocco dello scroll
                body.classList.remove('menu-open');
            }
        });
        nearbyPoiButton.dataset.listenerAttached = 'true';
    }

    // --- Logica Audio ---
    if (audioPlayer && playButton && !playButton.dataset.listenerAttached) {
        playButton.addEventListener('click', toggleAudioPlayback);
        audioPlayer.addEventListener('ended', handleAudioEnded);
        playButton.dataset.listenerAttached = 'true';
    }


    // --- Logica Selettore Lingua (Bandiere) ---
    document.querySelectorAll('.language-selector button').forEach(button => {
        button.removeEventListener('click', handleLanguageChange);
        button.addEventListener('click', handleLanguageChange);
    });
}

// ===========================================
// PUNTO DI INGRESSO (DOM LOADED)
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. ASSEGNAZIONE DEGLI ELEMENTI DOM ALLE VARIABILI GLOBALI
    audioPlayer = document.getElementById('audioPlayer');
    playButton = document.getElementById('playAudio');
    nearbyPoiButton = document.getElementById('nearbyPoiButton');
    nearbyMenuPlaceholder = document.getElementById('nearbyMenuPlaceholder');

    // 2. DETERMINAZIONE LINGUA CORRENTE (LOGICA CORRETTA)

    let finalLang = 'it'; // 🥇 Default di base: Italiano

    // A) Controlla se una lingua è stata salvata dall'ultima visita
    const savedLang = localStorage.getItem(LAST_LANG_KEY);
    if (savedLang && LANGUAGES.includes(savedLang)) {
        finalLang = savedLang;
    }

    // B) Controlla la lingua nell'URL. Se presente, prevale sulla persistenza.
    const urlPath = document.location.pathname;
    const langMatch = urlPath.match(/-([a-z]{2})\.html/);
    if (langMatch && LANGUAGES.includes(langMatch[1])) {
        // Se si naviga a un URL specifico (es. index-fr.html), usiamo quella lingua
        finalLang = langMatch[1];
        // E salviamo la scelta per la prossima navigazione interna (es. clic su POI)
        localStorage.setItem(LAST_LANG_KEY, finalLang);
    }

    // Imposta la lingua globale
    currentLang = finalLang;
    document.documentElement.lang = currentLang; // Aggiorna il tag <html>


    // 3. INIZIALIZZA LA SELEZIONE LINGUA
    updateLanguageSelectorActiveState(currentLang);

    // 4. CARICAMENTO CONTENUTO (maintext)
    loadContent(currentLang);

    // 5. AVVIA IL MONITORAGGIO GPS
    startGeolocation();

    // 6. INIZIALIZZA GLI EVENT LISTENER
    initEventListeners(currentLang);
});