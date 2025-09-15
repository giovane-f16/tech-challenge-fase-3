import type { NextApiRequest, NextApiResponse } from "next";
import PostProvider from "@/providers/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "PUT") {
        try {
            const { titulo, conteudo, autor, thumbnail } = req.body;
            const updated = await PostProvider.editById(id as string, titulo, conteudo, autor, thumbnail);

            return res.status(200).json(updated);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar post" });
        }
  }

  return res.status(405).json({ error: "Método não permitido" });
}
