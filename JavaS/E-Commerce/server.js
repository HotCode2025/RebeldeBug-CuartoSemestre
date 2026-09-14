import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

app.post("/create_preference", async (req, res) => {
    try {
        const items = req.body.items;

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: items
            }
        });

        res.json({
            id: result.id,
            init_point: result.init_point
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al crear la preferencia"
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});


