let mapInstance = null;
let currentEvents = [];
let currentLang = "es";
let activePreferences = [];
let markersLayer = null;
let activeMapFilter = "evento";

const translations = {
    es: {
        mainTitle: "DESCUBRÍ<br>MENDOZA",
        mainSubtitle: "Tu guía de experiencias",
        splashSubtitle: "Tu próxima aventura comienza acá",
        splashStart: "Comenzar",
        formTitle: "Contanos qué<br>te interesa",
        formSubtitle: "Seleccioná tus preferencias para recomendarte mejores experiencias.",
        labelUsername: "Nombre de usuario",
        interestsTitle: "Intereses",
        wine: "Vino",
        music: "Música",
        food: "Gastronomía",
        nature: "Aire Libre",
        sports: "Deportes",
        btnSave: "Guardar y continuar",
        greeting: "¡Hola",
        homeTitle: "Recomendaciones para vos",
        mapTitle: "Mapa de Experiencias",
        navStart: "Inicio",
        navMap: "Mapa",
        navLogout: "Salir",
        alertName: "Por favor, ingresá tu nombre",
        alertPref: "Seleccioná al menos un interés para continuar",
        emptyState: "No encontramos eventos que coincidan con tus intereses actuales.",
        lblLocation: "Ubicación:",
        lblDate: "Fecha:",
        loading: "Cargando eventos...",
        mapEvents: "Eventos",
        mapActivities: "Actividades",
        mapPlaces: "Lugares"
    },

    en: {
        mainTitle: "DISCOVER<br>MENDOZA",
        mainSubtitle: "Your guide to experiences",
        splashSubtitle: "Your next adventure starts here",
        splashStart: "Get started",
        formTitle: "Tell us what<br>interests you",
        formSubtitle: "Select your preferences to find the best experiences.",
        labelUsername: "Username",
        interestsTitle: "Interests",
        wine: "Wine",
        music: "Music",
        food: "Food",
        nature: "Outdoors",
        sports: "Sports",
        btnSave: "Save and continue",
        greeting: "Hello",
        homeTitle: "Recommendations for you",
        mapTitle: "Experiences Map",
        navStart: "Home",
        navMap: "Map",
        navLogout: "Log out",
        alertName: "Please enter your name",
        alertPref: "Select at least one interest to continue",
        emptyState: "No events found matching your current interests.",
        lblLocation: "Location:",
        lblDate: "Date:",
        loading: "Loading events...",
        mapEvents: "Events",
        mapActivities: "Activities",
        mapPlaces: "Places"
    }
};


// Traducciones de los eventos que originalmente están en español.

const eventEnglishTranslations = {
    "Festival del Vino": {
        name: "Wine Festival",
        location: "Luján de Cuyo, Mendoza",
        date: "June 10",
        description: "Discover the best wines of Mendoza and enjoy a unique wine experience."
    },

    "Concierto de Jazz": {
        name: "Jazz Concert",
        location: "Arena Maipú, Mendoza",
        date: "June 15",
        description: "Enjoy an unforgettable evening of live jazz music."
    },

    "Aventura en Aconcagua": {
        name: "Aconcagua Adventure",
        location: "Potrerillos, Mendoza",
        date: "June 20",
        description: "Explore the natural beauty of the Andes and experience an unforgettable adventure."
    },

    "Feria Gastronómica": {
        name: "Food Festival",
        location: "Parque Central, Mendoza",
        date: "June 25",
        description: "Discover local flavors and enjoy the best of Mendoza's gastronomy."
    },

    "Torneo de Pádel": {
        name: "Padel Tournament",
        location: "Club Mendoza",
        date: "June 30",
        description: "Enjoy an exciting sports competition and experience the passion for padel."
    },

    "Rafting por el Río Mendoza": {
        name: "Rafting on the Mendoza River",
        location: "Potrerillos, Mendoza",
        date: "November 15",
        description: "Enjoy an exciting rafting adventure through the rapids of the Mendoza River."
    },

    "Kayak en el Dique Potrerillos": {
        name: "Kayaking at Potrerillos Dam",
        location: "Potrerillos Dam, Mendoza",
        date: "November 24",
        description: "Explore the beautiful waters of Potrerillos Dam on a kayaking adventure."
    },

    "Cabalgata por Potrerillos": {
        name: "Horseback Riding in Potrerillos",
        location: "Potrerillos, Mendoza",
        date: "December 20",
        description: "Discover the landscapes of Potrerillos on a relaxing horseback riding experience."
    }
};


// Traducciones de los lugares del mapa.

const placeEnglishTranslations = {
    "Museo del Área Fundacional": {
        name: "Foundational Area Museum",
        location: "Mendoza City",
        description: "Discover the history of Mendoza through archaeological remains and historical exhibits."
    },

    "Museo del Pasado Cuyano": {
        name: "Museum of Cuyo's Past",
        location: "Mendoza City",
        description: "Explore the history and traditions of the Cuyo region."
    },

    "Parque General San Martín": {
        name: "General San Martín Park",
        location: "Mendoza City",
        description: "Enjoy one of Mendoza's most beautiful green spaces, with gardens, lakes and walking paths."
    },

    "Cerro de la Gloria": {
        name: "Cerro de la Gloria",
        location: "General San Martín Park, Mendoza",
        description: "Visit the historic monument dedicated to the Army of the Andes and enjoy panoramic views."
    },

    "Puente del Inca": {
        name: "Inca Bridge",
        location: "Las Heras, Mendoza",
        description: "Discover this impressive natural rock formation with colorful mineral deposits."
    },

    "Reserva Natural Villavicencio": {
        name: "Villavicencio Nature Reserve",
        location: "Las Heras, Mendoza",
        description: "Explore a protected natural area known for its mountain landscapes and wildlife."
    },

    "Embalse Valle Grande": {
        name: "Valle Grande Reservoir",
        location: "San Rafael, Mendoza",
        description: "Enjoy the beautiful turquoise waters and mountain scenery of Valle Grande."
    }
};


