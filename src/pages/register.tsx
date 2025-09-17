"use client";
import "@/app/globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
    const [registerNome, setRegisterNome] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!registerNome || !registerEmail || !registerPassword) {
            setErrorMessage("Preencha todos os campos.");
            return;
        }

        if (registerPassword !== confirmPassword) {
            setErrorMessage("As senhas não coincidem.");
            return;
        }

        const passWordError = validatePassword(confirmPassword);
        if (passWordError) {
            setErrorMessage(passWordError);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: registerNome,
                    email: registerEmail,
                    password: registerPassword,
                    confirmPassword,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                await signIn("credentials", {
                    redirect: true,
                    email: registerEmail,
                    password: registerPassword,
                    callbackUrl: "/posts/edit"
                });
            } else {
                setErrorMessage(data.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = (password: string) => {
        const minLength = 8;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.length < minLength) {
            return "A senha precisa ter no mínimo 8 caracteres.";
        }

        if (!specialCharRegex.test(password)) {
            return "A senha precisa conter ao menos 1 caractere especial.";
        }
        return "";
    };

    return (
        <div className="flex flex-col items-center mt-[10%]">
            <h1 className="text-2xl mb-4">Cadastrar</h1>
            <form onSubmit={handleCadastro} className="flex flex-col gap-4 w-80 h-100">
                <input
                    type="text"
                    placeholder="Nome"
                    value={registerNome}
                    onChange={e => setRegisterNome(e.target.value)}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={registerEmail}
                    onChange={e => setRegisterEmail(e.target.value)}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={registerPassword}
                    onChange={e => setRegisterPassword(e.target.value)}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="border p-2 rounded-lg"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50 hover:bg-blue-400 cursor-pointer" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
                {errorMessage && (
                    <p className="text-red-600 text-base animate-fadeIn">{errorMessage}</p>
                )}
            </form>
            <p className="mb-7">Já possui conta? Faça o seu <a href="/login" className="text-blue-700 hover:underline">login!</a></p>
        </div>
    );
}
