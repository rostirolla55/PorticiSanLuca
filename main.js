// ===========================================
// CONFIGURAZIONE E COSTANTI GLOBALI
// ===========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, onSnapshot, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const APP_VERSION = '1.2.36 - Lingue (Supporta button, img e tag a)';
const LANGUAGES = ['it', 'en', 'fr', 'es'];
const LAST_LANG_KEY = 'PorticiSanLuca_lastLang';
let currentLang = 'it';
console.log(`Version : ${APP_VERSION}`);

// Elementi DOM Globali
let nearbyPoiButton;
let nearbyMenuPlaceholder;

// Configurazione Firebase
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
let db, auth, currentUserId = null, isAuthReady = false;

// ===========================================
// DATI: POI GPS
// ===========================================
const POIS_LOCATIONS = [
    { id: 'Arco119', lat: 44.4899416666667, lon: 11.3221583333333, distanceThreshold: 15 },
    { id: 'Arco126', lat: 44.4898138888889, lon: 11.3217194444444, distanceThreshold: 15 },
    { id: 'Arco131', lat: 44.4897777777778, lon: 11.3214666666667, distanceThreshold: 15 },
    { id: 'Arco132', lat: 44.4897777777778, lon: 11.3214666666667, distanceThreshold: 15 },
    { id: 'Arco132a', lat: 44.4897666666667, lon: 11.3214361111111, distanceThreshold: 15 },
    { id: 'Arco133', lat: 44.4897611111111, lon: 11.3214111111111, distanceThreshold: 15 },
    { id: 'Arco136b', lat: 44.4897472222222, lon: 11.3212333333333, distanceThreshold: 15 },
    { id: 'Arco142a', lat: 44.4897111111111, lon: 11.3209055555556, distanceThreshold: 15 },
    { id: 'Arco143c', lat: 44.4896972222222, lon: 11.3208805555556, distanceThreshold: 15 },
    { id: 'Arco148', lat: 44.4895333333333, lon: 11.3204222222222, distanceThreshold: 15 },
    { id: 'Arco163', lat: 44.48935, lon: 11.3195666666667, distanceThreshold: 15 },
    { id: 'Arco171', lat: 44.4892611111111, lon: 11.3191833333333, distanceThreshold: 15 },
    { id: 'Arco180', lat: 44.489075, lon: 11.3185305555556, distanceThreshold: 15 },
    { id: 'Arco182', lat: 44.4890333333333, lon: 11.3184555555556, distanceThreshold: 15 },
    { id: 'Arco183', lat: 44.4890416666667, lon: 11.3184583333333, distanceThreshold: 15 },
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
    { id: 'Arco218', lat: 44.4888694444444, lon: 11.3161555555556, distanceThreshold: 15 },
    { id: 'Arco249a', lat: 44.489775, lon: 11.3150916666667, distanceThreshold: 15 },
    { id: 'Arco256', lat: 44.4899638888889, lon: 11.3143611111111, distanceThreshold: 15 },
    { id: 'Arco258', lat: 44.4900722222222, lon: 11.3141138888889, distanceThreshold: 15 },
    { id: 'Arco283', lat: 44.4900694444444, lon: 11.3127166666667, distanceThreshold: 15 },
    { id: 'Arco52', lat: 44.4904611111111, lon: 11.325975, distanceThreshold: 15 },
    { id: 'Arco53', lat: 44.4895444444444, lon: 11.3256527777778, distanceThreshold: 15 },
    { id: 'Chiesa_Santa_Caterina_di_Saragozza', lat: 44.4900444444444, lon: 11.3328472222222, distanceThreshold: 15 },
    { id: 'Lapide', lat: 44.4899916666667, lon: 11.311125, distanceThreshold: 15 },
    { id: 'Lapide1', lat: 44.4898805555556, lon: 11.3145527777778, distanceThreshold: 15 },
    { id: 'Lapide_Saragozza_inizio', lat: 44.4905694444444, lon: 11.3291861111111, distanceThreshold: 15 },
    { id: 'Numero_civico_vecchio_di_Saragozza', lat: 44.4900055555556, lon: 11.3328444444444, distanceThreshold: 15 },
    { id: 'Portone_Sontuoso', lat: 44.4906555555556, lon: 11.3292888888889, distanceThreshold: 15 },
    { id: 'Rione_Falansterio', lat: 44.4903944444444, lon: 11.3310305555556, distanceThreshold: 15 },
    { id: 'lapide', lat: 44.4902444444444, lon: 11.3111833333333, distanceThreshold: 15 },
];

