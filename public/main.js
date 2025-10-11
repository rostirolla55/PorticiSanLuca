/**
 * Script principale per la gestione della logica di navigazione e caricamento dei contenuti.
 * Questo file risiede nella cartella /public/.
 * @author Gemini, rielaborazione da richieste utente
 */

// ===========================================
// CONSTANTI & SETUP INIZIALE
// ===========================================

const LAST_LANG_KEY = 'porticiSanLuca_lastLang'; 
const LANGUAGES = ['it', 'en', 'fr', 'es', 'de', 'pt', 'ma']; // Lingue supportate
let currentLang = 'it';

// Riferimenti agli elementi DOM (inizializzati in DOMContentLoaded)
let audioPlayer = null;
let playButton = null;

// REQUISITO 12: Coordinate fittizie per i POI (da popolare con i dati reali)
const ALL_POI_COORDS = {
    'home': { lat: 44.498, lon: 11.314 },
    'arco119': { lat: 44.4979, lon: 11.3141 }, 
    'arco126b': { lat: 44.4981, lon: 11.3142 }, 
    // ... Aggiungere qui le coordinate reali di tutti i POI ...
};


/**
 * Funzione helper per misurare la distanza tra due coordinate in metri.
 * @param {object} p1 - {lat, lon}
 * @param {object} p2 - {lat, lon}
 * @returns {number} Distanza in metri.
 */
function getDistance(p1, p2) {
    const R = 6371e3; 
    const phi1 = p1.lat * Math.PI/180;
    const phi2 = p2.lat * Math.PI/180;
    const deltaPhi = (p2.lat-p1.lat) * Math.PI/180;
    const deltaLambda = (p2.lon-p1.lon) * Math.PI/180;

    const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; 
}

/**
 * Determina l'ID della pagina corrente basato sul nome del file HTML.
 * (es. index-it.html -> 'home', arco119-it.html -> 'arco119')
 */
function getCurrentPageId() {
    const urlPath = document.location.pathname;
    const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
    
    let pageName = fileName.replace(/-[a-z]{2}\.html$/, '');

    return (pageName === 'index' || pageName === '') ? 'home' : pageName;
}

/**
 * Funzione helper per aggiornare il testo/HTML di un elemento dato l'ID.
 */
function updateContent(id, content, isHtml = false) {
    const element = document.getElementById(id);
    if (element && content) {
        if (isHtml) {
            element.innerHTML = content;
        } else {
            element.textContent = content;
        }
    }
}


// ===========================================
// LOGICA CARICAMENTO CONTENUTI (Requisito 5, 7, 8, 9, 11)
// ===========================================