// Obtiene los datos del elemento según el idioma seleccionado.

function getTranslatedData(item) {
    if (currentLang === "en") {

        if (item.en) {
            return item.en;
        }

        if (eventEnglishTranslations[item.name]) {
            return eventEnglishTranslations[item.name];
        }

        if (placeEnglishTranslations[item.name]) {
            return placeEnglishTranslations[item.name];
        }
    }

    if (item.es) {
        return item.es;
    }

    return item;
}


function changeLanguage(lang) {
    currentLang = lang;

    const text = translations[lang];

    // Pantalla inicial (Splash).
    document.getElementById("txt-splash-title").innerHTML = text.mainTitle;
    document.getElementById("txt-splash-subtitle").innerText = text.splashSubtitle;
    document.getElementById("btn-splash-start").innerText = text.splashStart;

    // Actualizamos el idioma del documento.
    document.documentElement.lang = lang;

    // Pantalla de preferencias.
    document.getElementById("txt-main-title").innerHTML = text.mainTitle;
    document.getElementById("txt-main-subtitle").innerText = text.mainSubtitle;

    document.getElementById("txt-form-title").innerHTML = text.formTitle;
    document.getElementById("txt-form-subtitle").innerText = text.formSubtitle;
    document.getElementById("txt-label-username").innerText = text.labelUsername;
    document.getElementById("txt-interests-title").innerText = text.interestsTitle;

    document.getElementById("lbl-wine").innerText = text.wine;
    document.getElementById("lbl-music").innerText = text.music;
    document.getElementById("lbl-food").innerText = text.food;
    document.getElementById("lbl-nature").innerText = text.nature;
    document.getElementById("lbl-sports").innerText = text.sports;

    document.getElementById("btn-save").innerText = text.btnSave;

    // Pantalla principal.
    document.getElementById("txt-greeting").innerText = text.greeting;
    document.getElementById("txt-home-title").innerText = text.homeTitle;
    document.getElementById("txt-map-title").innerText = text.mapTitle;

    // Navegación.
    document.getElementById("nav-start").innerText = text.navStart;
    document.getElementById("nav-map").innerText = text.navMap;
    document.getElementById("nav-logout").innerText = text.navLogout;

    // Botones de los tres filtros del mapa.
    document.querySelectorAll(".map-chip").forEach(button => {
        const onclickText = button.getAttribute("onclick") || "";
        const icon = button.querySelector("i");

        let label = "";

        if (onclickText.includes("'evento'")) {
            label = text.mapEvents;
        } else if (onclickText.includes("'actividad'")) {
            label = text.mapActivities;
        } else if (onclickText.includes("'lugar'")) {
            label = text.mapPlaces;
        }

        if (label) {
            button.innerHTML = "";

            if (icon) {
                button.appendChild(icon);
            }

            button.append(" " + label);
        }
    });

    // Actualizamos las recomendaciones.
    if (activePreferences.length > 0) {
        showRecommendedEvents(activePreferences);
    }

    // Actualizamos los marcadores del mapa.
    if (mapInstance) {
        renderMapMarkers();
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
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

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

    container.innerHTML = `<p>${translations[currentLang].loading}</p>`;

    currentEvents = await fetchEventosReales();

    container.innerHTML = "";

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
        const imageUrl = event.image;
        const data = getTranslatedData(event);

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
    if (!mapInstance) {
        mapInstance = L.map('map', {
            zoomControl: true
        }).setView([-32.8895, -68.8458], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance);

        markersLayer = L.layerGroup().addTo(mapInstance);
    }

    renderMapMarkers();

    mapInstance.invalidateSize();
}


function renderMapMarkers() {
    if (!markersLayer) return;

    markersLayer.clearLayers();

    let items = [];

    if (activeMapFilter === "lugar") {
        items = places;
    } else {
        items = events.filter(event => {
            let type = event.type || event.es?.type || event.en?.type;
            return type === activeMapFilter;
        });
    }

    items.forEach(item => {
        const data = getTranslatedData(item);

        L.marker([item.lat, item.lng])
            .addTo(markersLayer)
            .bindPopup(`
                <div class="map-popup">
                    <h4>${data.name}</h4>

                    <p>
                        <strong>${translations[currentLang].lblLocation}</strong>
                        ${data.location}
                    </p>

                    ${data.date ? `
                        <p>
                            <strong>${translations[currentLang].lblDate}</strong>
                            ${data.date}
                        </p>
                    ` : ""}

                    ${data.description ? `<p>${data.description}</p>` : ""}
                </div>
            `);
    });
}


function filterMap(type, button) {
    activeMapFilter = type;

    document.querySelectorAll('.map-chip').forEach(chip => {
        chip.classList.remove('active');
    });

    button.classList.add('active');

    renderMapMarkers();
}


function logout() {
    document.getElementById("username").value = "";

    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    document.getElementById("bottom-nav").classList.remove("visible");

    activePreferences = [];

    navigateTo('screen-preferences');
}