// ===========================================
// UTILITY
// ===========================================
const getCurrentPageId = () => {
    const urlPath = window.location.pathname;
    let fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
    if (!fileName || fileName.startsWith('index')) return 'home';
    return fileName.split('-')[0].replace('.html', '').toLowerCase();
};

const updateText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ''; };
const updateHTML = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val || ''; };
const isFilePath = (val) => typeof val === 'string' && (val.endsWith('.html') || val.endsWith('.txt'));

async function fetchFileContent(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) return `[Errore caricamento: ${path}]`;
        return await res.text();
    } catch (e) { return `[Contenuto non disponibile]`; }
}

// ===========================================
// LOGICA FIREBASE
// ===========================================
function setupDrinListener() {
    if (!db) return;
    const drinDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'commands', 'drin');
    onSnapshot(drinDocRef, (snap) => {
        if (snap.exists()) {
            const audio = new Audio('Assets/Audio/drin.mp3');
            audio.play().catch(() => { });
        }
    });
}

async function logAccess(pageId, lang) {
    if (!db || !currentUserId) return;
    try {
        const logsCol = collection(db, 'artifacts', appId, 'public', 'data', 'access_logs');
        await addDoc(logsCol, { pageId, lang, userId: currentUserId, timestamp: serverTimestamp() });
    } catch (e) { console.error("Log error:", e); }
}

// ===========================================
// CARICAMENTO CONTENUTI
// ===========================================
async function loadContent(lang) {
    document.documentElement.lang = lang;
    const pageId = getCurrentPageId();

    try {
        const response = await fetch(`data/translations/${lang}/texts.json`);
        const data = await response.json();
        const pageData = data[pageId];

        if (!pageData) {
            updateText('pageTitle', "Contenuto non trovato");
            document.body.classList.add('content-loaded');
            return;
        }

        updateText('pageTitle', pageData.pageTitle);
        updateHTML('headerTitle', pageData.pageTitle);

        const headImg = document.getElementById('headImage');
        if (headImg && pageData.headImage) {
            headImg.src = `public/images/${pageData.headImage}`;
            headImg.style.display = 'block';
        }

        const textKeys = ['mainText', 'mainText1', 'mainText2', 'mainText3', 'mainText4', 'mainText5'];
        for (const key of textKeys) {
            let content = pageData[key];
            if (isFilePath(content)) {
                content = await fetchFileContent(`text_files/${content}`);
            }
            updateHTML(key, content);
        }

        for (let i = 1; i <= 5; i++) {
            const imgEl = document.getElementById(`pageImage${i}`);
            const src = pageData[`imageSource${i}`];
            if (imgEl) {
                if (src) {
                    imgEl.src = `Assets/images/${src}`;
                    imgEl.style.display = 'block';
                } else {
                    imgEl.style.display = 'none';
                }
            }
        }
        // AGGIORNAMENTO INFORMAZIONI SULLA FONTE E DATA
        if (pageData.sourceText) {
            updateHTML('infoSource', `Fonte: ${pageData.sourceText}`);
        }
        if (pageData.creationDate) {
            updateHTML('infoCreatedDate', `Data Creazione: ${pageData.creationDate}`);
        }
        if (pageData.lastUpdate) {
            updateHTML('infoUpdatedDate', `Ultimo Aggiornamento: ${pageData.lastUpdate}`);
        }

        const audioPlayer = document.getElementById('audioPlayer');
        const playBtn = document.getElementById('playAudio');
        if (audioPlayer && playBtn && pageData.audioSource) {
            audioPlayer.src = `Assets/Audio/${pageData.audioSource}`;
            playBtn.textContent = pageData.playAudioButton || "Play";
            playBtn.dataset.playText = pageData.playAudioButton;
            playBtn.dataset.pauseText = pageData.pauseAudioButton;
            playBtn.style.display = 'block';
        }

        updateNavigation(data.nav, lang);
        startGeolocation(data);
        document.body.classList.add('content-loaded');
        if (isAuthReady) logAccess(pageId, lang);

    } catch (e) {
        console.error("Errore caricamento:", e);
        document.body.classList.add('content-loaded');
    }
}

