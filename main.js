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

// ... (omitted helper functions: getDistance, getCurrentPageId, updateContent) ...

/**
 * Ottiene l'ID della pagina corrente basato sul nome del file HTML.
 */
function getCurrentPageId() {
    const urlPath = document.location.pathname;
    const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
    let pageName = fileName.replace(/-[a-z]{2}\.html$/, '');
    return (pageName === 'index' || pageName === '') ? 'home' : pageName;
}

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
    // ... (omitted gtag analytics call) ...

    try {
        const pageId = getCurrentPageId();

        // 1. Fetch JSON: PERCORSO PULITO (relativo alla radice)
        const response = await fetch(`data/translations/${lang}/texts.json`); 

        if (!response.ok) {
            console.error(`File di traduzione non trovato per la lingua: ${lang}.`);
            if (lang !== 'it') { loadContent('it'); return; }
            throw new Error(`Impossibile caricare i dati per ${lang}.`);
        }

        const data = await response.json();
        const pageData = data[pageId]; 

        // ... (omitted content updates: pageTitle, headerTitle, mainText, Footer) ...
        
        // 5. REQUISITO: AGGIORNAMENTO NAVIGAZIONE (Menu Hamburger)
        const navPlaceholder = document.getElementById('navPlaceholder');
        if (navPlaceholder && data.nav && data.nav.nav_html) {
            updateContent('navPlaceholder', data.nav.nav_html, true);
        }
        
        // 3. REQUISITO: AGGIORNAMENTO AUDIO E BOTTONE
        if (audioPlayer && playButton && pageData.audioSource) {
            if (!audioPlayer.paused) { audioPlayer.pause(); audioPlayer.currentTime = 0; }

            // Usa i testi dal JSON per il bottone
            playButton.textContent = pageData.playAudioButton || 'Ascolta';
            playButton.dataset.playText = pageData.playAudioButton || 'Ascolta';
            playButton.dataset.pauseText = pageData.pauseAudioButton || 'Metti in pausa';
            
            // I percorsi risorse (Assets/Audio/...) funzionano bene da qui
            audioPlayer.src = pageData.audioSource; 
            audioPlayer.load();

            // Imposta lo stile iniziale (Blu/Play)
            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
            playButton.style.display = 'block';
        } else if (playButton) {
            playButton.style.display = 'none';
        }

        // ... (omitted image updates) ...
        
        // Finalizza
        initEventListeners(lang); 
        updateLanguageSelectorActiveState(lang); 
        localStorage.setItem(LAST_LANG_KEY, lang); 

    } catch (error) {
        console.error('Errore critico nel caricamento dei testi:', error);
    } finally {
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
        // Diventa ARANCIONE e PAUSA
        playButton.textContent = playButton.dataset.pauseText;
        playButton.classList.remove('play-style');
        playButton.classList.add('pause-style');
    } else {
        audioPlayer.pause();
        // Diventa BLU e ASCOLTA
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
 * Risolve il problema del cambio pagina.
 */
function handleLanguageChange(event) {
    const newLang = event.currentTarget.getAttribute('data-lang');

    if (newLang && LANGUAGES.includes(newLang) && newLang !== currentLang) {
        localStorage.setItem(LAST_LANG_KEY, newLang); 
        
        // Costruisce il nome file corretto: es. 'arco119-it.html' -> 'arco119-en.html'
        const urlPath = document.location.pathname;
        const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        const fileBase = fileName.replace(/-[a-z]{2}\.html$/, '');

        // Reindirizza al nuovo file specifico per la lingua
        const newPath = `${fileBase}-${newLang}.html`;
        document.location.href = newPath; 
    }
}


/**
 * Inizializza TUTTI gli event listener.
 */
function initEventListeners(currentLang) {
    
    // --- Logica Menu Hamburger (RISOLVE IL PROBLEMA "NON SI VEDE") ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.getElementById('navPlaceholder');

    if (menuToggle && navBar && !menuToggle.dataset.listenerAttached) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navBar.classList.toggle('active');
        });
        
        // Chiude il menu quando si clicca un link
        navBar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navBar.classList.remove('active');
            });
        });
        menuToggle.dataset.listenerAttached = 'true';
    }


    // --- Logica Audio (RISOLVE IL PROBLEMA "NON FUNZIONA") ---
    if (audioPlayer && playButton && !playButton.dataset.listenerAttached) {
        playButton.addEventListener('click', toggleAudioPlayback);

        // Reset del pulsante quando l'audio finisce 
        audioPlayer.addEventListener('ended', () => {
            playButton.textContent = playButton.dataset.playText;
            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
        });
        playButton.dataset.listenerAttached = 'true';
    }


    // --- Logica Selettore Lingua (RISOLVE IL PROBLEMA "NON CAMBIA PAGINA") ---
    document.querySelectorAll('.language-selector button').forEach(button => {
        button.removeEventListener('click', handleLanguageChange); 
        button.addEventListener('click', handleLanguageChange);
    });
}


// ===========================================
// PUNTO DI INGRESSO (DOM LOADED)
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    audioPlayer = document.getElementById('audioPlayer');
    playButton = document.getElementById('playAudio');
    
    // Logica di reindirizzamento omessa per semplicità; usiamo la lingua nell'URL
    const urlPath = document.location.pathname;
    const langMatch = urlPath.match(/-([a-z]{2})\.html/);
    const urlLang = langMatch ? langMatch[1] : 'it'; 

    currentLang = urlLang; 
    loadContent(currentLang);
});