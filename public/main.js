// main.js - Versione Completa e Integrata

// ===========================================
// FUNZIONI HELPER
// ===========================================

/**
 * Funzione helper per aggiornare il testo di un elemento dato l'ID.
 * Usa innerHTML per supportare i tag nel testo (es. <b>).
 * @param {string} id - L'ID dell'elemento HTML.
 * @param {string} content - Il nuovo contenuto.
 */
function updateTextContent(id, content) {
    const element = document.getElementById(id);
    if (element && content) {
        element.innerHTML = content;
    }
}

/**
 * Determina l'ID della pagina corrente basato sul nome del file HTML.
 * Esempio: 'index-it.html' -> 'home', 'arco119-it.html' -> 'arco119'.
 * @returns {string} L'ID della pagina (chiave JSON).
 */
function getCurrentPageId() {
    const urlPath = document.location.pathname;
    const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);

    // Rimuove la lingua e l'estensione (es. index-it.html -> index)
    let pageName = fileName.replace(/-[a-z]{2}\.html$/, '');

    // Mappatura per chiavi specifiche (se necessario)
    if (pageName === 'index') {
        return 'home';
    }
    // Assumiamo che altri file (es. carracci-it.html) usino 'carracci' come ID
    return pageName;
}

/**
 * Inietta il codice HTML per il menu di navigazione (come da implementazione precedente).
 * NOTA: Questo non è strettamente necessario se il tuo template HTML ha già
 * gli elementi per la navigazione e usi updateTextContent. Lo manteniamo per coerenza.
 * @param {object} navData - L'oggetto 'nav' dal JSON.
 */
function injectNavigation(navData) {
    // La tua logica precedente si basava sull'aggiornamento dei singoli ID,
    // quindi questa funzione è svuotata a favore di updateTextContent.
    // Se avessi usato navData.nav_content, avresti fatto:
    // const navPlaceholder = document.getElementById('navPlaceholder');
    // if (navPlaceholder && navData.nav_content) { navPlaceholder.innerHTML = navData.nav_content; }
    // Poiché usi updateTextContent per i link, continuiamo con quel metodo.
}


// ===========================================
// LOGICA CARICAMENTO CONTENUTI (Requisito 5, 7, 8, 9, 11)
// ===========================================

const loadContent = async (lang) => {
    document.documentElement.lang = lang;

    // Recupera gli elementi audio e bottone una sola volta all'inizio
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playAudio');


    try {
        const pageId = getCurrentPageId();

        // 1. Fetch dal percorso dinamico corretto
        // Il percorso ora è: data/translations/it/texts.json (relativo all'HTML)
        const response = await fetch(`data/translations/${lang}/texts.json`);

        if (!response.ok) {
            console.error(`File di traduzione non trovato per la lingua: ${lang}. Tentativo di fallback su 'it'. Status: ${response.status}`);

            // Logica di Fallback: Se il file specifico non esiste, prova con l'italiano
            if (lang !== 'it') {
                loadContent('it');
                return; // Ferma l'esecuzione corrente
            }
            throw new Error(`Impossibile caricare i dati per ${lang}. Nessun fallback disponibile.`);
        }

        const data = await response.json();

        // La tua struttura JSON precedente usava la chiave pageId direttamente.
        // Se la tua nuova struttura usa 'pages': const pageData = data.pages[pageId];
        // Manteniamo la tua vecchia implementazione:
        const pageData = data[pageId];

        if (!pageData) {
            console.warn(`Dati non trovati per la chiave pagina: ${pageId} nel file JSON per la lingua: ${lang}.`);
            updateTextContent('headerTitle', `[ERRORE] Dati mancanti (${pageId}/${lang})`);

            // Rendi visibile anche in caso di errore dati per non bloccare la pagina
            document.body.classList.add('content-loaded');
            return;
        }

        // AGGIORNAMENTO NAVIGAZIONE (Requisito 5)
        if (data.nav) {
            const suffix = `-${lang}.html`;

            // Aggiorna gli href e i testi dei link (Assumendo questi ID nel tuo HTML)
            // L'HTML deve avere: <a id="navHome" href="#"></a>, <a id="navCarracci" href="#"></a>, ecc.
            const navItems = {
                'navHome': 'index',
                'navCarracci': 'carracci',
                'navLastre': 'lastre',
                'navPugliole': 'pugliole',
                // Aggiungi qui gli altri archi se necessario
            };

            for (const [id, fileBase] of Object.entries(navItems)) {
                const element = document.getElementById(id);
                const textKey = id; // es. navHome

                if (element && data.nav[textKey]) {
                    element.href = `${fileBase}${suffix}`;
                    updateTextContent(id, data.nav[textKey]);
                }
            }
        }

        // AGGIORNAMENTO IMMAGINE DI FONDO TESTATA (Requisito 8)
        const headerTitleElement = document.getElementById('headerTitle');
        const headerImage = document.querySelector('.header-image-container img'); // Se usi il selettore .header-image-container img
        if (headerImage && pageData.headerImageSource) {
            headerImage.src = pageData.headerImageSource;
        }

        // AGGIORNAMENTO DEL CONTENUTO (Requisito 7: Testi principali)
        updateTextContent('pageTitle', pageData.pageTitle);
        // Usa pageData.pageTitle anche per il titolo visibile nell'header
        if (headerTitleElement && pageData.pageTitle) {
            const displayTitle = pageData.pageTitle.replace(' - Portico di San Luca', '');
            headerTitleElement.textContent = displayTitle;
        }

        updateTextContent('mainText', pageData.mainText);
        updateTextContent('mainText1', pageData.mainText1);
        updateTextContent('mainText2', pageData.mainText2);
        updateTextContent('mainText3', pageData.mainText3);
        updateTextContent('mainText4', pageData.mainText4);
        updateTextContent('mainText5', pageData.mainText5);

        // AGGIORNAMENTO INFORMAZIONI SULLA FONTE E DATA
        updateTextContent('infoSource', pageData.sourceText ? `Fonte: ${pageData.sourceText}` : '');
        updateTextContent('infoCreatedDate', pageData.creationDate || '');
        updateTextContent('infoUpdatedDate', pageData.lastUpdate || '');

        // AGGIORNAMENTO AUDIO E BOTTONE (Requisito 3)
        if (audioPlayer && playButton && pageData.audioSource) {
            // Resetta l'audio se stava già suonando da una pagina precedente
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }

            // Imposta i testi del bottone e la sorgente
            playButton.textContent = pageData.playAudioButton || 'Play Audio';
            playButton.dataset.playText = pageData.playAudioButton || 'Play Audio';
            playButton.dataset.pauseText = pageData.pauseAudioButton || 'Pausa';
            audioPlayer.src = pageData.audioSource;
            audioPlayer.load();

            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');

            // Inizializza l'event listener audio (deve essere separato dal DOMContentLoaded)
            initAudioListener(audioPlayer, playButton);
        }

        // AGGIORNAMENTO IMMAGINI DINAMICHE (Requisito 9: Max 5 immagini)
        for (let i = 1; i <= 5; i++) {
            // Nota: Ho cambiato l'ID da 'imageX' a 'pageImageX' per chiarezza, 
            // ma usa l'ID che hai effettivamente nell'HTML.
            const imageElement = document.getElementById(`pageImage${i}`);
            const imageSource = pageData[`imageSource${i}`];

            if (imageElement) {
                imageElement.src = imageSource || '';
                // Nascondi l'elemento se non ha una sorgente
                imageElement.style.display = imageSource ? 'block' : 'none';
            }
        }

        // 2. Inizializza gli altri event listener (Hamburger, Lingua)
        initOtherEventListeners(lang);

        console.log(`✅ Contenuto caricato con successo per la lingua: ${lang} e pagina: ${pageId}`);

    } catch (error) {
        console.error('Errore critico nel caricamento dei testi:', error);
        updateTextContent('headerTitle', `[ERRORE CRITICO] Caricamento fallito.`);

        // Logica di fallback finale, se necessario, qui.
    } finally {
        // 🔥 CORREZIONE FOUT: Rendi visibile il corpo della pagina (SEMPRE)
        document.body.classList.add('content-loaded');
    }
};

