/**
 * Script principale per la gestione della logica di navigazione e caricamento dei contenuti.
 * @author Gemini, rielaborazione da richieste utente
 */

// ===========================================
// Variabili Globali e Helpers
// ===========================================

let currentLang = 'it';
const LANGUAGES = ['it', 'en', 'fr', 'es', 'de', 'pt', 'ma']; // Lingue supportate
let audioPlayer = null;
let playButton = null;

/**
 * Ottiene l'ID della pagina corrente dall'URL.
 * @returns {string} L'ID della pagina (es. 'page1', 'page2', ecc.).
 */
function getCurrentPageId() {
    const hash = window.location.hash.substring(1);
    return hash || 'page1'; // Default alla prima pagina
}

/**
 * Imposta l'hash dell'URL, scatenando l'evento hashchange.
 * @param {string} pageId - L'ID della pagina a cui navigare.
 */
function navigateTo(pageId) {
    if (pageId && window.location.hash !== `#${pageId}`) {
        window.location.hash = pageId;
    }
}

// ===========================================
// LOGICA CARICAMENTO CONTENUTI 
// ===========================================

/**
 * Carica e visualizza i contenuti per la lingua e la pagina specificate.
 * @param {string} lang - Il codice della lingua (es. 'it').
 */
const loadContent = async (lang) => {
    // Aggiorna l'attributo lang del tag <html> per accessibilità
    document.documentElement.lang = lang;

    try {
        const pageId = getCurrentPageId();

        // 1. Fetch JSON (Percorso basato sulla struttura: data/translations/[lingua]/texts.json)
        const response = await fetch(`data/translations/${lang}/texts.json`);

        if (!response.ok) {
            throw new Error(`Errore HTTP ${response.status} durante il caricamento di ${lang}/texts.json`);
        }

        const data = await response.json();
        const pageData = data[pageId];

        if (!pageData) {
            console.warn(`Dati non trovati per la pagina: ${pageId} in lingua: ${lang}`);
            return;
        }

        // 2. Aggiornamento Generico Titolo e Testi
        const pageTitleElement = document.getElementById('pageTitle');
        if (pageTitleElement) {
            pageTitleElement.textContent = pageData.title || '';
        }

        const pageTextElement = document.getElementById('pageText');
        if (pageTextElement) {
            pageTextElement.textContent = pageData.text || '';
        }

        // 3. Aggiornamento Audio (Requisito 3)
        if (audioPlayer && playButton && pageData.audioSource) {
            // Pausa e reset prima di caricare la nuova traccia
            audioPlayer.pause();
            audioPlayer.currentTime = 0;

            // Imposta la sorgente audio utilizzando il percorso COMPLETO dal JSON
            // Esempio: "Assets/Audio/it/Home.mp3"
            audioPlayer.src = pageData.audioSource;
            audioPlayer.load();

            // Sincronizza lo stato del bottone con la nuova traccia
            playButton.classList.remove('pause');
            playButton.classList.add('play');
        } else if (playButton) {
            // Nasconde il bottone se non c'è una sorgente audio
            playButton.style.display = 'none';
        }

        // 4. Aggiornamento Navigazione Pagine (Requisito 1)
        // Aggiorna i pulsanti di navigazione per riflettere la lingua corrente
        document.querySelectorAll('.nav-link').forEach(link => {
            const targetPage = link.getAttribute('data-target-page');
            link.textContent = pageData.navTitles ? pageData.navTitles[targetPage] : targetPage;
        });

        // 5. Aggiornamento Pulsante Indietro/Avanti (se esistono nel tuo DOM)
        const backButton = document.getElementById('backButton');
        const nextButton = document.getElementById('nextButton');
        const currentPageIndex = parseInt(pageId.replace('page', ''), 10);
        const totalPages = Object.keys(data).length; // Assumendo che le pagine siano numerate

        if (backButton) {
            if (currentPageIndex > 1) {
                backButton.onclick = () => navigateTo(`page${currentPageIndex - 1}`);
                backButton.style.display = 'block';
            } else {
                backButton.style.display = 'none';
            }
        }

        if (nextButton) {
            if (currentPageIndex < totalPages) {
                nextButton.onclick = () => navigateTo(`page${currentPageIndex + 1}`);
                nextButton.style.display = 'block';
            } else {
                nextButton.style.display = 'none';
            }
        }


        // 6. Aggiornamento Immagini Dinamiche (Requisito 9)
        // Itera sugli elementi immagine dinamici (es. pageImage1, pageImage2, ...)
        // Il tuo JSON deve contenere i percorsi completi per queste immagini.
        for (let i = 1; i <= 5; i++) {
            const imageElement = document.getElementById(`pageImage${i}`);
            const imageSource = pageData[`imageSource${i}`];

            if (imageElement) {
                // Imposta la sorgente immagine utilizzando il percorso COMPLETO dal JSON
                // Esempio: "public/images/meloncello.jpg"
                imageElement.src = imageSource || '';
                imageElement.style.display = imageSource ? 'block' : 'none';
            }
        }

    } catch (error) {
        console.error("Errore durante il caricamento del contenuto:", error);
    } finally {
        // Rimuove la classe di caricamento per mostrare il contenuto
        document.body.classList.add('content-loaded');
    }
};