const loadContent = async (lang) => {
    document.documentElement.lang = lang;
    
    // 13. REQUISITO: Invio dell'evento di visualizzazione pagina a Google Analytics
    gtag('event', 'page_view', {
        'page_title': document.title,
        'page_location': document.location.href,
        'page_path': document.location.pathname,
        'lingua_pagina': lang 
    });


    try {
        const pageId = getCurrentPageId();

        // 1. Fetch dal percorso corretto (Risolve il 404!)
        // Risale una cartella (da /public/) e accede a /data/
        const response = await fetch(`../data/translations/${lang}/texts.json`); 

        if (!response.ok) {
            console.error(`File di traduzione non trovato per la lingua: ${lang}. Stato: ${response.status}`);
            
            if (lang !== 'it') {
                // Tentativo di fallback su 'it'
                loadContent('it');
                return; 
            }
            throw new Error(`Impossibile caricare i dati per ${lang}. Nessun fallback disponibile.`);
        }

        const data = await response.json();
        const pageData = data[pageId]; 

        if (!pageData) {
            console.warn(`Dati non trovati per la chiave pagina: ${pageId} nel file JSON per la lingua: ${lang}.`);
            updateContent('headerTitle', `[ERRORE] Dati mancanti (${pageId}/${lang})`);
            document.body.classList.add('content-loaded');
            return;
        }

        // 5. REQUISITO: AGGIORNAMENTO NAVIGAZIONE (Menu Hamburger)
        const navPlaceholder = document.getElementById('navPlaceholder');
        if (navPlaceholder && data.nav && data.nav.nav_html) {
            updateContent('navPlaceholder', data.nav.nav_html, true);
            // Aggiunge la classe per il corretto styling CSS (Requisito 5)
            navPlaceholder.querySelector('nav').classList.add('nav-bar-menu'); 
        }

        // 8. REQUISITO: AGGIORNAMENTO IMMAGINE DI FONDO TESTATA 
        const headerTitleElement = document.getElementById('headerTitle');
        const headerImage = document.getElementById('pageImage1'); // pageImage1 è l'immagine di testata
        
        updateContent('pageTitle', pageData.pageTitle);
        if (headerTitleElement && pageData.pageTitle) {
            headerTitleElement.textContent = pageData.pageTitle; 
        }
        
        if (headerImage && pageData.imageSource1) {
            // Il percorso nel JSON è relativo al file HTML (es. public/images/meloncello.jpg)
            headerImage.src = pageData.imageSource1; 
        }

        // 7. REQUISITO: AGGIORNAMENTO DEL CONTENUTO (Testi)
        updateContent('mainText', pageData.mainText, true);
        updateContent('mainText1', pageData.mainText1, true);
        updateContent('mainText2', pageData.mainText2, true);
        updateContent('mainText3', pageData.mainText3, true);
        updateContent('mainText4', pageData.mainText4, true);
        updateContent('mainText5', pageData.mainText5, true);

        // AGGIORNAMENTO INFORMAZIONI FOOTER
        updateContent('infoSource', pageData.sourceText ? `Fonte: ${pageData.sourceText}` : '');
        updateContent('infoCreatedDate', pageData.creationDate || '');
        updateContent('infoUpdatedDate', pageData.lastUpdate || '');

        // 3. REQUISITO: AGGIORNAMENTO AUDIO E BOTTONE
        if (audioPlayer && playButton && pageData.audioSource) {
            if (!audioPlayer.paused) { audioPlayer.pause(); audioPlayer.currentTime = 0; }

            playButton.textContent = pageData.playAudioButton || 'Ascolta';
            playButton.dataset.playText = pageData.playAudioButton || 'Ascolta';
            playButton.dataset.pauseText = pageData.pauseAudioButton || 'Metti in pausa';
            
            // Il percorso nel JSON è relativo al file HTML (es. Assets/Audio/it/Home.mp3)
            audioPlayer.src = pageData.audioSource; 
            audioPlayer.load();

            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
            playButton.style.display = 'block';
        } else if (playButton) {
            playButton.style.display = 'none';
        }

        // 9. REQUISITO: AGGIORNAMENTO IMMAGINI DINAMICHE (Max 5 totali, 4 nel corpo)
        for (let i = 2; i <= 5; i++) { // pageImage2 a pageImage5
            const imageElement = document.getElementById(`pageImage${i}`); 
            const imageSource = pageData[`imageSource${i}`];

            if (imageElement) {
                imageElement.src = imageSource || '';
                imageElement.style.display = imageSource ? 'block' : 'none';
            }
        }
        
        // 12. REQUISITO: Controllo POI nelle vicinanze
        const currentPageCoords = pageData.poi_coords || ALL_POI_COORDS[pageId];
        if (currentPageCoords && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userCoords = { lat: position.coords.latitude, lon: position.coords.longitude };
                checkNearbyPois(userCoords, lang, data);
            }, error => {
                console.warn('Geolocalizzazione non disponibile o negata.', error);
                document.getElementById('nearbyPoiButton').style.display = 'none';
            });
        }


        // 11. REQUISITO: Salva la lingua scelta
        localStorage.setItem(LAST_LANG_KEY, lang); 
        
        // Finalizza dopo che tutti gli elementi sono stati aggiornati
        initEventListeners(lang); 
        updateLanguageSelectorActiveState(lang); // Aggiorna lo stato attivo della bandiera
        console.log(`✅ Contenuto caricato con successo per la lingua: ${lang} e pagina: ${pageId}`);

    } catch (error) {
        console.error('Errore critico nel caricamento dei testi:', error);
        updateContent('headerTitle', `[ERRORE CRITICO] Caricamento fallito.`);
    } finally {
        // ANTI-FOUT: Rendi visibile il corpo della pagina (SEMPRE)
        document.body.classList.add('content-loaded');
    }
};

/**
 * 12. REQUISITO: Gestisce il menu POI nelle vicinanze.
 * (La funzione di filtraggio è qui omessa per brevità ma era inclusa nella discussione precedente.)
 */
function checkNearbyPois(currentCoords, currentLang, allData) {
    const nearbyButton = document.getElementById('nearbyPoiButton');
    const nearbyMenuPlaceholder = document.getElementById('nearbyMenuPlaceholder');
    const poiData = Object.keys(allData).filter(key => key !== 'nav');
    const nearbyPois = [];

    if (!currentCoords || !nearbyButton || !nearbyMenuPlaceholder) return;

    // Logica di filtraggio POI:
    poiData.forEach(poiId => {
        const poi = allData[poiId];
        // Assicurati che ogni POI abbia le coordinate nel JSON o nel fallback
        const poiCoords = poi.poi_coords || ALL_POI_COORDS[poiId]; 
        
        if (poiCoords && poiId !== getCurrentPageId()) {
            const distance = getDistance(currentCoords, poiCoords);
            if (distance <= 20) { 
                nearbyPois.push({
                    id: poiId,
                    title: poi.pageTitle || poiId.toUpperCase(),
                });
            }
        }
    });

    if (nearbyPois.length > 0) {
        let menuHtml = `<ul>`;
        nearbyPois.forEach(p => {
            const fileBase = (p.id === 'home') ? 'index' : p.id;
            // Garantisce che il reindirizzamento alla pagina corretta
            menuHtml += `<li><a href="${fileBase}-${currentLang}.html">${p.title}</a></li>`;
        });
        menuHtml += `</ul>`;

        nearbyMenuPlaceholder.innerHTML = menuHtml;
        nearbyButton.textContent = allData.nav.nearbyButtonText || 'Vedi POI nelle vicinanze';
        nearbyButton.style.display = 'block'; 

        // Listener per aprire/chiudere il menu vicino
        if (!nearbyButton.dataset.listenerAttached) {
             nearbyButton.addEventListener('click', () => {
                nearbyMenuPlaceholder.classList.toggle('active');
            });
            nearbyButton.dataset.listenerAttached = 'true';
        }
    } else {
        nearbyButton.style.display = 'none'; 
        nearbyMenuPlaceholder.classList.remove('active');
    }
}


