"use client";

import "@/app/globals.css";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!loginEmail || !loginPassword) {
            setErrorMessage("Preencha todos os campos.");
            return;
        }

        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            email: loginEmail,
            password: loginPassword,
        });

        setLoading(false);

        if (res?.ok) {
            router.push("/posts/edit");
        } else {
            setErrorMessage("E-mail ou senha inválidos.");
        }
    };

    return (
        <div className="flex flex-col items-center mt-[10%]">
            <h1 className="text-2xl mb-4">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80 h-100 relative">
                <input
                    type="email"
                    placeholder="E-mail"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {errorMessage && (
                    <p className="text-red-500 text-sm animate-fadeIn">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50 transition duration-200 hover:bg-blue-400 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
            <p className="mb-7 mt-2">
                Não possui conta? Faça o seu{" "}
                <a href="/register" className="text-blue-700 hover:underline">cadastro!</a>
            </p>
        </div>
    );
}