// ===========================================
// LOGICA EVENTI E INIZIALIZZAZIONE
// ===========================================

/**
 * Gestisce l'interazione con l'audio player.
 */
function toggleAudioPlayback() {
    if (!audioPlayer || !playButton) return;

    if (audioPlayer.paused || audioPlayer.ended) {
        audioPlayer.play();
        playButton.classList.remove('play');
        playButton.classList.add('pause');
    } else {
        audioPlayer.pause();
        playButton.classList.remove('pause');
        playButton.classList.add('play');
    }
}

/**
 * Inizializza tutti gli event listener necessari.
 */
function initEventListeners() {
    // 1. Logica Navigazione (Ascolta i cambiamenti di hash)
    window.addEventListener('hashchange', () => {
        loadContent(currentLang);
    });

    // 2. Logica Pulsante Audio
    if (playButton) {
        playButton.removeEventListener('click', toggleAudioPlayback); // Evita duplicati
        playButton.addEventListener('click', toggleAudioPlayback);

        // Gestione fine traccia
        audioPlayer.onended = () => {
            playButton.classList.remove('pause');
            playButton.classList.add('play');
        };
    }

    // 3. Logica Selettore Lingua (Requisito 4 & 11)
    const langButtons = document.querySelectorAll('.language-selector button');
    langButtons.forEach(button => {
        // Rimuove e ri-aggiunge per sicurezza
        button.removeEventListener('click', handleLanguageChange);
        button.addEventListener('click', handleLanguageChange);
    });
}

/**
 * Gestore del cambio lingua.
 * @param {Event} event - L'evento click.
 */
function handleLanguageChange(event) {
    const newLang = event.currentTarget.getAttribute('data-lang');
    if (newLang && LANGUAGES.includes(newLang) && newLang !== currentLang) {
        currentLang = newLang;
        // Salva la lingua preferita (opzionale)
        localStorage.setItem('preferredLang', newLang);
        loadContent(currentLang);
    }
}

// ===========================================
// PUNTO DI INGRESSO (DOM LOADED)
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inizializzazione Elementi Audio
    audioPlayer = document.getElementById('audioPlayer');
    playButton = document.getElementById('playButton');

    // 2. Determina la Lingua Iniziale
    const storedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).substring(0, 2);

    // Priorità: Stored > Browser > Default ('it')
    if (storedLang && LANGUAGES.includes(storedLang)) {
        currentLang = storedLang;
    } else if (LANGUAGES.includes(browserLang)) {
        currentLang = browserLang;
    } else {
        currentLang = 'it';
    }

    // 3. Inizializza Eventi
    initEventListeners();

    // 4. Carica Contenuto Iniziale
    // Carica la pagina basata sull'hash o il default, con la lingua determinata.
    loadContent(currentLang);

    // 5. Imposta lo stato iniziale del selettore lingua (solo per feedback visivo)
    document.querySelectorAll('.language-selector button').forEach(button => {
        if (button.getAttribute('data-lang') === currentLang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // 6. Imposta la pagina iniziale se non specificato nell'hash
    if (!window.location.hash) {
        navigateTo('page1');
    }
});