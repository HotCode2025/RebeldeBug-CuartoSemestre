const events = [
    {
        name: "Festival del Vino",
        category: "Wine",
        location: "Luján de Cuyo",
        date: "10 de Junio",
        description: "Degustación de los mejores Malbecs de la región en bodegas boutique.",
        lat: -32.8895,
        lng: -68.8458,
        image: "https://images.unsplash.com/photo-1510812431401-46f7775bc793?q=80&w=500&auto=format&fit=crop"
    },
    {
        name: "Concierto de Jazz",
        category: "Music",
        location: "Arena Maipú",
        date: "15 de Junio",
        description: "Una noche mágica con los mejores exponentes del jazz local e internacional.",
        lat: -32.9777,
        lng: -68.7805,
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop"
    },
    {
        name: "Aventura en Aconcagua",
        category: "Nature",
        location: "Potrerillos",
        date: "20 de Junio",
        description: "Trekking guiado por los senderos más impactantes de la cordillera.",
        lat: -32.9511,
        lng: -69.2017,
        image: "https://images.unsplash.com/photo-1464822759023-//q=80&w=500&auto=format&fit=crop" // Reemplazar con cordillera
    },
    {
        name: "Feria Gastronómica",
        category: "Food",
        location: "Parque Central",
        date: "25 de Junio",
        description: "Sabores tradicionales mendocinos y cocina de autor en un solo lugar.",
        lat: -32.8833,
        lng: -68.8333,
        image: "https://images.unsplash.com/photo-1504674900247-087707b88efb?q=80&w=500&auto=format&fit=crop"
    },
    {
        name: "Torneo de Pádel",
        category: "Sports",
        location: "Club Mendoza",
        date: "30 de Junio",
        description: "El evento deportivo más esperado del año con premios increíbles.",
        lat: -32.8908,
        lng: -68.8790,
        image: "https://images.unsplash.com/photo-1554068865-83d35d664171?q=80&w=500&auto=format&fit=crop"
        category: "Wine",
        lat: -32.8895,
        lng: -68.8458,
        image: "https://mendoza.gov.ar",
        es: {
            name: "Festival de la Vendimia 2024",
            location: "Teatro Griego Frank Romero Day",
            date: "03 de Marzo - 20:00 hs",
            description: "Disfrutá de la fiesta mayor de los mendocinos. Acto central, espectáculos artísticos en vivo y la elección de la reina nacional."
        },
        en: {
            name: "Harvest Festival 2024",
            location: "Frank Romero Day Amphitheater",
            date: "March 03 - 8:00 PM",
            description: "Enjoy the biggest festival in Mendoza. Main act, live artistic performances, and the crowning of the National Harvest Queen."
        }
    },
    {
        category: "Music",
        lat: -33.0333,
        lng: -68.8667,
        image: "https://unsplash.com",
        es: {
            name: "Sunset entre viñedos",
            location: "Luján de Cuyo, Mendoza",
            date: "15 de Marzo - 18:00 hs",
            description: "Atardecer mágico con DJ sets en vivo, la mejor gastronomía regional y copas de los varietales más destacados de la bodega."
        },
        en: {
            name: "Vineyard Sunset",
            location: "Luján de Cuyo, Mendoza",
            date: "March 15 - 6:00 PM",
            description: "Magical sunset with live DJ sets, the best regional gastronomy, and glasses of the winery's top varietals."
        }
    },
    {
        category: "Nature",
        lat: -32.8272,
        lng: -68.9325,
        image: "https://unsplash.com",
        es: {
            name: "Caminata al Cerro Arco",
            location: "Las Heras, El Challao",
            date: "12 de Marzo - 08:00 hs",
            description: "Trekking guiado de dificultad media. Disfrutá de vistas panorámicas increíbles de la precordillera y de la Ciudad de Mendoza al coronar la cumbre."
        },
        en: {
            name: "Cerro Arco Trekking",
            location: "Las Heras, El Challao",
            date: "March 12 - 08:00 AM",
            description: "Guided medium-difficulty trekking. Enjoy incredible panoramic views of the Andes foothills and Mendoza City from the summit."
        }
    },
    {
        category: "Music",
        lat: -32.8896,
        lng: -68.8447,
        image: "https://unsplash.com",
        es: {
            name: "Ciclo de Música Clásica",
            location: "Teatro Independencia, Ciudad",
            date: "10 de Marzo - 21:00 hs",
            description: "Concierto exclusivo de la Orquesta Filarmónica de Mendoza interpretando las grandes obras de la historia de la música clásica."
        },
        en: {
            name: "Classical Music Series",
            location: "Independencia Theater, Downtown",
            date: "March 10 - 9:00 PM",
            description: "Exclusive concert by the Mendoza Philharmonic Orchestra performing the greatest masterpieces in classical music history."
        }
    },
    {
        category: "Food",
        lat: -32.9234,
        lng: -68.8489,
        image: "https://unsplash.com",
        es: {
            name: "Festival de la Cerveza Artesanal",
            location: "Parque San Vicente, Godoy Cruz",
            date: "08 de Marzo - 17:00 hs",
            description: "Disfrutá de las mejores cervezas artesanales mendocinas, una variada oferta de foodtrucks y música en vivo en un ambiente único."
        },
        en: {
            name: "Craft Beer Festival",
            location: "San Vicente Park, Godoy Cruz",
            date: "March 08 - 5:00 PM",
            description: "Enjoy the best craft beers from Mendoza, a varied food truck selection, and live music in an unmatchable atmosphere."
        }
    }
];
