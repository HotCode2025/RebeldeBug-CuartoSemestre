let mapInstance = null;

function savePreferences(){
    const username = document.getElementById("username").value.trim();
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let preferences = [];

    checked.forEach(item => {
        preferences.push(item.value);
    });

    if(username === ""){
        alert("Por favor, ingresá tu nombre");
        return;
    }

    if(preferences.length === 0){
        alert("Seleccioná al menos un interés para continuar");
        return;
    }

    // Actualizar interfaz con el usuario
    document.getElementById("display-name").innerText = username;

    // Renderizar eventos recomendados
    showRecommendedEvents(preferences);

    // Activar barra de navegación inferior y viajar al Home
    document.getElementById("bottom-nav").classList.add("visible");
    navigateTo('screen-home', document.querySelector('.nav-item'));

    // Inicializar el mapa de forma asíncrona
    initMap();
}

function navigateTo(screenId, element) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.app-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostrar la seleccionada
    document.getElementById(screenId).classList.add('active');

    // Cambiar estado activo en la botonera inferior
    if (element) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        element.classList.add('active');
    }

    // Si Leaflet ya existe y entramos al mapa, recalculamos el tamaño para evitar bugs visuales
    if(screenId === 'screen-map' && mapInstance) {
        setTimeout(() => {
            mapInstance.invalidateSize();
        }, 200);
    }
}

function showRecommendedEvents(preferences){
    const container = document.getElementById("events-container");
    container.innerHTML = "";

    const filteredEvents = events.filter(event => preferences.includes(event.category));

    if(filteredEvents.length === 0){
        container.innerHTML = `
            <div class="empty-state">
                <p>No encontramos eventos que coincidan con tus intereses actuales.</p>
            </div>
        `;
        return;
    }

    filteredEvents.forEach(event => {
        let imageUrl = event.image; 

        container.innerHTML += `
            <div class="event-card">
                <div class="card-image" style="background-image: url('${imageUrl}')">
                    <span class="badge badge-${event.category.toLowerCase()}">${translateCategory(event.category)}</span>
                </div>
                <div class="card-body">
                    <h3>${event.name}</h3>
                    <div class="meta-info">
                        <p class="meta-date">📅 ${event.date}</p>
                        <p class="meta-location">📍 ${event.location}</p>
                    </div>
                    <p class="description">${event.description}</p>
                </div>
            </div>
        `;
    });
}


function translateCategory(category) {
    const dict = { 'Wine': 'Vino', 'Music': 'Música', 'Food': 'Gastronomía', 'Nature': 'Aire Libre', 'Sports': 'Deportes' };
    return dict[category] || category;
}

function initMap(){
    if (mapInstance) return; // Evitar duplicaciones

    mapInstance = L.map('map', {
        zoomControl: false // Ocultamos botones feos por defecto para estética móvil limpia
    }).setView([-32.8895, -68.8458], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(mapInstance);

    events.forEach(event => {
        L.marker([event.lat, event.lng])
        .addTo(mapInstance)
        .bindPopup(`
            <div class="map-popup">
                <h4>${event.name}</h4>
                <p><strong>Ubicación:</strong> ${event.location}</p>
                <p><strong>Fecha:</strong> ${event.date}</p>
            </div>
        `);
    });
}

function logout() {
    // Volver al inicio y limpiar formulario
    document.getElementById("username").value = "";
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById("bottom-nav").classList.remove("visible");
    navigateTo('screen-preferences');
}
