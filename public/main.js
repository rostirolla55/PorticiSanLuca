// ===========================================
// DATI: Punti di Interesse GPS (DA COMPILARE)
// ===========================================
const ARCO_LOCATIONS = [
    // Devi popolare questa lista con le coordinate reali dei tuoi archi.
    // L'ID deve corrispondere al nome del file HTML (es. 'arco119')
    // Esempio:
    // { id: 'arco119', lat: 44.4984, lon: 11.3392, distancethreshold: 20 },
    // chiesa_santa_caterina_di_saragozza
   // psontuoso
    { id: 'psontuoso', lat: 44.4906555555556, lon: 11.3292888888889, distancethreshold: 2 },
    // lapide_saragozza_inizio
    { id: 'lapide1', lat: 44.4905777777778, lon: 11.3291777777778, distancethreshold: 2 },
    // lapide_saragozza_inizio
    { id: 'lapide2', lat: 44.4905694444444, lon: 11.3291861111111, distancethreshold: 2 },
    // arco53
    { id: 'arco53', lat: 44.4904611111111, lon: 11.325975, distancethreshold: 2 },
    // arco52
    { id: 'arco52', lat: 44.4904611111111, lon: 11.325975, distancethreshold: 2 },
    // arco53
    { id: 'arco53', lat: 44.4895444444444, lon: 11.3256527777778, distancethreshold: 2 },
    // arco53
    { id: 'arco53', lat: 44.4905555555556, lon: 11.3260166666667, distancethreshold: 2 },
    // arco119
    { id: 'arco119', lat: 44.4899083333333, lon: 11.3221305555556, distancethreshold: 2 },
    // arco119
    { id: 'arco119', lat: 44.4899083333333, lon: 11.3223944444444, distancethreshold: 2 },
    // arco119
    { id: 'arco119', lat: 44.4899416666667, lon: 11.3221583333333, distancethreshold: 2 },
    // arco126
    { id: 'arco126', lat: 44.4898138888889, lon: 11.3217194444444, distancethreshold: 2 },
    // arco126
    { id: 'arco126', lat: 44.4898166666667, lon: 11.3216722222222, distancethreshold: 2 },
    // arco126
    { id: 'arco126', lat: 44.4898166666667, lon: 11.3216722222222, distancethreshold: 2 },
    // arco132a
    { id: 'arco132a', lat: 44.4897666666667, lon: 11.3214361111111, distancethreshold: 2 },
    // arco132a
    { id: 'arco132a', lat: 44.4897666666667, lon: 11.3214361111111, distancethreshold: 2 },
    // arco132a
    { id: 'arco132a', lat: 44.489775, lon: 11.3214083333333, distancethreshold: 2 },
    // arco131
    { id: 'arco131', lat: 44.4897777777778, lon: 11.3214666666667, distancethreshold: 2 },
    // arco132
    { id: 'arco132', lat: 44.4897777777778, lon: 11.3214666666667, distancethreshold: 2 },
    // arco133
    { id: 'arco133', lat: 44.4897611111111, lon: 11.3214111111111, distancethreshold: 2 },
    // arco136b
    { id: 'arco136b', lat: 44.4897472222222, lon: 11.3212333333333, distancethreshold: 2 },
    // arco142a
    { id: 'arco142a', lat: 44.4897111111111, lon: 11.3209055555556, distancethreshold: 2 },
    // arco142a
    { id: 'arco142a', lat: 44.4897111111111, lon: 11.3209055555556, distancethreshold: 2 },
    // arco143c
    { id: 'arco143c', lat: 44.4896972222222, lon: 11.3208805555556, distancethreshold: 2 },
    // arco148
    { id: 'arco148', lat: 44.4895333333333, lon: 11.3204222222222, distancethreshold: 2 },
    // arco163
    { id: 'arco163', lat: 44.48935, lon: 11.3195666666667, distancethreshold: 2 },
    // arco171
    { id: 'arco171', lat: 44.4892611111111, lon: 11.3191833333333, distancethreshold: 2 },
    // arco180
    { id: 'arco180', lat: 44.489075, lon: 11.3185305555556, distancethreshold: 2 },
    // arco182
    { id: 'arco182', lat: 44.4890333333333, lon: 11.3184555555556, distancethreshold: 2 },
    // arco
    { id: 'arco', lat: 44.4890416666667, lon: 11.3184583333333, distancethreshold: 2 },
    // arco183
    { id: 'arco183', lat: 44.4890416666667, lon: 11.3184583333333, distancethreshold: 2 },
    // arco
    { id: 'arco', lat: 44.489025, lon: 11.3184055555556, distancethreshold: 2 },
    // arco186b
    { id: 'arco186b', lat: 44.4889527777778, lon: 11.3182138888889, distancethreshold: 2 },
    // arco188
    { id: 'arco188', lat: 44.4889111111111, lon: 11.3180777777778, distancethreshold: 2 },
    // arco190
    { id: 'arco190', lat: 44.4888888888889, lon: 11.3180111111111, distancethreshold: 2 },
    // arco192
    { id: 'arco192', lat: 44.4889055555556, lon: 11.3180277777778, distancethreshold: 2 },
    // arco192c
    { id: 'arco192c', lat: 44.4889083333333, lon: 11.318025, distancethreshold: 2 },
    // arco201a
    { id: 'arco201a', lat: 44.488775, lon: 11.3177194444444, distancethreshold: 2 },
    // arco202a
    { id: 'arco202a', lat: 44.4888222222222, lon: 11.3176722222222, distancethreshold: 2 },
    // arco203b
    { id: 'arco203b', lat: 44.4888416666667, lon: 11.3175222222222, distancethreshold: 2 },
    // arco208
    { id: 'arco208', lat: 44.4888722222222, lon: 11.3168722222222, distancethreshold: 2 },
    // arco208b
    { id: 'arco208b', lat: 44.4888722222222, lon: 11.3168722222222, distancethreshold: 2 },
    // arco211
    { id: 'arco211', lat: 44.4887916666667, lon: 11.3164027777778, distancethreshold: 2 },
    // arco
    { id: 'arco', lat: 44.4887916666667, lon: 11.3164027777778, distancethreshold: 2 },
    // arco218
    { id: 'arco218', lat: 44.4888694444444, lon: 11.3161555555556, distancethreshold: 2 },
    // arco249a
    { id: 'arco249a', lat: 44.489775, lon: 11.3150916666667, distancethreshold: 2 },
    // lapide1
    { id: 'lapide1', lat: 44.4898805555556, lon: 11.3145527777778, distancethreshold: 2 },
    // arco256
    { id: 'arco256', lat: 44.4899638888889, lon: 11.3144055555556, distancethreshold: 2 },
    // arco256
    { id: 'arco256', lat: 44.4899638888889, lon: 11.3143611111111, distancethreshold: 2 },
    // arco258
    { id: 'arco258', lat: 44.4900722222222, lon: 11.3141138888889, distancethreshold: 2 },
    // arco283
    { id: 'arco283', lat: 44.4900694444444, lon: 11.3127166666667, distancethreshold: 2 },
    // lapide
    { id: 'lapide', lat: 44.4902444444444, lon: 11.3111833333333, distancethreshold: 2 },
    // lapide
    { id: 'lapide', lat: 44.4901805555556, lon: 11.3111888888889, distancethreshold: 2 },
    // lapide
    { id: 'lapide', lat: 44.4901638888889, lon: 11.3112527777778, distancethreshold: 2 },
    // lapide
    { id: 'lapide', lat: 44.4901694444444, lon: 11.3111944444444, distancethreshold: 2 },
    // lapide1
    { id: 'lapide1', lat: 44.4901694444444, lon: 11.3111944444444, distancethreshold: 2 },
    // lapide
    { id: 'lapide', lat: 44.4899916666667, lon: 11.311125, distancethreshold: 2 },
    // lapide
    { id: 'lapide', lat: 44.4899916666667, lon: 11.311125, distancethreshold: 2 },
    // lapide
    { id: 'lapide', lat: 44.4900222222222, lon: 11.3108361111111, distancethreshold: 2 }

];
// ===========================================
// VARIABILI GLOBALI (Dichiarate, non inizializzate subito)
// ===========================================
let audioPlayer;
let playButton;
let menuButton; // Riferimento al nuovo bottone
let menuContainer; // Riferimento al nuovo menu

