/**
 * Script principale (Situato nella RADICE del progetto).
 */

// ===========================================
// CONSTANTI & SETUP INIZIALE
// ===========================================

const LAST_LANG_KEY = 'porticiSanLuca_lastLang'; 
const LANGUAGES = ['it', 'en', 'fr', 'es', 'de', 'pt', 'ma']; 
let currentLang = 'it';
let audioPlayer = null;
let playButton = null;
let nearbyPoiButton = null; // NUOVO
let nearbyMenuPlaceholder = null; // NUOVO

/**
 * Ottiene l'ID della pagina corrente.
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

        // 2. AGGIORNAMENTO TESTI PRINCIPALI
        updateContent('pageTitle', pageData.pageTitle || 'Portici San Luca');
        updateContent('headerTitle', pageData.pageTitle || '');
        updateContent('mainText', pageData.mainText || '');
        updateContent('mainText1', pageData.mainText1 || '');
        // ... (resto dei mainText) ...
        
        // 3. AGGIORNAMENTO IMMAGINI (Logica come nel post precedente)

        // 4. AGGIORNAMENTO FOOTER
        updateContent('infoSource', `Fonte: ${pageData.sourceText || 'N/A'}`);
        updateContent('infoCreatedDate', `Data Creazione: ${pageData.creationDate || 'N/A'}`);
        updateContent('infoUpdatedDate', `Ultimo Aggiornamento: ${pageData.lastUpdate || 'N/A'}`);
        
        // 5. AGGIORNAMENTO NAVIGAZIONE PRINCIPALE
        const navPlaceholder = document.getElementById('navPlaceholder');
        const navContent = data.nav ? data.nav.nav_content : null; 
        if (navPlaceholder && navContent) {
            updateContent('navPlaceholder', navContent, true);
        }
        
        // 6. AGGIORNAMENTO AUDIO E BOTTONE
        if (audioPlayer && playButton) {
            if (pageData.audioSource) {
                // ... (Logica audio come prima) ...
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
        
        // 7. LOGICA E VISIBILITÀ BOTTONE POI (NUOVO)
        if (nearbyPoiButton && nearbyMenuPlaceholder) {
            // Mostra il bottone (anche se i dati POI sono mock)
            nearbyPoiButton.textContent = pageData.nearbyButtonText || 'POI Vicini';
            nearbyPoiButton.style.display = 'block'; 

            // MOCKUP del contenuto POI (simula il contenuto dinamico)
            const mockPoiContent = `
                <ul class="poi-links">
                    <li><a href="#poi1">Stazione (15m)</a></li>
                    <li><a href="#poi2">Parcheggio (18m)</a></li>
                    <li><a href="#poi4">Punto Ristoro (19m)</a></li>
                </ul>
                <div style="color:white; padding: 20px; font-size: 0.8em; border-top: 1px solid rgba(255,255,255,0.1);">
                    Dati POI simulati entro 20 metri.
                </div>
             `;
             nearbyMenuPlaceholder.innerHTML = mockPoiContent;
        }
        
        // 8. FINALIZZA
        initEventListeners(lang); 
        updateLanguageSelectorActiveState(lang); 
        localStorage.setItem(LAST_LANG_KEY, lang); 

    } catch (error) {
        console.error('Errore critico nel caricamento dei testi:', error);
    } finally {
        document.body.classList.add('content-loaded');
    }
};

// ... (toggleAudioPlayback, updateLanguageSelectorActiveState, handleLanguageChange - come prima) ...

// ===========================================
// LOGICA EVENTI (initEventListeners)
// ===========================================

function initEventListeners(currentLang) {
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.getElementById('navPlaceholder');

    // --- Logica Menu Hamburger Principale ---
    if (menuToggle && navBar && !menuToggle.dataset.listenerAttached) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navBar.classList.toggle('active');
            
            // Chiudi il menu POI se apri il menu principale
            if (nearbyPoiButton && nearbyMenuPlaceholder) {
                 nearbyPoiButton.classList.remove('active');
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
    
    // --- Logica Menu Hamburger POI (NUOVO) ---
    if (nearbyPoiButton && nearbyMenuPlaceholder && !nearbyPoiButton.dataset.listenerAttached) {
        nearbyPoiButton.addEventListener('click', () => {
            nearbyPoiButton.classList.toggle('active');
            nearbyMenuPlaceholder.classList.toggle('poi-active');
            
            // Chiudi il menu principale se apri il menu POI
            if (menuToggle && navBar) {
                 menuToggle.classList.remove('active');
                 navBar.classList.remove('active');
            }
        });
        
        nearbyMenuPlaceholder.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                nearbyPoiButton.classList.remove('active');
                nearbyMenuPlaceholder.classList.remove('poi-active');
            }
        });
        nearbyPoiButton.dataset.listenerAttached = 'true';
    }


    // --- Logica Audio ---
    // ... (Logica audio come prima) ...

    // --- Logica Selettore Lingua ---
    // ... (Logica selettore come prima) ...
}

// ===========================================
// PUNTO DI INGRESSO (DOM LOADED)
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // INIZIALIZZAZIONE GLOBALE
    audioPlayer = document.getElementById('audioPlayer');
    playButton = document.getElementById('playAudio');
    nearbyPoiButton = document.getElementById('nearbyPoiButton'); // Assegnazione NUOVA
    nearbyMenuPlaceholder = document.getElementById('nearbyMenuPlaceholder'); // Assegnazione NUOVA
    
    const urlPath = document.location.pathname;
    const langMatch = urlPath.match(/-([a-z]{2})\.html/);
    const urlLang = langMatch ? langMatch[1] : 'it'; 

    currentLang = urlLang; 
    loadContent(currentLang);
});