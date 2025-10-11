// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. CARICAMENTO DEL FILE JSON
    fetch('assets/translations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Determina la lingua corrente (es. "it", "en")
            // Basato sul nome del file HTML, ad es. index-it.html -> 'it'
            const langMatch = document.location.pathname.match(/-([a-z]{2})\.html/);
            const lang = langMatch ? langMatch[1] : 'it'; 

            // Determina il nome della pagina (es. index-it.html -> 'home')
            const pageMatch = document.location.pathname.match(/\/([a-z0-9]+)-/);
            const pageName = pageMatch ? pageMatch[1] : 'home';

            // Estrae i dati specifici della pagina e della navigazione
            const pageData = data[pageName];
            const navData = data.nav;

            if (pageData) {
                // 2. INIEZIONE DEL CONTENUTO DINAMICO
                applyContent(pageData, pageName);
            }

            if (navData) {
                // 3. INIEZIONE DEL MENU DI NAVIGAZIONE
                injectNavigation(navData);
            }

            // 4. INIZIALIZZAZIONE EVENTI (DOPO IL CARICAMENTO DEI TESTI)
            initEventListeners(pageData, lang);

            // 5. ANTI-FOUT: Mostra il contenuto solo dopo il caricamento (Aggiunge la classe al body)
            document.body.classList.add('content-loaded');

        })
        .catch(error => {
            console.error('Errore nel caricamento dei dati JSON:', error);
            // In caso di errore, mostra comunque la pagina statica
            document.body.classList.add('content-loaded');
        });
});


/**
 * Applica il contenuto dinamico alla pagina corrente.
 * @param {object} data - Oggetto dati per la pagina corrente.
 * @param {string} pageName - Nome della pagina (es. 'home', 'arco119').
 */
function applyContent(data, pageName) {
    // 1. Inietta il Titolo della Pagina
    if (data.pageTitle && document.title) {
        document.title = data.pageTitle;
    }

    // 2. Inietta il Titolo di Testata (Header)
    const headerTitleElement = document.getElementById('headerTitle');
    if (headerTitleElement && data.pageTitle) {
        // Usa il titolo della pagina come titolo visibile, ma rimuovi il suffisso
        const displayTitle = data.pageTitle.replace(' - Portico di San Luca', '');
        headerTitleElement.textContent = displayTitle;
    }

    // 3. Inietta il Testo Principale (supporta mainText e mainText1-5)
    const mainTextElement = document.getElementById('mainText');
    if (mainTextElement) {
        mainTextElement.innerHTML = data.mainText || '';
    }
    for (let i = 1; i <= 5; i++) {
        const textElement = document.getElementById(`mainText${i}`);
        if (textElement && data[`mainText${i}`]) {
            textElement.innerHTML = data[`mainText${i}`];
        }
    }

    // 4. Inietta l'Immagine Principale
    const headerImageContainer = document.querySelector('.header-image-container img');
    if (headerImageContainer && data.imageSource1) {
        headerImageContainer.src = data.imageSource1;
        headerImageContainer.alt = pageName; // Alt dinamico
    }
    
    // 5. Inietta Immagini Aggiuntive (se presenti)
    for (let i = 2; i <= 5; i++) {
        const imgElement = document.getElementById(`image${i}`);
        if (imgElement && data[`imageSource${i}`]) {
            imgElement.src = data[`imageSource${i}`];
            imgElement.alt = `${pageName} immagine ${i}`;
        }
    }

    // 6. Inietta Testi del Footer
    const sourceTextElement = document.getElementById('sourceText');
    if (sourceTextElement && data.sourceText) {
        sourceTextElement.textContent = data.sourceText;
    }
    const creationDateElement = document.getElementById('creationDate');
    if (creationDateElement && data.creationDate) {
        creationDateElement.textContent = data.creationDate;
    }
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement && data.lastUpdate) {
        lastUpdateElement.textContent = data.lastUpdate;
    }

    // 7. Inietta Testi Pulsanti Audio (importante prima di inizializzare l'audio)
    const playButton = document.getElementById('playAudio');
    if (playButton) {
        playButton.textContent = data.playAudioButton || 'Play Audio';
        playButton.setAttribute('data-play-text', data.playAudioButton || 'Play Audio');
        playButton.setAttribute('data-pause-text', data.pauseAudioButton || 'Pause');
    }
}

/**
 * Inietta il codice HTML per il menu di navigazione.
 * @param {object} navData - L'oggetto 'nav' dal JSON.
 */
function injectNavigation(navData) {
    const navPlaceholder = document.getElementById('navPlaceholder');
    if (navPlaceholder && navData.nav_content) {
        // Inietta l'intero blocco di navigazione (già formattato in JSON)
        navPlaceholder.innerHTML = navData.nav_content;
    }
}


/**
 * Inizializza gli event listener per il menu hamburger, l'audio e il selettore lingua.
 * @param {object} pageData - Oggetto dati per la pagina corrente (per l'audio).
 * @param {string} currentLang - Lingua corrente (es. 'it', 'en').
 */
function initEventListeners(pageData, currentLang) {
    // --- Logica Menu Hamburger ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.querySelector('.nav-bar');

    if (menuToggle && navBar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navBar.classList.toggle('active');
        });

        // Chiude il menu quando si clicca un link in modalità mobile
        const navLinks = document.querySelectorAll('.nav-bar .nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Aggiungi un piccolo ritardo per permettere al click di essere registrato
                setTimeout(() => {
                    menuToggle.classList.remove('active');
                    navBar.classList.remove('active');
                }, 100);
            });
        });
    }

    // --- Logica Audio ---
    if (pageData && pageData.audioSource) {
        const audioPlayer = document.getElementById('audioPlayer');
        const playButton = document.getElementById('playAudio');
        
        if (audioPlayer && playButton) {
            audioPlayer.src = pageData.audioSource; // Imposta la sorgente audio

            playButton.addEventListener('click', () => {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    playButton.textContent = playButton.getAttribute('data-pause-text');
                    playButton.classList.remove('play-style');
                    playButton.classList.add('pause-style');
                } else {
                    audioPlayer.pause();
                    playButton.textContent = playButton.getAttribute('data-play-text');
                    playButton.classList.remove('pause-style');
                    playButton.classList.add('play-style');
                }
            });

            // Reset del pulsante quando l'audio finisce
            audioPlayer.addEventListener('ended', () => {
                playButton.textContent = playButton.getAttribute('data-play-text');
                playButton.classList.remove('pause-style');
                playButton.classList.add('play-style');
            });
        }
    }
    
    // --- Logica Selettore Lingua ---
    const langButtons = document.querySelectorAll('.language-selector button');
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const newLang = e.currentTarget.dataset.lang;
            if (newLang !== currentLang) {
                // Sostituisce la parte della lingua nell'URL corrente
                const newPath = document.location.pathname.replace(`-${currentLang}.html`, `-${newLang}.html`);
                document.location.href = newPath;
            }
        });
    });
}