// ===========================================
// FUNZIONI UTILITY
// ===========================================

// Restituisce l'ID base della pagina (es. 'home', 'pugliole') leggendolo dall'ID del body
const getCurrentPageId = () => {
    // Legge l'ID dal tag body (es. <body id="home">)
    const bodyId = document.body.id;
    if (bodyId) {
        return bodyId.toLowerCase();
    }
    // Fallback se l'ID non è impostato o è index, usa 'home'
    const path = window.location.pathname;
    let baseId = path.substring(path.lastIndexOf('/') + 1).replace(/-[a-z]{2}\.html/i, '').replace('.html', '').toLowerCase();
    return baseId || 'home';
};

// Aggiorna il testo solo se l'elemento esiste
const updateTextContent = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value || '';
    }
};

// Funzione helper per ottenere il nome del file di destinazione
const getDestinationPageName = (pageId, langCode) => {
    return `${pageId}-${langCode}.html`;
};

// Funzione helper per il reindirizzamento (Ora definita SOLO qui)
function redirectToPage(targetId, currentLang) {
    const targetPage = getDestinationPageName(targetId, currentLang);
    const currentPath = window.location.pathname;

    // Evita un reindirizzamento infinito
    if (!currentPath.includes(targetPage)) {
        // Nascondi il menu prima di reindirizzare
        hideContextualMenu();
        console.log(`GPS: Reindirizzamento a ${targetPage}`);
        window.location.href = targetPage;
    }
};

