
const events = [
    {
        type: "evento",
        name: "Festival del Vino",
        category: "Wine",
        location: "Luján de Cuyo",
        date: "10 de Junio",
        description: "Degustación de los mejores Malbecs de la región en bodegas boutique.",
        lat: -32.8895,
        lng: -68.8458,
        image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=800&q=80"
    },
    {
        type: "evento",
        name: "Concierto de Jazz",
        category: "Music",
        location: "Arena Maipú",
        date: "15 de Junio",
        description: "Una noche mágica con los mejores exponentes del jazz local e internacional.",
        lat: -32.9777,
        lng: -68.7805,
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80"
    },
    {
        type: "actividad",
        name: "Aventura en Aconcagua",
        category: "Nature",
        location: "Potrerillos",
        date: "20 de Junio",
        description: "Trekking guiado por los senderos más impactantes de la cordillera.",
        lat: -32.9511,
        lng: -69.2017,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    },
    {
        type: "evento",
        name: "Feria Gastronómica",
        category: "Food",
        location: "Parque Central",
        date: "25 de Junio",
        description: "Sabores tradicionales mendocinos y cocina de autor en un solo lugar.",
        lat: -32.8833,
        lng: -68.8333,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
    },
    {
        type: "evento",
        name: "Torneo de Pádel",
        category: "Sports",
        location: "Club Mendoza",
        date: "30 de Junio",
        description: "El evento deportivo más esperado del año con premios increíbles.",
        lat: -32.8908,
        lng: -68.8790,
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80"
    },
    {
        category: "Wine",
        lat: -32.8895,
        lng: -68.8458,
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
        es: {
            type: "evento",
            name: "Festival de la Vendimia 2024",
            location: "Teatro Griego Frank Romero Day",
            date: "03 de Marzo - 20:00 hs",
            description: "Disfrutá de la fiesta mayor de los mendocinos. Acto central, espectáculos artísticos en vivo y la elección de la reina nacional."
        },
        en: {
            type: "evento",
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
        image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=800&q=80",
        es: {
            type: "evento",
            name: "Sunset entre viñedos",
            location: "Luján de Cuyo, Mendoza",
            date: "15 de Marzo - 18:00 hs",
            description: "Atardecer mágico con DJ sets en vivo, la mejor gastronomía regional y copas de los varietales más destacados de la bodega."
        },
        en: {
            type: "evento",
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
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
        es: {
            type: "actividad",
            name: "Caminata al Cerro Arco",
            location: "Las Heras, El Challao",
            date: "12 de Marzo - 08:00 hs",
            description: "Trekking guiado de dificultad media. Disfrutá de vistas panorámicas increíbles de la precordillera y de la Ciudad de Mendoza al coronar la cumbre."
        },
        en: {
            type: "actividad",
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
        image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
        es: {
            type: "evento",
            name: "Ciclo de Música Clásica",
            location: "Teatro Independencia, Ciudad",
            date: "10 de Marzo - 21:00 hs",
            description: "Concierto exclusivo de la Orquesta Filarmónica de Mendoza interpretando las grandes obras de la historia de la música clásica."
        },
        en: {
            type: "evento",
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
        image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80",
        es: {
            type: "evento",
            name: "Festival de la Cerveza Artesanal",
            location: "Parque San Vicente, Godoy Cruz",
            date: "08 de Marzo - 17:00 hs",
            description: "Disfrutá de las mejores cervezas artesanales mendocinas, una variada oferta de foodtrucks y música en vivo en un ambiente único."
        },
        en: {
            type: "evento",
            name: "Craft Beer Festival",
            location: "San Vicente Park, Godoy Cruz",
            date: "March 08 - 5:00 PM",
            description: "Enjoy the best craft beers from Mendoza, a varied food truck selection, and live music in an unmatchable atmosphere."
        }
    },
    {
        type: "actividad",
        name: "Rafting por el Río Mendoza",
        category: "Nature",
        location: "Potrerillos, Mendoza",
        date: "15 de noviembre",
        description: "Descendé por los rápidos del río Mendoza en una emocionante aventura en balsa.",
        lat: -32.9569,
        lng: -69.1889,
        image: "https://images.myguide-cdn.com/argentina/companies/mendoza-12-km-river-rafting-tour-in-the-andes/large/mendoza-12-km-river-rafting-tour-in-the-andes-3127236.jpg"
    },
    {
        type: "actividad",
        name: "Kayak en el Dique Potrerillos",
        category: "Nature",
        location: "Embalse Potrerillos, Mendoza",
        date: "24 de noviembre",
        description: "Disfrutá de un paseo en kayak rodeado de montañas y paisajes cordilleranos.",
        lat: -32.96303,
        lng: -69.19662,
        image: "https://d6myp1633h7qr.cloudfront.net/products/d72a65e5-051c-4d73-b8ab-dadb1d659049_desktop.webp"
    },
    {
        type: "actividad",
        name: "Cabalgata por Potrerillos",
        category: "Nature",
        location: "Potrerillos, Mendoza",
        date: "20 de diciembre",
        description: "Recorré los paisajes de montaña mendocinos a caballo.",
        lat: -32.9530,
        lng: -69.2000,
        image: "https://d6myp1633h7qr.cloudfront.net/products/a13d02ba-8833-4608-9d1c-b34d72d8b86f_desktop.webp"
    }
];


const places = [
    {
        name: "Museo del Área Fundacional",
        category: "Museos",
        location: "Ciudad de Mendoza",
        description: "Un recorrido por los orígenes y la historia de Mendoza.",
        lat: -32.87975,
        lng: -68.82796
    },
    {
        name: "Museo del Pasado Cuyano",
        category: "Museos",
        location: "Ciudad de Mendoza",
        description: "Un espacio dedicado a la historia y cultura de la región cuyana.",
        lat: -32.89178,
        lng: -68.84717
    },
    {
        name: "Parque General San Martín",
        category: "Naturaleza",
        location: "Ciudad de Mendoza",
        description: "Un gran espacio verde con lago, rosedal y senderos.",
        lat: -32.89157,
        lng: -68.87318
    },
    {
        name: "Cerro de la Gloria",
        category: "Montaña",
        location: "Parque General San Martín",
        description: "Un mirador con el Monumento al Ejército de los Andes.",
        lat: -32.88873,
        lng: -68.89119
    },
    {
        name: "Puente del Inca",
        category: "Naturaleza",
        location: "Las Heras, Mendoza",
        description: "Una formación natural de gran valor paisajístico e histórico.",
        lat: -32.82662,
        lng: -69.91089
    },
    {
        name: "Reserva Natural Villavicencio",
        category: "Naturaleza",
        location: "Las Heras, Mendoza",
        description: "Una reserva natural en plena precordillera mendocina.",
        lat: -32.52694,
        lng: -69.01833
    },
    {
        name: "Embalse Valle Grande",
        category: "Ríos y embalses",
        location: "San Rafael, Mendoza",
        description: "Un embalse del río Atuel rodeado de montañas.",
        lat: -34.85444,
        lng: -68.54372
    }
];