// ===========================================
// LOGICA INIZIALIZZAZIONE EVENTI
// ===========================================

/**
 * Gestisce l'interazione con l'audio player (Requisito 3).
 */
function toggleAudioPlayback() {
    if (!audioPlayer || !playButton) return;

    if (audioPlayer.paused || audioPlayer.ended) {
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
}

/**
 * Aggiorna l'aspetto della bandiera attiva.
 */
function updateLanguageSelectorActiveState(lang) {
    document.querySelectorAll('.language-selector button').forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * Gestore del cambio lingua (Requisito 4 & 11).
 */
function handleLanguageChange(event) {
    const newLang = event.currentTarget.getAttribute('data-lang');

    if (newLang && LANGUAGES.includes(newLang) && newLang !== currentLang) {
        
        // 1. Salva la lingua preferita (Requisito 11)
        localStorage.setItem(LAST_LANG_KEY, newLang); 
        
        // 2. Determina il nome base della pagina (es. 'index' o 'arco119')
        const urlPath = document.location.pathname;
        const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        const fileBase = fileName.replace(/-[a-z]{2}\.html$/, '');

        // 3. Costruisce il nuovo percorso (es. index-en.html)
        const newPath = `${fileBase}-${newLang}.html`;
        
        // 4. Reindirizza (Risolve il problema "non cambia pagina")
        document.location.href = newPath; 
    }
}


/**
 * Inizializza TUTTI gli event listener.
 */
function initEventListeners(currentLang) {
    
    // --- Logica Menu Hamburger (Requisito 5) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.getElementById('navPlaceholder');

    // Listener per l'hamburger (solo se non è già attaccato)
    if (menuToggle && navBar && !menuToggle.dataset.listenerAttached) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navBar.classList.toggle('active');
        });
        
        // Chiude il menu quando si clicca un link
        navBar.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navBar.classList.remove('active');
            });
        });
        menuToggle.dataset.listenerAttached = 'true';
    }


    // --- Logica Audio (Requisito 3) ---
    if (audioPlayer && playButton && !playButton.dataset.listenerAttached) {
        playButton.addEventListener('click', toggleAudioPlayback);

        // Reset del pulsante quando l'audio finisce (Requisito 3)
        audioPlayer.addEventListener('ended', () => {
            playButton.textContent = playButton.dataset.playText;
            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
        });
        playButton.dataset.listenerAttached = 'true';
    }


    // --- Logica Selettore Lingua (Requisito 4 & 11) ---
    document.querySelectorAll('.language-selector button').forEach(button => {
        // Rimuove e ri-aggiunge per sicurezza contro i duplicati
        button.removeEventListener('click', handleLanguageChange); 
        button.addEventListener('click', handleLanguageChange);
    });
}


// ===========================================
// PUNTO DI INGRESSO (DOM LOADED)
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Riferimenti iniziali (prima di tutto)
    audioPlayer = document.getElementById('audioPlayer');
    playButton = document.getElementById('playAudio');
    
    // 2. Determina la Lingua Iniziale
    const storedLang = localStorage.getItem(LAST_LANG_KEY);
    const browserLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    
    const urlPath = document.location.pathname;
    const langMatch = urlPath.match(/-([a-z]{2})\.html/);
    const urlLang = langMatch ? langMatch[1] : 'it'; 

    currentLang = urlLang; // Inizia con la lingua dell'URL

    // Logica di persistenza/reindirizzamento (Requisito 10 & 11):
    if (storedLang && storedLang !== urlLang) {
        // Se c'è una lingua salvata DIVERSA da quella nell'URL, reindirizza
        const newPath = urlPath.replace(`-${urlLang}.html`, `-${storedLang}.html`);
        document.location.href = newPath;
        return; 
    } 
    
    // Se non c'è una lingua salvata e siamo sulla pagina di fallback (es. index-it.html), 
    // prova a reindirizzare al browser se supportato (Requisito 10)
    if (!storedLang && urlLang === 'it' && browserLang !== 'it' && LANGUAGES.includes(browserLang)) {
        const newPath = urlPath.replace(`-it.html`, `-${browserLang}.html`);
        document.location.href = newPath;
        return;
    }
    
    // 3. Carica Contenuto Iniziale con la lingua finale
    loadContent(currentLang);
});