// ===========================================
// LOGICA CARICAMENTO CONTENUTI (Requisito 5, 7, 8, 9, 11)
// ===========================================

const loadContent = async (lang) => {
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

            // Rendi visibile anche in caso di errore dati, ma lascia l'errore in console
            document.body.classList.add('content-loaded');
            return;
        }

        // AGGIORNAMENTO NAVIGAZIONE (Requisito 5)
        if (data.nav) {
            const suffix = `-${lang}.html`;

            // Aggiorna gli href del menu (usando i nuovi nomi file XX-lingua.html)

            document.getElementById('navARCO119').href = `arco119${suffix}`;
            document.getElementById('navARCO126B').href = `arco126b${suffix}`;
            document.getElementById('navARCO132A').href = `arco132a${suffix}`;
            document.getElementById('navARCO133A').href = `arco133a${suffix}`;
            document.getElementById('navARCO136B').href = `arco136b${suffix}`;
            document.getElementById('navARCO142A').href = `arco142a${suffix}`;
            document.getElementById('navARCO143C').href = `arco143c${suffix}`;
            document.getElementById('navARCO148').href = `arco148${suffix}`;
            document.getElementById('navARCO163').href = `arco163${suffix}`;
            document.getElementById('navARCO171B').href = `arco171b${suffix}`;
            document.getElementById('navARCO180').href = `arco180${suffix}`;
            document.getElementById('navARCO182').href = `arco182${suffix}`;
            document.getElementById('navARCO183').href = `arco183${suffix}`;
            document.getElementById('navARCO186B').href = `arco186b${suffix}`;
            document.getElementById('navARCO188B').href = `arco188b${suffix}`;
            document.getElementById('navARCO190').href = `arco190${suffix}`;
            document.getElementById('navARCO192C').href = `arco192c${suffix}`;
            document.getElementById('navARCO201A').href = `arco201a${suffix}`;
            document.getElementById('navARCO202A').href = `arco202a${suffix}`;
            document.getElementById('navARCO203B').href = `arco203b${suffix}`;
            document.getElementById('navARCO208B').href = `arco208b${suffix}`;
            document.getElementById('navARCO211B').href = `arco211b${suffix}`;
            document.getElementById('navARCO218B').href = `arco218b${suffix}`;
            document.getElementById('navARCO249A').href = `arco249a${suffix}`;
            document.getElementById('navARCO252A').href = `arco252a${suffix}`;
            document.getElementById('navARCO256').href = `arco256${suffix}`;
            document.getElementById('navARCO282A').href = `arco282a${suffix}`;
            document.getElementById('navARCO283A').href = `arco283a${suffix}`;
            document.getElementById('navARCO306B').href = `arco306b${suffix}`;
            document.getElementById('navARCO307A').href = `arco307a${suffix}`;
            document.getElementById('navARCO53C').href = `arco53c${suffix}`;
            document.getElementById('navHome').href = `index${suffix}`;
            document.getElementById('navLAPIDE1').href = `lapide1${suffix}`;
            document.getElementById('navLAPIDE2').href = `lapide2${suffix}`;
            document.getElementById('navPSONTUOSO').href = `psontuoso${suffix}`;

            // Aggiorna il testo dei link
            updateTextContent('navARCO119', data.nav.navARCO119);
            updateTextContent('navARCO126B', data.nav.navARCO126B);
            updateTextContent('navARCO132A', data.nav.navARCO132A);
            updateTextContent('navARCO133A', data.nav.navARCO133A);
            updateTextContent('navARCO136B', data.nav.navARCO136B);
            updateTextContent('navARCO142A', data.nav.navARCO142A);
            updateTextContent('navARCO143C', data.nav.navARCO143C);
            updateTextContent('navARCO148', data.nav.navARCO148);
            updateTextContent('navARCO163', data.nav.navARCO163);
            updateTextContent('navARCO171B', data.nav.navARCO171B);
            updateTextContent('navARCO180', data.nav.navARCO180);
            updateTextContent('navARCO182', data.nav.navARCO182);
            updateTextContent('navARCO183', data.nav.navARCO183);
            updateTextContent('navARCO186B', data.nav.navARCO186B);
            updateTextContent('navARCO188B', data.nav.navARCO188B);
            updateTextContent('navARCO190', data.nav.navARCO190);
            updateTextContent('navARCO192C', data.nav.navARCO192C);
            updateTextContent('navARCO201A', data.nav.navARCO201A);
            updateTextContent('navARCO202A', data.nav.navARCO202A);
            updateTextContent('navARCO203B', data.nav.navARCO203B);
            updateTextContent('navARCO208B', data.nav.navARCO208B);
            updateTextContent('navARCO211B', data.nav.navARCO211B);
            updateTextContent('navARCO218B', data.nav.navARCO218B);
            updateTextContent('navARCO249A', data.nav.navARCO249A);
            updateTextContent('navARCO252A', data.nav.navARCO252A);
            updateTextContent('navARCO256', data.nav.navARCO256);
            updateTextContent('navARCO282A', data.nav.navARCO282A);
            updateTextContent('navARCO283A', data.nav.navARCO283A);
            updateTextContent('navARCO306B', data.nav.navARCO306B);
            updateTextContent('navARCO307A', data.nav.navARCO307A);
            updateTextContent('navARCO53C', data.nav.navARCO53C);
            updateTextContent('navHome', data.nav.navHome);
            updateTextContent('navLAPIDE1', data.nav.navLAPIDE1);
            updateTextContent('navLAPIDE2', data.nav.navLAPIDE2);
            updateTextContent('navPSONTUOSO', data.nav.navPSONTUOSO);
        }

        // AGGIORNAMENTO IMMAGINE DI FONDO TESTATA (Requisito 8)
        const headerImage = document.getElementById('headerImage');
        if (headerImage && pageData.headerImageSource) {
            headerImage.src = pageData.headerImageSource;
        }

        // AGGIORNAMENTO DEL CONTENUTO (Requisito 7: Testi principali)
        updateTextContent('pageTitle', pageData.pageTitle);
        updateTextContent('mainText', pageData.mainText);
        updateTextContent('mainText1', pageData.mainText1);
        updateTextContent('mainText2', pageData.mainText2);
        updateTextContent('mainText3', pageData.mainText3);
        updateTextContent('mainText4', pageData.mainText4);
        updateTextContent('mainText5', pageData.mainText5);

        // 🔥 AGGIORNAMENTO INFORMAZIONI SULLA FONTE E DATA
        if (pageData.sourceText) {
            // Usiamo il testo come etichetta e valore
            updateTextContent('infoSource', `Fonte: ${pageData.sourceText}`);
        }

        if (pageData.creationDate) {
            updateTextContent('infoCreatedDate', pageData.creationDate);
        }

        if (pageData.lastUpdate) {
            updateTextContent('infoUpdatedDate', pageData.lastUpdate);
        }

        // AGGIORNAMENTO AUDIO E BOTTONE (Requisito 3)
        if (audioPlayer && playButton && pageData.audioSource) {
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }

            // Imposta i testi del bottone
            playButton.textContent = pageData.playAudioButton;
            playButton.dataset.playText = pageData.playAudioButton;
            playButton.dataset.pauseText = pageData.pauseAudioButton;

            // Imposta la sorgente audio
            audioPlayer.src = pageData.audioSource;
            audioPlayer.load();

            playButton.classList.remove('pause-style');
            playButton.classList.add('play-style');
        }

        // AGGIORNAMENTO IMMAGINI DINAMICHE (Requisito 9: Max 5 immagini)
        for (let i = 1; i <= 5; i++) {
            const imageElement = document.getElementById(`pageImage${i}`);
            const imageSource = pageData[`imageSource${i}`];

            if (imageElement) {
                imageElement.src = imageSource || '';
                imageElement.style.display = imageSource ? 'block' : 'none';
            }
        }

        console.log(`✅ Contenuto caricato con successo per la lingua: ${lang} e pagina: ${pageId}`);

        // 🔥 CORREZIONE FOUT: Rendi visibile il corpo della pagina
        document.body.classList.add('content-loaded');

    } catch (error) {
        console.error('Errore critico nel caricamento dei testi:', error);
        updateTextContent('pageTitle', `[ERRORE CRITICO] Caricamento fallito.`);

        // 🔥 CORREZIONE FOUT: Rendi comunque visibile il corpo per non lasciare la pagina vuota
        document.body.classList.add('content-loaded');
    }
};
// ===========================================
// FUNZIONI DI GESTIONE EVENTI AUDIO
// ===========================================