function updateNavigation(navData, lang) {
    if (!navData) return;
    const langSuffix = lang === 'it' ? '-it' : `-${lang}`;

    const navLinksData = [
                { id: 'navarco119', key: 'navARCO119', base: 'arco119' },
                { id: 'navarco126b', key: 'navARCO126B', base: 'arco126b' },
                { id: 'navarco132a', key: 'navARCO132A', base: 'arco132a' },
                { id: 'navarco133a', key: 'navARCO133A', base: 'arco133a' },
                { id: 'navarco136b', key: 'navARCO136B', base: 'arco136b' },
                { id: 'navarco142a', key: 'navARCO142A', base: 'arco142a' },
                { id: 'navarco143c', key: 'navARCO143C', base: 'arco143c' },
                { id: 'navarco148', key: 'navARCO148', base: 'arco148' },
                { id: 'navarco163', key: 'navARCO163', base: 'arco163' },
                { id: 'navarco171b', key: 'navARCO171B', base: 'arco171b' },
                { id: 'navarco180', key: 'navARCO180', base: 'arco180' },
                { id: 'navarco182', key: 'navARCO182', base: 'arco182' },
                { id: 'navarco183', key: 'navARCO183', base: 'arco183' },
                { id: 'navarco186b', key: 'navARCO186B', base: 'arco186b' },
                { id: 'navarco188b', key: 'navARCO188B', base: 'arco188b' },
                { id: 'navarco190', key: 'navARCO190', base: 'arco190' },
                { id: 'navarco192c', key: 'navARCO192C', base: 'arco192c' },
                { id: 'navarco201a', key: 'navARCO201A', base: 'arco201a' },
                { id: 'navarco202a', key: 'navARCO202A', base: 'arco202a' },
                { id: 'navarco203b', key: 'navARCO203B', base: 'arco203b' },
                { id: 'navarco208b', key: 'navARCO208B', base: 'arco208b' },
                { id: 'navarco211b', key: 'navARCO211B', base: 'arco211b' },
                { id: 'navarco218b', key: 'navARCO218B', base: 'arco218b' },
                { id: 'navarco249a', key: 'navARCO249A', base: 'arco249a' },
                { id: 'navarco252a', key: 'navARCO252A', base: 'arco252a' },
                { id: 'navarco256', key: 'navARCO256', base: 'arco256' },
                { id: 'navarco282a', key: 'navARCO282A', base: 'arco282a' },
                { id: 'navarco283a', key: 'navARCO283A', base: 'arco283a' },
                { id: 'navarco306b', key: 'navARCO306B', base: 'arco306b' },
                { id: 'navarco307a', key: 'navARCO307A', base: 'arco307a' },
                { id: 'navarco53c', key: 'navARCO53C', base: 'arco53c' },
                { id: 'navHome', key: 'navHome', base: 'index' },
                { id: 'navlapide1', key: 'navLAPIDE1', base: 'lapide1' },
                { id: 'navlapide2', key: 'navLAPIDE2', base: 'lapide2' },
                { id: 'navpsontuoso', key: 'navPSONTUOSO', base: 'psontuoso' },
                { id: 'navarco101', key: 'navarco101', base: 'arco101' }
];

    navLinksData.forEach(l => {
        const el = document.getElementById(l.id);
        if (el) {
            el.href = `${l.base}${langSuffix}.html`;
            el.textContent = navData[l.key] || l.id;
        }
    });
}

// ===========================================
// GEOLOCALIZZAZIONE
// ===========================================
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

