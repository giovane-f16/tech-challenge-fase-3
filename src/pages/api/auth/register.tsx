import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, usersCollection } from "@/providers/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Método não permitido." });

    try {
        const { nome, email, password, confirmPassword } = req.body;

        if (!nome || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "As senhas não coincidem." });
        }

        await connectToDatabase();
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Usuário já existente." });

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({
            nome,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
}