const handleAudioClick = function () {
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
// LOGICA AUDIO E GPS
// ===========================================

// Gestione Play/Pause (Requisito 3)
const setupAudioControl = () => {
    if (audioPlayer && playButton) {

        // Rimuovi listener precedenti (più robusto)
        playButton.removeEventListener('click', handleAudioClick);
        audioPlayer.removeEventListener('ended', handleAudioEnded);

        // Aggiungi listener usando le funzioni nominate
        playButton.addEventListener('click', handleAudioClick);
        audioPlayer.addEventListener('ended', handleAudioEnded);
    }
};

// Funzioni GPS (Requisito 6.3)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

// ===========================================
// FUNZIONI MENU CONTESTUALE GPS 🔥 NUOVE AGGIUNTE 🔥
// ===========================================

// 1. Nasconde il bottone e chiude il menu contestuale
const hideContextualMenu = () => {
    if (menuButton) {
        menuButton.style.display = 'none';
        menuButton.onclick = null; // Rimuove il listener di click
    }
    if (menuContainer) {
        menuContainer.classList.remove('active');
    }
};

// 2. Mostra il bottone e popola il menu contestuale con i POI vicini
const renderContextualMenu = (locations, currentLang) => {
    if (!menuButton || !menuContainer) {
        console.error("Mancano gli elementi HTML per il menu contestuale.");
        return;
    }

    // 1. Popola il menu
    let htmlContent = '';

    locations.forEach(location => {
        // Usiamo l'ID e la distanza (in metri) per il testo
        // Nota: se volessi i nomi tradotti, dovresti caricare il JSON qui

        // Reindirizzamento tramite la funzione globale redirectToPage
        htmlContent += `
            <li>
                <a href="#" onclick="redirectToPage('${location.id}', '${currentLang}'); return false;">
                    Vai a: ${location.id} (${location.distance} m)
                </a>
            </li>
        `;
    });

    // Inserisci il contenuto nella lista del menu
    const ul = menuContainer.querySelector('ul');
    if (ul) {
        ul.innerHTML = htmlContent;
    }

    // 2. Rendi visibile il bottone e gestisci l'apertura del menu
    menuButton.style.display = 'block';

    // Toggle menu: Se il bottone è cliccato, mostra/nascondi il contenitore
    menuButton.onclick = () => {
        menuContainer.classList.toggle('active');
    };
};

// ===========================================
// FUNZIONI DI GEOLOCALIZZAZIONE (GPS) - Versione Stabile
// ===========================================

const checkProximity = (position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const currentLang = document.documentElement.lang || 'it';

    const currentPageId = document.body.id;
    const isOnHomePage = (currentPageId === 'index' || currentPageId === 'home');

    // Filtro critico: interveniamo solo dalla Home page
    if (!isOnHomePage) {
        // Assicurati che il menu sia nascosto se l'utente si sposta dalla home
        hideContextualMenu();
        return;
    }

    let nearbyLocations = []; // Array per collezionare TUTTI i POI vicini

    // 1. SCORRI TUTTI I POI PER TROVARE QUELLI NEL RAGGIO CONSENTITO
    for (const location of ARCO_LOCATIONS) {
        const distance = calculateDistance(userLat, userLon, location.lat, location.lon);

        if (distance <= 20) { // Usiamo 20 metri come soglia massima
            // Aggiungiamo i dati necessari (ID pagina e distanza)
            nearbyLocations.push({
                id: location.id,
                distance: distance.toFixed(1)
            });
        }
    }

    // 2. ELIMINA I DUPLICATI E ORDINA PER DISTANZA
    const uniqueLocations = nearbyLocations.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        }
        return acc;
    }, []).sort((a, b) => a.distance - b.distance); // Ordina dal più vicino al più lontano


    // 3. DECISIONE SUL DISPLAY
    if (uniqueLocations.length === 0) {
        // Nessun POI vicino
        console.log("GPS: Nessun POI significativo nelle vicinanze.");
        hideContextualMenu();
    } else if (uniqueLocations.length === 1) {
        // UN SOLO POI VICINO: Reindirizzamento immediato
        console.log(`GPS: Trovato un solo POI: ${uniqueLocations[0].id}. Reindirizzamento automatico.`);
        hideContextualMenu(); // Nascondi il bottone prima di reindirizzare
        redirectToPage(uniqueLocations[0].id, currentLang);

    } else {
        // DUE O PIÙ POI VICINI: Mostra il menu di selezione
        console.log(`GPS: Trovati ${uniqueLocations.length} POI concorrenti. Mostro menu.`);
        renderContextualMenu(uniqueLocations, currentLang);
    }
};

