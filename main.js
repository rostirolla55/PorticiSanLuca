/**
 * Script principale (Situato nella RADICE del progetto).
 * Versione Unificata Finale e Completa.
 */

// ===========================================
// CONSTANTI & SETUP INIZIALE
// ===========================================

const LAST_LANG_KEY = 'porticiSanLuca_lastLang'; 
const LANGUAGES = ['it', 'en', 'fr', 'es', 'de', 'pt', 'ma']; 
let currentLang = 'it';
let audioPlayer = null;
let playButton = null;
let nearbyPoiButton = null; 
let nearbyMenuPlaceholder = null; 

// Nota: ARCO_LOCATIONS, calculateDistance, initGeoLocation, updatePoiMenu sono omessi qui
// perché non erano nell'ultima versione che mi hai inviato e li gestiamo a parte.

/** Ottiene l'ID della pagina corrente. */
function getCurrentPageId() {
    const urlPath = document.location.pathname;
    const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
    let pageName = fileName.replace(/-[a-z]{2}\.html$/, '');
    return (pageName === 'index' || pageName === '') ? 'home' : pageName;
}

/** Aggiorna il contenuto di un elemento tramite ID. */
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
// LOGICA CARICAMENTO CONTENUTI 
// ===========================================

const loadContent = async (lang) => {
    document.documentElement.lang = lang;
    
    if (typeof gtag === 'function') {
        gtag('set', { 'lingua_pagina': lang });
    }

    try {
        const pageId = getCurrentPageId();
        const response = await fetch(`data/translations/${lang}/texts.json`); 
        
        if (!response.ok) {
            console.error(`File di traduzione non trovato per la lingua: ${lang}. Tentativo lingua predefinita (it).`);
            if (lang !== 'it') { loadContent('it'); return; }
            throw new Error(`Impossibile caricare i dati per ${lang}.`);
        }

        const data = await response.json();
        const pageData = data[pageId] || {}; 

        // 1. AGGIORNAMENTO TESTI PRINCIPALI e Immagine Testata
        updateContent('pageTitle', pageData.pageTitle || 'Portici San Luca');
        updateContent('headerTitle', pageData.pageTitle || '');
        updateContent('mainText', pageData.mainText || '');
        updateContent('mainText1', pageData.mainText1 || '');
        // Aggiungi qui gli altri updateContent('mainText...')
        
        // 2. AGGIORNAMENTO IMMAGINI (Logica completa e corretta per tutte le immagini)
        const imageIds = ['pageImage1', 'pageImage2', 'pageImage3', 'pageImage4', 'pageImage5'];
        imageIds.forEach((id, index) => {
            const imgSrc = pageData[`imageSource${index + 1}`];
            const imgElement = document.getElementById(id);

            if (imgElement) {
                if (imgSrc) {
                    imgElement.src = imgSrc;
                    imgElement.alt = pageData.pageTitle || `Immagine ${index + 1} del contenuto`;
                    imgElement.style.display = 'block';
                } else {
                    imgElement.src = '';
                    imgElement.alt = '';
                    if (id !== 'pageImage1') imgElement.style.display = 'none'; // L'immagine testata rimane se non c'è una sorgente
                }
            }
        });

        // 3. AGGIORNAMENTO FOOTER
        updateContent('infoSource', `Fonte: ${pageData.sourceText || 'N/A'}`);
        updateContent('infoCreatedDate', `Data Creazione: ${pageData.creationDate || 'N/A'}`);
        updateContent('infoUpdatedDate', `Ultimo Aggiornamento: ${pageData.lastUpdate || 'N/A'}`);
        
        // 4. AGGIORNAMENTO NAVIGAZIONE PRINCIPALE
        const navPlaceholder = document.getElementById('navPlaceholder');
        const navContent = data.nav ? data.nav.nav_content : null; 
        if (navPlaceholder && navContent) {
            updateContent('navPlaceholder', navContent, true);
        }
        
        // 5. AGGIORNAMENTO AUDIO E BOTTONE
        if (audioPlayer && playButton) {
            if (pageData.audioSource) {
                if (!audioPlayer.paused) { audioPlayer.pause(); audioPlayer.currentTime = 0; }
                playButton.textContent = pageData.playAudioButton || 'Ascolta';
                playButton.dataset.playText = pageData.playAudioButton || 'Ascolta';
                playButton.dataset.pauseText = pageData.pauseAudioButton || 'Metti in pausa';
                audioPlayer.src = pageData.audioSource; 
                audioPlayer.load();
                playButton.style.display = 'block'; 
            } else {
                playButton.style.display = 'none'; 
            }
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

// ===========================================
// FUNZIONI DI GESTIONE EVENTI
// ===========================================

// --- GESTIONE AUDIO (Versione robusta e corretta) ---
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


// --- GESTIONE LINGUA (Pezzo mancante nel tuo invio) ---
function updateLanguageSelectorActiveState(lang) {
    document.querySelectorAll('.language-selector button').forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function handleLanguageChange(event) {
    const newLang = event.currentTarget.getAttribute('data-lang');

    if (newLang && LANGUAGES.includes(newLang) && newLang !== currentLang) {
        localStorage.setItem(LAST_LANG_KEY, newLang); 
        
        const urlPath = document.location.pathname;
        const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        let fileBase = fileName.replace(/-[a-z]{2}\.html$/, '');
        if (fileBase === '') fileBase = 'index';

        const newPath = `${fileBase}-${newLang}.html`;
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


    // --- Logica Selettore Lingua ---
    document.querySelectorAll('.language-selector button').forEach(button => {
        // Rimuovi per evitare listener duplicati e poi assegna
        button.removeEventListener('click', handleLanguageChange); 
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
});