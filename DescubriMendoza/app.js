let mapInstance = null;
let currentEvents = [];
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

function savePreferences() {
    const username = document.getElementById("username").value.trim();
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');

    activePreferences = [];
    checked.forEach(item => {
        activePreferences.push(item.value);
    });

    if (username === "") {
        alert(translations[currentLang].alertName);
        return;
    }

    if (activePreferences.length === 0) {
        alert(translations[currentLang].alertPref);
        return;
    }

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

    if (screenId === 'screen-map' && mapInstance) {
        setTimeout(() => {
            mapInstance.invalidateSize();
        }, 300);
    }
}

async function fetchEventosReales() {
    try {
        return events;
    } catch (error) {
        console.error("Error cargando eventos reales", error);
        return [];
    }
}

async function showRecommendedEvents(preferences) {
    const container = document.getElementById("events-container");
    container.innerHTML = "<p>Cargando eventos desde el servidor...</p>";

    currentEvents = await fetchEventosReales();
    container.innerHTML = "";

    // Normalizamos a minúsculas para que "Vino", "vino" y "Wine" coincidan
    const prefsLower = preferences.map(p => p.toLowerCase().trim());

    const filteredEvents = currentEvents.filter(event => {
        if (!event.category) return false;
        return prefsLower.includes(event.category.toLowerCase().trim());
    });

    if (filteredEvents.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>${translations[currentLang].emptyState}</p>
            </div>
        `;
        return;
    }

    filteredEvents.forEach(event => {
        let imageUrl = event.image;
        let data = event[currentLang] || event["es"];

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
                </div>
            </div>
        `;
    });
}

function initMap() {
    if (mapInstance) {
        mapInstance.invalidateSize();
        return;
    }

    mapInstance = L.map('map', {
        zoomControl: true
    }).setView([-32.8895, -68.8458], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    events.forEach(event => {
        let data = event[currentLang] || event["es"];
        L.marker([event.lat, event.lng])
        .addTo(mapInstance)
        .bindPopup(`
            <div class="map-popup">
                <h4>${data.name}</h4>
                <p><strong>${translations[currentLang].lblLocation}</strong> ${data.location}</p>
                <p><strong>${translations[currentLang].lblDate}</strong> ${data.date}</p>
            </div>
        `);
    });
}

function logout() {
    document.getElementById("username").value = "";
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById("bottom-nav").classList.remove("visible");
    activePreferences = [];
    navigateTo('screen-preferences');
}
