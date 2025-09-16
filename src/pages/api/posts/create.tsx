import type { NextApiRequest, NextApiResponse } from "next";
import PostProvider from "@/providers/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { titulo, conteudo, autor, thumbnail } = req.body;
        const create = await PostProvider.create(titulo, conteudo, autor, thumbnail);

        return res.status(200).json(create);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar o post" });
    }
}
