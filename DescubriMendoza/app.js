let mapInstance = null;
let currentEvents = []; 

// Función simulada para traer eventos de una Base de Datos real o API (ej. Eventbrite)
async function fetchEventosReales() {
    try {
        // Para evento real hariamos: const response = await fetch('https://backend');
        // return await response.json();
        
        // Por ahora usamos el array local 'events' del archivo events.js para que funcione el prototipo
        return events; 
    } catch (error) {
        console.error("Error cargando eventos reales", error);
        return [];
let currentLang = "es"; 
let activePreferences = [];

const translations = {
    es: {
        mainTitle: "DESCUBRÍ<br>MENDOZA",
        mainSubtitle: "Tu guía de experiencias",
        formTitle: "Contanos qué<br>te interesa",
        formSubtitle: "Seleccioná tus preferencias para recomendarte mejores experiencias.",
        labelUsername: "Nombre de usuario",
        interestsTitle: "Intereses",
        wine: "Vino", music: "Música", food: "Gastronomía", nature: "Aire Libre", sports: "Deportes",
        btnSave: "Guardar y continuar",
        greeting: "¡Hola",
        homeTitle: "Recomendaciones para vos",
        mapTitle: "Mapa de Experiencias",
        navStart: "Inicio", navMap: "Mapa", navLogout: "Salir",
        alertName: "Por favor, ingresá tu nombre",
        alertPref: "Seleccioná al menos un interés para continuar",
        emptyState: "No encontramos eventos que coincidan con tus intereses actuales.",
        lblLocation: "Ubicación:", lblDate: "Fecha:"
    },
    en: {
        mainTitle: "DISCOVER<br>MENDOZA",
        mainSubtitle: "Your experiences guide",
        formTitle: "Tell us what<br>interests you",
        formSubtitle: "Select your preferences to recommend you better experiences.",
        labelUsername: "Username",
        interestsTitle: "Interests",
        wine: "Wine", music: "Music", food: "Gastronomy", nature: "Outdoors", sports: "Sports",
        btnSave: "Save and continue",
        greeting: "Hello",
        homeTitle: "Recommendations for you",
        mapTitle: "Experiences Map",
        navStart: "Home", navMap: "Map", navLogout: "Logout",
        alertName: "Please enter your name",
        alertPref: "Select at least one interest to continue",
        emptyState: "No events found matching your current interests.",
        lblLocation: "Location:", lblDate: "Date:"
    }
};

function changeLanguage(lang) {
    currentLang = lang;
    
    document.getElementById("txt-main-title").innerHTML = translations[lang].mainTitle;
    document.getElementById("txt-main-subtitle").innerText = translations[lang].mainSubtitle;
    document.getElementById("txt-form-title").innerHTML = translations[lang].formTitle;
    document.getElementById("txt-form-subtitle").innerText = translations[lang].formSubtitle;
    document.getElementById("txt-label-username").innerText = translations[lang].labelUsername;
    document.getElementById("txt-interests-title").innerText = translations[lang].interestsTitle;
    document.getElementById("lbl-wine").innerText = translations[lang].wine;
    document.getElementById("lbl-music").innerText = translations[lang].music;
    document.getElementById("lbl-food").innerText = translations[lang].food;
    document.getElementById("lbl-nature").innerText = translations[lang].nature;
    document.getElementById("lbl-sports").innerText = translations[lang].sports;
    document.getElementById("btn-save").innerText = translations[lang].btnSave;
    document.getElementById("txt-greeting").innerText = translations[lang].greeting;
    document.getElementById("txt-home-title").innerText = translations[lang].homeTitle;
    document.getElementById("txt-map-title").innerText = translations[lang].mapTitle;
    document.getElementById("nav-start").innerText = translations[lang].navStart;
    document.getElementById("nav-map").innerText = translations[lang].navMap;
    document.getElementById("nav-logout").innerText = translations[lang].navLogout;

    if (activePreferences.length > 0) {
        showRecommendedEvents(activePreferences);
        if (mapInstance) {
            mapInstance.remove();
            mapInstance = null;
            initMap();
        }
    }
}

function savePreferences(){
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
<<<<<<< HEAD
    let preferences = Array.from(checked).map(item => item.value);
=======
    activePreferences = [];

    checked.forEach(item => {
        activePreferences.push(item.value);
    });

    if(username === ""){
        alert(translations[currentLang].alertName);
        return;
    }
>>>>>>> 6359760 (deploy en netlify imagenes de fondo y eventos, revisar, falla en imagenes a pesar de actualizar el deploy i zippear)

    if(activePreferences.length === 0){
        alert(translations[currentLang].alertPref);
        return;
    }
<<<<<<< HEAD
    
    // Mostramos la barra de navegación lateral/inferior
    document.getElementById("main-nav").classList.add("visible");
    
    loadAndShowEvents(preferences);
    navigateTo('screen-home');
    initMap();
}

async function loadAndShowEvents(preferences) {
=======

    document.getElementById("display-name").innerText = username;
    showRecommendedEvents(activePreferences);

    document.getElementById("bottom-nav").classList.add("visible");
    navigateTo('screen-home', document.querySelector('.nav-item'));

    setTimeout(() => {
        initMap();
    }, 400);
}

function navigateTo(screenId, element) {
    document.querySelectorAll('.app-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    document.getElementById(screenId).classList.add('active');

    if (element) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        element.classList.add('active');
    }

    if(screenId === 'screen-map' && mapInstance) {
        setTimeout(() => {
            mapInstance.invalidateSize();
        }, 300);
    }
}

function showRecommendedEvents(preferences){
>>>>>>> 6359760 (deploy en netlify imagenes de fondo y eventos, revisar, falla en imagenes a pesar de actualizar el deploy i zippear)
    const container = document.getElementById("events-container");
    container.innerHTML = "<p>Cargando eventos desde el servidor...</p>"; // Indicador de carga
    
    // Llamada a la "API"
    currentEvents = await fetchEventosReales();
    
    container.innerHTML = "";
    const filteredEvents = currentEvents.filter(event => preferences.includes(event.category));

    if(filteredEvents.length === 0){
<<<<<<< HEAD
        container.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted);">No encontramos eventos para tus intereses.</p>`;
=======
        container.innerHTML = `
            <div class="empty-state">
                <p>${translations[currentLang].emptyState}</p>
            </div>
        `;
>>>>>>> 6359760 (deploy en netlify imagenes de fondo y eventos, revisar, falla en imagenes a pesar de actualizar el deploy i zippear)
        return;
    }

    filteredEvents.forEach(event => {
<<<<<<< HEAD
        container.innerHTML += `
            <div class="event-card">
                <div class="card-image" style="background-image: url('${event.image}')"></div>
                <div class="card-body">
                    <h4>${event.name}</h4>
                    <p><i class="ph ph-map-pin"></i> ${event.location} • ${event.date}</p>
                    <span class="price">Desde $5.000</span>
=======
        let imageUrl = event.image; 
        let data = event[currentLang]; 

        container.innerHTML += `
            <div class="event-card">
                <div class="card-image" style="background-image: url('${imageUrl}') !important;"></div>
                <div class="card-body">
                    <h3>${data.name}</h3>
                    <div class="meta-info">
                        <p class="meta-date">📅 ${data.date}</p>
                        <p class="meta-location">📍 ${data.location}</p>
                    </div>
                    <p class="description">${data.description}</p>
>>>>>>> 6359760 (deploy en netlify imagenes de fondo y eventos, revisar, falla en imagenes a pesar de actualizar el deploy i zippear)
                </div>
            </div>
        `;
    });
}

<<<<<<< HEAD
function navigateTo(screenId, element) {
    document.querySelectorAll('.app-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    if (screenId === 'screen-map' && mapInstance) {
        setTimeout(() => { mapInstance.invalidateSize(); }, 200); 
    }

    if (element && element.classList.contains('nav-item')) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            let icon = item.querySelector('i');
            icon.classList.remove('ph-fill');
            icon.classList.add('ph');
        });
        element.classList.add('active');
        let activeIcon = element.querySelector('i');
        activeIcon.classList.remove('ph');
        activeIcon.classList.add('ph-fill');
    }
}

function initMap(){
    if (mapInstance) return;
    mapInstance = L.map('map', { zoomControl: false }).setView([-32.8895, -68.8458], 11);
    
    // Mapa libre de OpenStreetMap (No requiere API KEY).
=======
function initMap(){
    if (mapInstance) {
        mapInstance.invalidateSize();
        return;
    }

    mapInstance = L.map('map', {
        zoomControl: true
    }).setView([-32.8895, -68.8458], 11);

>>>>>>> 6359760 (deploy en netlify imagenes de fondo y eventos, revisar, falla en imagenes a pesar de actualizar el deploy i zippear)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    const customPin = L.divIcon({
        className: 'custom-pin',
        html: `<div style="background-color: var(--primary); width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    events.forEach(event => {
<<<<<<< HEAD
        L.marker([event.lat, event.lng], {icon: customPin})
            .addTo(mapInstance)
            .bindPopup(`<b style="font-family: 'Poppins', sans-serif;">${event.name}</b><br>${event.location}`);
=======
        let data = event[currentLang];
        L.marker([event.lat, event.lng])
        .addTo(mapInstance)
        .bindPopup(`
            <div class="map-popup">
                <h4>${data.name}</h4>
                <p><strong>${translations[currentLang].lblLocation}</strong> ${data.location}</p>
                <p><strong>${translations[currentLang].lblDate}</strong> ${data.date}</p>
            </div>
        `);
>>>>>>> 6359760 (deploy en netlify imagenes de fondo y eventos, revisar, falla en imagenes a pesar de actualizar el deploy i zippear)
    });
}

function logout() {
<<<<<<< HEAD
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById("main-nav").classList.remove("visible");
    navigateTo('screen-login');
=======
    document.getElementById("username").value = "";
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById("bottom-nav").classList.remove("visible");
    activePreferences = [];
    navigateTo('screen-preferences');
>>>>>>> 6359760 (deploy en netlify imagenes de fondo y eventos, revisar, falla en imagenes a pesar de actualizar el deploy i zippear)
}