// ===========================================
// LOGICA INIZIALIZZAZIONE EVENTI
// ===========================================

/**
 * Inizializza l'event listener specifico per il pulsante audio.
 */
function initAudioListener(audioPlayer, playButton) {
    // Rimuove eventuali listener precedenti prima di aggiungerne uno nuovo per la pagina corrente
    const newPlayButton = playButton.cloneNode(true);
    playButton.parentNode.replaceChild(newPlayButton, playButton);

    newPlayButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            newPlayButton.textContent = newPlayButton.dataset.pauseText;
            newPlayButton.classList.remove('play-style');
            newPlayButton.classList.add('pause-style');
        } else {
            audioPlayer.pause();
            newPlayButton.textContent = newPlayButton.dataset.playText;
            newPlayButton.classList.remove('pause-style');
            newPlayButton.classList.add('play-style');
        }
    });

    // Reset del pulsante quando l'audio finisce
    audioPlayer.addEventListener('ended', () => {
        newPlayButton.textContent = newPlayButton.dataset.playText;
        newPlayButton.classList.remove('pause-style');
        newPlayButton.classList.add('play-style');
    });
}

/**
 * Inizializza gli event listener che non dipendono dai dati della pagina (Hamburger, Lingua).
 */
function initOtherEventListeners(currentLang) {
    // --- Logica Menu Hamburger ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.querySelector('.nav-bar');

    if (menuToggle && navBar) {
        // Verifica se l'evento è già stato assegnato
        if (!menuToggle.dataset.listenerAttached) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navBar.classList.toggle('active');
            });

            // Chiude il menu quando si clicca un link in modalità mobile
            const navLinks = document.querySelectorAll('.nav-bar .nav-links a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    setTimeout(() => {
                        menuToggle.classList.remove('active');
                        navBar.classList.remove('active');
                    }, 100);
                });
            });
            menuToggle.dataset.listenerAttached = 'true';
        }
    }

    // --- Logica Selettore Lingua ---
    const langButtons = document.querySelectorAll('.language-selector button');
    langButtons.forEach(button => {
        // Assicurati che il listener venga aggiunto una sola volta
        if (!button.dataset.listenerAttached) {
            button.addEventListener('click', (e) => {
                const newLang = e.currentTarget.dataset.lang;
                if (newLang !== currentLang) {
                    const newPath = document.location.pathname.replace(`-${currentLang}.html`, `-${newLang}.html`);
                    document.location.href = newPath;
                }
            });
            button.dataset.listenerAttached = 'true';
        }
    });
}

// ===========================================
// FUNZIONE PRINCIPALE (Inizializzazione)
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Determina la lingua corrente dall'URL
    const urlPath = document.location.pathname;
    const langMatch = urlPath.match(/-([a-z]{2})\.html/);
    const currentLang = langMatch ? langMatch[1] : 'it';

    // 2. Avvia il caricamento del contenuto asincrono
    loadContent(currentLang);
});