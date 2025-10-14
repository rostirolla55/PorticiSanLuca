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
const ARCO_LOCATIONS = [
    // I tuoi dati GPS:
    { id: 'Chiesa_Santa_Caterina_di_Saragozza', lat: 44.4899888888889, lon: 11.3327638888889, distanceThreshold: 15 },
    { id: 'Chiesa_Santa_Caterina_di_Saragozza', lat: 44.4900444444444, lon: 11.3328472222222, distanceThreshold: 15 },
    { id: 'Chiesa_Santa_Caterina_di_Saragozza', lat: 44.4900305555556, lon: 11.3328472222222, distanceThreshold: 15 },
    { id: 'Numero_civico_vecchio_di_Saragozza', lat: 44.4900055555556, lon: 11.3328444444444, distanceThreshold: 15 },
    { id: 'Rione_Falansterio', lat: 44.4903861111111, lon: 11.3311861111111, distanceThreshold: 15 },
    { id: 'Rione_Falansterio', lat: 44.4903944444444, lon: 11.3310305555556, distanceThreshold: 15 },
    { id: 'Portone_Sontuoso', lat: 44.4906555555556, lon: 11.3292888888889, distanceThreshold: 15 },
    { id: 'Lapide_Saragozza_inizio', lat: 44.4905777777778, lon: 11.3291777777778, distanceThreshold: 15 },
    { id: 'Lapide_Saragozza_inizio', lat: 44.4905694444444, lon: 11.3291861111111, distanceThreshold: 15 },
    { id: 'Arco53', lat: 44.4904611111111, lon: 11.325975, distanceThreshold: 15 },
    { id: 'Arco52', lat: 44.4904611111111, lon: 11.325975, distanceThreshold: 15 },
    { id: 'Arco53', lat: 44.4895444444444, lon: 11.3256527777778, distanceThreshold: 15 },
    { id: 'Arco53', lat: 44.4905555555556, lon: 11.3260166666667, distanceThreshold: 15 },
    { id: 'Arco119', lat: 44.4899083333333, lon: 11.3221305555556, distanceThreshold: 15 },
    { id: 'Arco119', lat: 44.4899083333333, lon: 11.3223944444444, distanceThreshold: 15 },
    { id: 'Arco119', lat: 44.4899416666667, lon: 11.3221583333333, distanceThreshold: 15 },
    { id: 'Arco126', lat: 44.4898138888889, lon: 11.3217194444444, distanceThreshold: 15 },
    { id: 'Arco126', lat: 44.4898166666667, lon: 11.3216722222222, distanceThreshold: 15 },
    { id: 'Arco126', lat: 44.4898166666667, lon: 11.3216722222222, distanceThreshold: 15 },
    { id: 'Arco132a', lat: 44.4897666666667, lon: 11.3214361111111, distanceThreshold: 15 },
    { id: 'Arco132a', lat: 44.4897666666667, lon: 11.3214361111111, distanceThreshold: 15 },
    { id: 'Arco132a', lat: 44.489775, lon: 11.3214083333333, distanceThreshold: 15 },
    { id: 'Arco131', lat: 44.4897777777778, lon: 11.3214666666667, distanceThreshold: 15 },
    { id: 'Arco132', lat: 44.4897777777778, lon: 11.3214666666667, distanceThreshold: 15 },
    { id: 'Arco133', lat: 44.4897611111111, lon: 11.3214111111111, distanceThreshold: 15 },
    { id: 'Arco136b', lat: 44.4897472222222, lon: 11.3212333333333, distanceThreshold: 15 },
    { id: 'Arco142a', lat: 44.4897111111111, lon: 11.3209055555556, distanceThreshold: 15 },
    { id: 'Arco142a', lat: 44.4897111111111, lon: 11.3209055555556, distanceThreshold: 15 },
    { id: 'Arco143c', lat: 44.4896972222222, lon: 11.3208805555556, distanceThreshold: 15 },
    { id: 'Arco148', lat: 44.4895333333333, lon: 11.3204222222222, distanceThreshold: 15 },
    { id: 'Arco163', lat: 44.48935, lon: 11.3195666666667, distanceThreshold: 15 },
    { id: 'Arco171', lat: 44.4892611111111, lon: 11.3191833333333, distanceThreshold: 15 },
    { id: 'Arco180', lat: 44.489075, lon: 11.3185305555556, distanceThreshold: 15 },
    { id: 'Arco182', lat: 44.4890333333333, lon: 11.3184555555556, distanceThreshold: 15 },
    { id: 'Arco', lat: 44.4890416666667, lon: 11.3184583333333, distanceThreshold: 15 },
    { id: 'Arco183', lat: 44.4890416666667, lon: 11.3184583333333, distanceThreshold: 15 },
    { id: 'Arco', lat: 44.489025, lon: 11.3184055555556, distanceThreshold: 15 },
    { id: 'Arco186b', lat: 44.4889527777778, lon: 11.3182138888889, distanceThreshold: 15 },
    { id: 'Arco188', lat: 44.4889111111111, lon: 11.3180777777778, distanceThreshold: 15 },
    { id: 'Arco190', lat: 44.4888888888889, lon: 11.3180111111111, distanceThreshold: 15 },
    { id: 'Arco192', lat: 44.4889055555556, lon: 11.3180277777778, distanceThreshold: 15 },
    { id: 'Arco192c', lat: 44.4889083333333, lon: 11.318025, distanceThreshold: 15 },
    { id: 'Arco201a', lat: 44.488775, lon: 11.3177194444444, distanceThreshold: 15 },
    { id: 'Arco202a', lat: 44.4888222222222, lon: 11.3176722222222, distanceThreshold: 15 },
    { id: 'Arco203b', lat: 44.4888416666667, lon: 11.3175222222222, distanceThreshold: 15 },
    { id: 'Arco208', lat: 44.4888722222222, lon: 11.3168722222222, distanceThreshold: 15 },
    { id: 'Arco208b', lat: 44.4888722222222, lon: 11.3168722222222, distanceThreshold: 15 },
    { id: 'Arco211', lat: 44.4887916666667, lon: 11.3164027777778, distanceThreshold: 15 },
    { id: 'Arco', lat: 44.4887916666667, lon: 11.3164027777778, distanceThreshold: 15 },
    { id: 'Arco218', lat: 44.4888694444444, lon: 11.3161555555556, distanceThreshold: 15 },
    { id: 'Arco249a', lat: 44.489775, lon: 11.3150916666667, distanceThreshold: 15 },
    { id: 'Lapide1', lat: 44.4898805555556, lon: 11.3145527777778, distanceThreshold: 15 },
    { id: 'Arco256', lat: 44.4899638888889, lon: 11.3144055555556, distanceThreshold: 15 },
    { id: 'Arco256', lat: 44.4899638888889, lon: 11.3143611111111, distanceThreshold: 15 },
    { id: 'Arco258', lat: 44.4900722222222, lon: 11.3141138888889, distanceThreshold: 15 },
    { id: 'Arco283', lat: 44.4900694444444, lon: 11.3127166666667, distanceThreshold: 15 },
    { id: 'lapide', lat: 44.4902444444444, lon: 11.3111833333333, distanceThreshold: 15 },
    { id: 'Lapide', lat: 44.4901805555556, lon: 11.3111888888889, distanceThreshold: 15 },
    { id: 'Lapide', lat: 44.4901638888889, lon: 11.3112527777778, distanceThreshold: 15 },
    { id: 'Lapide', lat: 44.4901694444444, lon: 11.3111944444444, distanceThreshold: 15 },
    { id: 'Lapide1', lat: 44.4901694444444, lon: 11.3111944444444, distanceThreshold: 15 },
    { id: 'Lapide', lat: 44.4899916666667, lon: 11.311125, distanceThreshold: 15 },
    { id: 'Lapide', lat: 44.4899916666667, lon: 11.311125, distanceThreshold: 15 },
    { id: 'Lapide', lat: 44.4900222222222, lon: 11.3108361111111, distanceThreshold: 15 }
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
            const suffix = `-${lang}.html`;
            // AGGIORNA HREF E TESTO PER TUTTI I LINK DEL MENU PRINCIPALE

            // 🔥 CORREZIONE: Tutti gli ID sono ora in minuscolo (navarco119, navarco126b, etc.)
            document.getElementById('navarco119').href = `arco119${suffix}`;
            document.getElementById('navarco126b').href = `arco126b${suffix}`;
            document.getElementById('navarco132a').href = `arco132a${suffix}`;
            document.getElementById('navarco133a').href = `arco133a${suffix}`;
            document.getElementById('navarco136b').href = `arco136b${suffix}`;
            document.getElementById('navarco142a').href = `arco142a${suffix}`;
            document.getElementById('navarco143c').href = `arco143c${suffix}`;
            document.getElementById('navarco148').href = `arco148${suffix}`;
            document.getElementById('navarco163').href = `arco163${suffix}`;
            document.getElementById('navarco171b').href = `arco171b${suffix}`;
            document.getElementById('navarco180').href = `arco180${suffix}`;
            document.getElementById('navarco182').href = `arco182${suffix}`;
            document.getElementById('navarco183').href = `arco183${suffix}`;
            document.getElementById('navarco186b').href = `arco186b${suffix}`;
            document.getElementById('navarco188b').href = `arco188b${suffix}`;
            document.getElementById('navarco190').href = `arco190${suffix}`;
            document.getElementById('navarco192c').href = `arco192c${suffix}`;
            document.getElementById('navarco201a').href = `arco201a${suffix}`;
            document.getElementById('navarco202a').href = `arco202a${suffix}`;
            document.getElementById('navarco203b').href = `arco203b${suffix}`;
            document.getElementById('navarco208b').href = `arco208b${suffix}`;
            document.getElementById('navarco211b').href = `arco211b${suffix}`;
            document.getElementById('navarco218b').href = `arco218b${suffix}`;
            document.getElementById('navarco249a').href = `arco249a${suffix}`;
            document.getElementById('navarco252a').href = `arco252a${suffix}`;
            document.getElementById('navarco256').href = `arco256${suffix}`;
            document.getElementById('navarco282a').href = `arco282a${suffix}`;
            document.getElementById('navarco283a').href = `arco283a${suffix}`;
            document.getElementById('navarco306b').href = `arco306b${suffix}`;
            document.getElementById('navarco307a').href = `arco307a${suffix}`;
            document.getElementById('navarco53c').href = `arco53c${suffix}`;
            document.getElementById('navHome').href = `index${suffix}`;
            document.getElementById('navlapide1').href = `lapide1${suffix}`;
            document.getElementById('navlapide2').href = `lapide2${suffix}`;
            document.getElementById('navpsontuoso').href = `psontuoso${suffix}`;
            updateTextContent('navarco119', data.nav.navARCO119);
            updateTextContent('navarco126b', data.nav.navARCO126B);
            updateTextContent('navarco132a', data.nav.navARCO132A);
            updateTextContent('navarco133a', data.nav.navARCO133A);
            updateTextContent('navarco136b', data.nav.navARCO136B);
            updateTextContent('navarco142a', data.nav.navARCO142A);
            updateTextContent('navarco143c', data.nav.navARCO143C);
            updateTextContent('navarco148', data.nav.navARCO148);
            updateTextContent('navarco163', data.nav.navARCO163);
            updateTextContent('navarco171b', data.nav.navARCO171B);
            updateTextContent('navarco180', data.nav.navARCO180);
            updateTextContent('navarco182', data.nav.navARCO182);
            updateTextContent('navarco183', data.nav.navARCO183);
            updateTextContent('navarco186b', data.nav.navARCO186B);
            updateTextContent('navarco188b', data.nav.navARCO188B);
            updateTextContent('navarco190', data.nav.navARCO190);
            updateTextContent('navarco192c', data.nav.navARCO192C);
            updateTextContent('navarco201a', data.nav.navARCO201A);
            updateTextContent('navarco202a', data.nav.navARCO202A);
            updateTextContent('navarco203b', data.nav.navARCO203B);
            updateTextContent('navarco208b', data.nav.navARCO208B);
            updateTextContent('navarco211b', data.nav.navARCO211B);
            updateTextContent('navarco218b', data.nav.navARCO218B);
            updateTextContent('navarco249a', data.nav.navARCO249A);
            updateTextContent('navarco252a', data.nav.navARCO252A);
            updateTextContent('navarco256', data.nav.navARCO256);
            updateTextContent('navarco282a', data.nav.navARCO282A);
            updateTextContent('navarco283a', data.nav.navARCO283A);
            updateTextContent('navarco306b', data.nav.navARCO306B);
            updateTextContent('navarco307a', data.nav.navARCO307A);
            updateTextContent('navarco53c', data.nav.navARCO53C);
            updateTextContent('navHome', data.nav.navHome);
            updateTextContent('navlapide1', data.nav.navLAPIDE1);
            updateTextContent('navlapide2', data.nav.navLAPIDE2);
            updateTextContent('navpsontuoso', data.nav.navPSONTUOSO);
        }

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
    const userLang = document.documentElement.lang || 'it';

    // Logica di reindirizzamento
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

    // 2. DETERMINAZIONE LINGUA CORRENTE
    const urlPath = document.location.pathname;
    const langMatch = urlPath.match(/-([a-z]{2})\.html/);
    const urlLang = langMatch ? langMatch[1] : 'it';

    currentLang = urlLang;

    // 3. INIZIALIZZA LA SELEZIONE LINGUA
    updateLanguageSelectorActiveState(currentLang);

    // 4. CARICAMENTO CONTENUTO (maintext)
    loadContent(currentLang);

    // 5. AVVIA IL MONITORAGGIO GPS
    startGeolocation();

    // 6. INIZIALIZZA GLI EVENT LISTENER
    initEventListeners(currentLang);
});