import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";
import formidable, { File, Files, Fields } from "formidable";

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

function parseForm(req: NextApiRequest, uploadDir: string): Promise<{ fields: Fields; files: Files }> {
    return new Promise((resolve, reject) => {
        const form = formidable({
            uploadDir: uploadDir,
            keepExtensions: true,
            filename: (name, ext) => {
                return `${name}-${Date.now()}${ext}`;
            },
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }
            resolve({ fields, files });
        });
    });
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ message: "Method not allowed" });
    }

    const uploadDir = path.join(process.cwd(), "/public/uploads");

    try {
        await fs.access(uploadDir);
    } catch (error) {
        await fs.mkdir(uploadDir, { recursive: true });
    }

    try {
        const { files } = await parseForm(req, uploadDir);
        const imageFile = files.myImage?.[0] as File | undefined;

        if (!imageFile) {
            return res.status(400).json({ message: "Nenhum arquivo foi enviado." });
        }

        const fileName = imageFile.newFilename;
        const imageUrl = `/uploads/${fileName}`;
        return res.status(200).json({ message: "Upload bem-sucedido!", imageUrl });

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Erro interno do servidor.";
        console.error(e);
        return res.status(500).json({ message: "Erro ao processar o upload.", error: errorMessage });
    }
};

export default handler;