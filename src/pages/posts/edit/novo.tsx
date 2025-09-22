import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Criar = () => {
    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [autor, setAutor] = useState("");
    const [thumbnail, setThumbnail] = useState<string | File | null>(null);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!(thumbnail instanceof File)) {
            alert("Defina uma imagem de destaque.");
            return;
        }

        let thumbnailUrl = "";
        const formData = new FormData();
        formData.append("myImage", thumbnail);

        const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
            throw new Error(uploadData.message || "Erro ao fazer upload da imagem");
        }

        thumbnailUrl = uploadData.imageUrl;
        try {
            const response = await fetch(`/api/posts/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo, conteudo, autor, thumbnail: thumbnailUrl }),
            });

            if (!response.ok) throw new Error("Erro ao criar post");
            const data = await response.json();
            let id_novo_post = data._id;
            alert("Post criado com sucesso!");
            window.location.href = `/posts/edit/${id_novo_post}`;
        } catch (error) {
            console.error("Erro ao criar post:", error);
            alert("Erro ao criar post");
        }
    }

    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="flex flex-col text-xl overflow-hidden">
                <div className="flex flex-col justify-center items-center mt-48">
                    <h1>Sem permissão para acessar essa página.</h1>
                    <p>
                    Faça o{" "}
                    <a href="/login" className="text-blue-700 hover:underline">login</a> ou{" "}
                    <a href="/register" className="text-blue-700 hover:underline">cadastre-se!</a>
                    </p>
                </div>

                <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                    <Image
                        src="/not-allowed.svg"
                        alt="Imagem Not Allowed"
                        fill
                        priority
                        sizes="500px"
                        className="object-contain object-center"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6" data-aos="fade-up">
                <form id="editPostForm" className="space-y-6 h-[975px]" onSubmit={handleCreate}>
                    <div className="md:col-span-3 pt-4">
                        <div className="flex justify-between items-center">
                            <h1 className="md:text-2xl font-bold text-gray-800">Criar novo Post</h1>
                            <div className="space-x-3 flex">
                                <a href="/posts/edit" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                                    Voltar
                                </a>
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                                    Publicar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-3 mt-4 md:mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">Imagem de destaque</label>
                                {thumbnail && (
                                    <button
                                        type="button"
                                        onClick={() => setThumbnail(null)}
                                        className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
                                    >
                                        Remover imagem
                                    </button>
                                )}
                            </div>
                            <div className="mt-1 flex flex-col items-center">
                                <div
                                    onClick={() => document.getElementById("featuredImage")?.click()}
                                    className="relative w-full h-82 bg-gray-100 rounded-lg overflow-hidden mb-2 border border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                                >
                                    {thumbnail ? (
                                        <img
                                            src={thumbnail instanceof File ? URL.createObjectURL(thumbnail) : thumbnail}
                                            alt="Preview"
                                            className="absolute h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center p-4">
                                            <p className="mt-2 text-sm text-gray-600">Clique para adicionar uma imagem</p>
                                        </div>
                                    )}
                                </div>

                                <input
                                    type="file"
                                    id="featuredImage"
                                    name="myImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setThumbnail(e.target.files[0]);
                                        }
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={() => document.getElementById("featuredImage")?.click()}
                                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                                >
                                    Selecionar Imagem
                                </button>
                            </div>
                        </div>

                        <div className="md:col-span-full">
                            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-4">Título</label>
                            <input type="text" id="titulo" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500" placeholder="Digite o título do post" required/>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="autor" className="block text-sm font-medium text-gray-700 mb-4">Autor</label>
                            <input type="text" id="autor" name="autor" value={autor} onChange={(e) => setAutor(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500" placeholder="Digite o autor do post" required/>
                        </div>

                        <div className="md:col-span-full">
                            <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-4">Conteúdo</label>
                            <textarea id="conteudo" name="conteudo" value={conteudo} onChange={(e) => setConteudo(e.target.value)} className="w-full h-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500" placeholder="Digite o conteúdo do post" required/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Criar;