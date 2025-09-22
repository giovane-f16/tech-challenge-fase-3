import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File, Files, Fields } from "formidable";
import fs from "fs";
import { connectToDatabase } from "@/providers/mongodb";
import { ObjectId } from "mongodb";

export const config = {
    api: {
        bodyParser: false,
    },
};

type ApiResponse = {
    message: string;
    imageUrl?: string;
    error?: string;
};

function slugifyFilename(filename: string) {
    return filename
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9.-]/g, "");
}

function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
    return new Promise((resolve, reject) => {
        const form = formidable({ keepExtensions: true });

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { files } = await parseForm(req);
        const imageFile = files.myImage?.[0] as File | undefined;

        if (!imageFile) {
            return res.status(400).json({ message: "Nenhum arquivo foi enviado." });
        }

        const fileBuffer = await fs.promises.readFile(imageFile.filepath);
        const safeName = slugifyFilename(imageFile.originalFilename || "arquivo");

        const { db } = await connectToDatabase();
        const uploadsCollection = db.collection("uploads");

        const result = await uploadsCollection.insertOne({
            filename: safeName,
            mimetype: imageFile.mimetype,
            size: imageFile.size,
            data: fileBuffer,
            createdAt: new Date(),
        });

        // 🔹 monta URL amigável
        const host = req.headers.host;
        const protocol = req.headers["x-forwarded-proto"] || "http";
        const imageUrl = `${protocol}://${host}/api/uploads/${result.insertedId.toString()}-${safeName}`;

        return res.status(200).json({
            message: "Upload salvo no MongoDB com sucesso!",
            imageUrl,
        });
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Erro interno do servidor.";
        console.error(e);
        return res.status(500).json({ message: "Erro ao processar o upload.", error: errorMessage });
    }
};

export default handler;
