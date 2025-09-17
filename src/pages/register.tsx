"use client";
import "@/app/globals.css";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email: loginEmail,
            password: loginPassword,
            confirmPassword: confirmPassword,
        });

        if (res?.ok) {
            router.push("/profile");
        } else {
            alert("Credenciais inválidas");
        }
    };

    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-2xl mb-4">Cadastrar</h1>
            <form onSubmit={handleCadastro} className="flex flex-col gap-2 w-80 h-100">
                <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="border p-2 rounded-lg"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Cadastrar</button>
            </form>
            <p>Já possui conta? Faça o seu <a href="/login" className="text-blue-700 hover:underline">login!</a></p>
        </div>
    );
}
