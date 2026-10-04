let mapInstance = null;
let currentEvents = []; 

// Función simulada para traer eventos de una Base de Datos real o API (ej. Eventbrite)
async function fetchEventosReales() {
    try {
        // En un caso real harías: const response = await fetch('https://tu-backend.com/api/eventos');
        // return await response.json();
        
        // Por ahora usamos el array local 'events' del archivo events.js para que funcione el prototipo
        return events; 
    } catch (error) {
        console.error("Error cargando eventos reales", error);
        return [];
    }
}

function savePreferences(){
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let preferences = Array.from(checked).map(item => item.value);

    if(preferences.length === 0){
        alert("Seleccioná al menos un interés para continuar");
        return;
    }
    
    // Mostramos la barra de navegación lateral/inferior
    document.getElementById("main-nav").classList.add("visible");
    
    loadAndShowEvents(preferences);
    navigateTo('screen-home');
    initMap();
}

async function loadAndShowEvents(preferences) {
    const container = document.getElementById("events-container");
    container.innerHTML = "<p>Cargando eventos desde el servidor...</p>"; // Indicador de carga
    
    // Llamada a la "API"
    currentEvents = await fetchEventosReales();
    
    container.innerHTML = "";
    const filteredEvents = currentEvents.filter(event => preferences.includes(event.category));

    if(filteredEvents.length === 0){
        container.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted);">No encontramos eventos para tus intereses.</p>`;
        return;
    }

    filteredEvents.forEach(event => {
        container.innerHTML += `
            <div class="event-card">
                <div class="card-image" style="background-image: url('${event.image}')"></div>
                <div class="card-body">
                    <h4>${event.name}</h4>
                    <p><i class="ph ph-map-pin"></i> ${event.location} • ${event.date}</p>
                    <span class="price">Desde $5.000</span>
                </div>
            </div>
        `;
    });
}

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
    
    // Mapa libre de OpenStreetMap (No requiere API KEY). El filtro blanco/negro está en el CSS
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
        L.marker([event.lat, event.lng], {icon: customPin})
            .addTo(mapInstance)
            .bindPopup(`<b style="font-family: 'Poppins', sans-serif;">${event.name}</b><br>${event.location}`);
    });
}

function logout() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById("main-nav").classList.remove("visible");
    navigateTo('screen-login');
}