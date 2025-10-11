/**
 * Script principale (Situato nella RADICE del progetto).
 * @author Gemini, rielaborazione da richieste utente
 */

// ===========================================
// CONSTANTI & SETUP INIZIALE
// ===========================================

const LAST_LANG_KEY = 'porticiSanLuca_lastLang'; 
const LANGUAGES = ['it', 'en', 'fr', 'es', 'de', 'pt', 'ma']; 
let currentLang = 'it';
let audioPlayer = null;
let playButton = null;

// Le posizioni dei POI per la geolocalizzazione (Requisito 10) sono qui o in un file separato
// const poiLocations = { /* ... */ }; 

/**
 * Ottiene l'ID della pagina corrente basato sul nome del file HTML.
 */
function getCurrentPageId() {
    const urlPath = document.location.pathname;
    const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
    let pageName = fileName.replace(/-[a-z]{2}\.html$/, '');
    return (pageName === 'index' || pageName === '') ? 'home' : pageName;
}

/**
 * Aggiorna il contenuto di un elemento tramite ID.
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
// LOGICA CARICAMENTO CONTENUTI 
// ===========================================

const loadContent = async (lang) => {
    document.documentElement.lang = lang;
    
    // Inizializzazione Analytics (gtag omesso per brevità, assumiamo sia nel vostro HTML)
    if (typeof gtag === 'function') {
        gtag('set', { 'lingua_pagina': lang });
    }

    try {
        const pageId = getCurrentPageId();

        // 1. Fetch JSON: PERCORSO PULITO (relativo alla radice)
        const response = await fetch(`data/translations/${lang}/texts.json`); 

        if (!response.ok) {
            console.error(`File di traduzione non trovato per la lingua: ${lang}. Tentativo lingua predefinita (it).`);
            if (lang !== 'it') { loadContent('it'); return; }
            throw new Error(`Impossibile caricare i dati per ${lang}.`);
        }

        const data = await response.json();
        const pageData = data[pageId] || {}; // Usa un oggetto vuoto se i dati non esistono

        // 2. AGGIORNAMENTO TESTI PRINCIPALI
        updateContent('pageTitle', pageData.pageTitle || 'Portici San Luca');
        updateContent('headerTitle', pageData.pageTitle || '');
        updateContent('mainText', pageData.mainText || '');

        updateContent('mainText1', pageData.mainText1 || '');
        updateContent('mainText2', pageData.mainText2 || '');
        updateContent('mainText3', pageData.mainText3 || '');
        updateContent('mainText4', pageData.mainText4 || '');
        updateContent('mainText5', pageData.mainText5 || '');
        
        // 3. AGGIORNAMENTO IMMAGINI (Requisito 8 & 9)
        const imageIds = ['pageImage1', 'pageImage2', 'pageImage3', 'pageImage4', 'pageImage5'];
        imageIds.forEach((id, index) => {
            const imgSrc = pageData[`imageSource${index + 1}`];
            const imgElement = document.getElementById(id);

            if (imgElement && imgSrc) {
                imgElement.src = imgSrc;
                imgElement.alt = pageData.pageTitle || ''; // Usa il titolo come alt
                imgElement.style.display = 'block'; // Mostra l'immagine
            } else if (imgElement) {
                imgElement.style.display = 'none'; // Nasconde se non c'è URL
            }
        });

        // 4. AGGIORNAMENTO FOOTER (RISOLVE IL PROBLEMA "NON COMPAIONO")
        updateContent('infoSource', pageData.sourceText || '');
        updateContent('infoCreatedDate', pageData.creationDate || '');
        updateContent('infoUpdatedDate', pageData.lastUpdate || '');
        
        // 5. AGGIORNAMENTO NAVIGAZIONE (Menu Hamburger)
        // FIX: Usa la chiave corretta "nav_content" che è presente nel tuo JSON
        const navPlaceholder = document.getElementById('navPlaceholder');
        const navContent = data.nav ? data.nav.nav_content : null; 

        if (navPlaceholder && navContent) {
            updateContent('navPlaceholder', navContent, true);
        }
        
        // 6. AGGIORNAMENTO AUDIO E BOTTONE
        if (audioPlayer && playButton && pageData.audioSource) {
            if (!audioPlayer.paused) { audioPlayer.pause(); audioPlayer.currentTime = 0; }

            playButton.textContent = pageData.playAudioButton || 'Ascolta';
            playButton.dataset.playText = pageData.playAudioButton || 'Ascolta';
            playButton.dataset.pauseText = pageData.pauseAudioButton || 'Metti in pausa';
            
            audioPlayer.src = pageData.audioSource; 
            audioPlayer.load();

            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
            playButton.style.display = 'block';
        } else if (playButton) {
            playButton.style.display = 'none';
        }
        
        // 7. FINALIZZA
        initEventListeners(lang); 
        updateLanguageSelectorActiveState(lang); 
        localStorage.setItem(LAST_LANG_KEY, lang); 

    } catch (error) {
        console.error('Errore critico nel caricamento dei testi:', error);
    } finally {
        // Rimuove il "Flash of Unstyled Text" (Requisito 6)
        document.body.classList.add('content-loaded');
    }
};

// ===========================================
// LOGICA EVENTI E INIZIALIZZAZIONE
// ===========================================

/**
 * Gestisce il cambio di colore e testo del bottone audio.
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
        localStorage.setItem(LAST_LANG_KEY, newLang); 
        
        const urlPath = document.location.pathname;
        const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        let fileBase = fileName.replace(/-[a-z]{2}\.html$/, '');
        if (fileBase === '') fileBase = 'index';

        const newPath = `${fileBase}-${newLang}.html`;
        document.location.href = newPath; 
    }
}


/**
 * Inizializza TUTTI gli event listener.
 */
function initEventListeners(currentLang) {
    
    // --- Logica Menu Hamburger ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.getElementById('navPlaceholder');

    // Usiamo 'once' per evitare l'attaccamento multiplo se loadContent viene richiamato
    if (menuToggle && navBar && !menuToggle.dataset.listenerAttached) {
        
        // Toggle menu visibilità
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navBar.classList.toggle('active');
        });
        
        // Chiude il menu quando si clicca un link
        navBar.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                menuToggle.classList.remove('active');
                navBar.classList.remove('active');
            }
        });
        menuToggle.dataset.listenerAttached = 'true';
    }


    // --- Logica Audio ---
    if (audioPlayer && playButton && !playButton.dataset.listenerAttached) {
        playButton.addEventListener('click', toggleAudioPlayback);
        audioPlayer.addEventListener('ended', () => {
            playButton.textContent = playButton.dataset.playText;
            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
        });
        playButton.dataset.listenerAttached = 'true';
    }


    // --- Logica Selettore Lingua ---
    document.querySelectorAll('.language-selector button').forEach(button => {
        // Rimuove e riattacca per evitare duplicati ad ogni loadContent
        button.removeEventListener('click', handleLanguageChange); 
        button.addEventListener('click', handleLanguageChange);
    });
    
    // --- Logica POI (Omessa per brevità, ma andrebbe qui) ---
}


// ===========================================
// PUNTO DI INGRESSO (DOM LOADED)
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    audioPlayer = document.getElementById('audioPlayer');
    playButton = document.getElementById('playAudio');
    
    const urlPath = document.location.pathname;
    const langMatch = urlPath.match(/-([a-z]{2})\.html/);
    const urlLang = langMatch ? langMatch[1] : 'it'; 

    currentLang = urlLang; 
    loadContent(currentLang);
});