function startGeolocation(allData) {
    if (!navigator.geolocation) return;

    const geoOptions = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

    navigator.geolocation.watchPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        if (nearbyPoiButton) {
            nearbyPoiButton.style.display = 'block';
        }

        let menuHtml = '<ul class="poi-links">';
        let found = false;

        POIS_LOCATIONS.forEach(poi => {
            const dist = calculateDistance(lat, lon, poi.lat, poi.lon);
            if (dist <= poi.distanceThreshold) {
                const title = (allData[poi.id] && allData[poi.id].pageTitle) ? allData[poi.id].pageTitle : poi.id;
                const suffix = currentLang === 'it' ? '-it' : `-${currentLang}`;
                menuHtml += `<li><a href="${poi.id}${suffix}.html">${title} (${dist.toFixed(0)}m)</a></li>`;
                found = true;
            }
        });

        menuHtml += '</ul>';
        if (!found) {
            let noPoiMessage;
            switch (currentLang) {
                case 'es': noPoiMessage = `No se encontraron puntos de interés dentro 50 m. <br><br>   Pulse de nuevo el botón verde para cerrar el menú.`; break;
                case 'en': noPoiMessage = `No Points of Interest found within 50 m. <br><br>   Press the green button again to close the menu.`; break;
                case 'fr': noPoiMessage = `Aucun point d'interet trouve dans les environs 50 m. <br><br>  Appuyez à nouveau sur le bouton vert pour fermer le menu.`; break;
                case 'it':
                default: noPoiMessage = `Nessun Punto di Interesse trovato entro 50 m.<br><br> Premere di nuovo il bottone verde per chiudere la lista.`; break;
            }
        // Uso colore rosso per i test
        menuHtml = `<div style="color:red; padding: 20px; text-align: center; font-size: 1em;">${noPoiMessage}</div>`;

//      menuHtml = '<div style="padding:20px;text-align:center;">Nessun punto vicino</div>'

        };
        if (nearbyMenuPlaceholder) nearbyMenuPlaceholder.innerHTML = menuHtml;

    }, (err) => {
        console.warn("Geolocation error:", err.message);
    }, geoOptions);
}

// ===========================================
// INIZIALIZZAZIONE EVENTI (CON FIX CHIUSURA MENU)
// ===========================================
function initEvents() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('navBarMain');

    // Funzioni helper per la chiusura
    const closeMainMenu = () => {
        if (toggle && nav) {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    };

    const closePoiMenu = () => {
        if (nearbyMenuPlaceholder) {
            nearbyMenuPlaceholder.classList.remove('poi-active');
            document.body.classList.remove('menu-open');
        }
    };

    if (toggle && nav) {
        toggle.onclick = (e) => {
            e.stopPropagation();
            // Se apro il menu principale, chiudo quello dei POI
            closePoiMenu();

            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        };
    }

    if (nearbyPoiButton && nearbyMenuPlaceholder) {
        nearbyPoiButton.onclick = (e) => {
            e.stopPropagation();
            // Se apro il menu dei POI, chiudo quello principale
            closeMainMenu();

            nearbyMenuPlaceholder.classList.toggle('poi-active');
            document.body.classList.toggle('menu-open');
        };
    }

    // Audio
    const playBtn = document.getElementById('playAudio');
    const player = document.getElementById('audioPlayer');
    if (playBtn && player) {
        playBtn.onclick = () => {
            if (player.paused) {
                player.play();
                playBtn.textContent = playBtn.dataset.pauseText;
                playBtn.classList.replace('play-style', 'pause-style');
            } else {
                player.pause();
                playBtn.textContent = playBtn.dataset.playText;
                playBtn.classList.replace('pause-style', 'play-style');
            }
        };
        player.onended = () => { playBtn.textContent = playBtn.dataset.playText; };
    }


// Lingue (Supporta button, img e tag 'a' anche nidificati)
    document.querySelectorAll('.language-selector button, .language-selector img, .language-selector a').forEach(el => {
        el.onclick = (e) => {
            // Cerca data-lang sull'elemento cliccato o sul genitore più vicino
            // (Fondamentale se clicchi sull'<img> dentro un <a>)
            const target = e.target.closest('[data-lang]');
            const lang = target ? target.dataset.lang : null;
            
            if (!lang) return;
            
            // Blocca il link HTML per gestire il cambio via JS
            e.preventDefault();
            e.stopPropagation(); 
            
            console.log("Cambio lingua forzato a:", lang);
            
            localStorage.setItem(LAST_LANG_KEY, lang);
            const pageId = getCurrentPageId();
            const base = (pageId === 'home' || pageId === 'index') ? 'index' : pageId;
            
            // Reindirizzamento esplicito
            window.location.href = `${base}-${lang}.html`;
        };
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem(LAST_LANG_KEY);
    const urlLang = location.pathname.match(/-([a-z]{2})\.html/);
    currentLang = (urlLang && urlLang[1]) || savedLang || 'it';

    nearbyPoiButton = document.getElementById('nearbyPoiButton');
    nearbyMenuPlaceholder = document.getElementById('nearbyMenuPlaceholder');

    initEvents();
    loadContent(currentLang);

    if (firebaseConfig.apiKey) {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                currentUserId = user.uid;
                isAuthReady = true;
                setupDrinListener();
                logAccess(getCurrentPageId(), currentLang);
            } else {
                signInAnonymously(auth);
            }
        });
    }
});