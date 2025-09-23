import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/providers/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { slug } = req.query;

        if (!slug || Array.isArray(slug)) {
            return res.status(400).json({ message: "Slug inválido" });
        }

        const [id] = slug.split("-");
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const { db } = await connectToDatabase();
        const uploadsCollection = db.collection("uploads");

        const image = await uploadsCollection.findOne({ _id: new ObjectId(id) });

        if (!image) {
            return res.status(404).json({ message: "Imagem não encontrada" });
        }

        res.setHeader("Content-Type", image.mimetype);
        res.send(image.data.buffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar a imagem" });
    }
}
