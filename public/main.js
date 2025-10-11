// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. CARICAMENTO DEL FILE JSON
    fetch('assets/translations.json')
        .then(response => {
            if (!response.ok) {
                // Se il file non esiste (es. 404), lancia un errore
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Determina la lingua e il nome della pagina in base all'URL
            const urlPath = document.location.pathname;
            const langMatch = urlPath.match(/-([a-z]{2})\.html/);
            const currentLang = langMatch ? langMatch[1] : 'it'; 

            const pageMatch = urlPath.match(/\/([a-z0-9]+)-/);
            // Assume 'index-it.html' come 'home' se il match fallisce
            const pageName = pageMatch ? pageMatch[1] : (urlPath.includes('index-') ? 'home' : null);

            // Verifica se i dati essenziali sono disponibili
            const pageData = data[pageName];
            const navData = data.nav;

            if (navData) {
                // 2. INIEZIONE DEL MENU DI NAVIGAZIONE
                injectNavigation(navData);
            }
            
            if (pageData) {
                // 3. INIEZIONE DEL CONTENUTO DINAMICO E TRADUZIONE
                applyContent(pageData, pageName);
            }

            // 4. INIZIALIZZAZIONE EVENTI (DOPO IL CARICAMENTO DEI TESTI)
            initEventListeners(pageData, currentLang);

            // 5. ANTI-FOUT: Mostra il contenuto solo dopo il caricamento completo (aggiunge la classe al body)
            document.body.classList.add('content-loaded');

        })
        .catch(error => {
            console.error('Errore nel caricamento o nell\'elaborazione dei dati:', error);
            // In caso di errore critico (es. JSON non trovato), mostra comunque il body 
            // per non bloccare l'utente su uno schermo vuoto.
            document.body.classList.add('content-loaded');
        });
});


/**
 * Applica il contenuto dinamico alla pagina corrente, basandosi sugli ID.
 * @param {object} data - Oggetto dati per la pagina corrente.
 * @param {string} pageName - Nome della pagina (es. 'home', 'arco119').
 */
function applyContent(data, pageName) {
    // Inietta il Titolo della Pagina (nel tag <title>)
    if (data.pageTitle && document.title) {
        document.title = data.pageTitle;
    }

    // Inietta il Titolo di Testata (Header)
    const headerTitleElement = document.getElementById('headerTitle');
    if (headerTitleElement && data.pageTitle) {
        // Usa il titolo della pagina come titolo visibile, rimuovendo il suffisso standard
        const displayTitle = data.pageTitle.replace(' - Portico di San Luca', '');
        headerTitleElement.textContent = displayTitle;
    }

    // Inietta il Testo Principale e i suoi blocchi (mainText1-5)
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

    // Inietta l'Immagine Principale (header)
    const headerImageContainer = document.querySelector('.header-image-container img');
    if (headerImageContainer && data.imageSource1) {
        headerImageContainer.src = data.imageSource1;
        headerImageContainer.alt = pageName; 
    }
    
    // Inietta Immagini Aggiuntive (se presenti)
    for (let i = 2; i <= 5; i++) {
        const imgElement = document.getElementById(`image${i}`);
        if (imgElement && data[`imageSource${i}`]) {
            imgElement.src = data[`imageSource${i}`];
            imgElement.alt = `${pageName} immagine ${i}`;
        }
    }

    // Inietta Testi Pulsanti Audio 
    const playButton = document.getElementById('playAudio');
    if (playButton) {
        playButton.textContent = data.playAudioButton || 'Play Audio';
        playButton.classList.add('play-style'); // Stile iniziale
        playButton.setAttribute('data-play-text', data.playAudioButton || 'Play Audio');
        playButton.setAttribute('data-pause-text', data.pauseAudioButton || 'Metti in Pausa');
    }

    // Inietta Testi del Footer
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
                // Ritardo per permettere la navigazione prima di chiudere il menu
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