const startGeolocation = () => {
    if (navigator.geolocation && ARCO_LOCATIONS.length > 0) {
        navigator.geolocation.watchPosition(checkProximity,
            (error) => console.warn(`ERRORE GPS: ${error.code}: ${error.message}`),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
        console.log("GPS: Monitoraggio avviato.");
    }
};


// ===========================================
// INIZIALIZZAZIONE
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

    // 🔥 1. INIETTA IL MARKUP DEL MENU NEL CONTENITORE (#nav-container) 🔥
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = NAV_MARKUP_TEMPLATE; 
    }

    // 2. ASSEGNAZIONE SICURA DELLE VARIABILI GLOBALI (RESTO DELLE ASSEGNAZIONI)
    // Queste assegnazioni rimangono qui e funzionano anche se i loro elementi non sono ancora nella pagina.
    audioPlayer = document.getElementById('audioPlayer');
    playButton = document.getElementById('playAudio');
    menuButton = document.getElementById('show-contextual-menu'); // Bottone GPS
    menuContainer = document.getElementById('contextual-menu-container'); // Menu contenitore


    // 🔥 3. Gestione Menu Hamburger (Requisito 5) - ORA GLI ELEMENTI ESISTONO!
    // Selezioniamo gli elementi *dopo* l'iniezione (Passo 1)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list'); // Classe usata nel markup REXX

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Aggiungi la chiusura del menu dopo aver cliccato un link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }

    // 4. ESECUZIONE DELLE FUNZIONI
    setupAudioControl();
    startGeolocation();

    // Carica i contenuti nella lingua dell'HTML
    const currentHTMLlang = document.documentElement.lang;
    loadContent(currentHTMLlang);

    // 🔥 5. NUOVO BLOCCO: Invia la lingua corrente a Google Analytics
    if (typeof gtag === 'function') {
        gtag('set', { 'lingua_pagina': currentHTMLlang });

        // Invia un evento di visualizzazione di pagina con il dato della lingua associato
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'lingua_pagina': currentHTMLlang // Parametro da tracciare!
        });
    }
});