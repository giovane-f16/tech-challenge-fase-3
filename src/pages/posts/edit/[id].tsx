import Image from "next/image";
import PostProvider from "@/providers/post";
import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: any) {
    const { id } = context.params;

    try {
        const post = await PostProvider.getById(id);

        return {
            props: { post },
        };
    } catch (error) {
        console.error("Erro ao buscar post:", error);
        return {
            notFound: true,
        };
    }
}

const Post = ({ post }: { post: any }) => {
    const [id, setId] = useState(post._id || "");
    const [titulo, setTitulo] = useState(post.titulo || "");
    const [conteudo, setConteudo] = useState(post.conteudo || "");
    const [autor, setAutor] = useState(post.autor || "");
    const [thumbnail, setThumbnail] = useState<string | File>(post.thumbnail || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        let thumbnailUrl = post.thumbnail;
        try {
            if (thumbnail instanceof File) {
                console.log("➡️ Enviando nova imagem para a API de upload...");
                const formData = new FormData();
                formData.append("myImage", thumbnail); // 'myImage' é o nome que a API de upload espera

                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await uploadResponse.json();

                if (!uploadResponse.ok) {
                    throw new Error(uploadData.message || "Erro ao fazer upload da imagem");
                }

                thumbnailUrl = uploadData.imageUrl; // Atualiza a URL com o caminho da nova imagem
                console.log("✅ Imagem enviada com sucesso:", thumbnailUrl);
            }

            console.log("➡️ Salvando dados do post...");
            const response = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo, conteudo, autor, thumbnail: thumbnailUrl }),
            });

            if (!response.ok) throw new Error("Erro ao salvar o post");

            alert("Post atualizado com sucesso!");
        } catch (err) {
            alert("Erro ao salvar o post");
            console.error(err);
        }
    };

    // Efeito para thumbnail
    useEffect(() => {
            const uploadBtn = document.getElementById("uploadImageBtn");
            const featuredImage = document.getElementById("featuredImage") as HTMLInputElement;
            const imagePreview = document.getElementById("imagePreview") as HTMLImageElement;
            const imagePlaceholder = document.getElementById("imagePlaceholder");
            const removeBtn = document.getElementById("removeImageBtn");

            if (!uploadBtn || !featuredImage || !imagePreview || !imagePlaceholder || !removeBtn) return;

            const handleUploadClick = () => featuredImage.click();

            const handleFileChange = (e: Event) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                    setThumbnail(file);
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        imagePreview.src = event.target?.result as string;
                        imagePreview.classList.remove("hidden");
                        if (imagePlaceholder) imagePlaceholder.classList.add("hidden");
                        removeBtn.classList.remove("hidden");
                    };
                    reader.readAsDataURL(file);
                }
            };

            const handleRemoveClick = () => {
                imagePreview.src = "";
                imagePreview.classList.add("hidden");
                if (imagePlaceholder) imagePlaceholder.classList.remove("hidden");
                removeBtn.classList.add("hidden");
                featuredImage.value = "";
                setThumbnail(post.thumbnail || "");
            };

            uploadBtn.addEventListener("click", handleUploadClick);
            featuredImage.addEventListener("change", handleFileChange);
            removeBtn.addEventListener("click", handleRemoveClick);

            // Cleanup
            return () => {
                uploadBtn.removeEventListener("click", handleUploadClick);
                featuredImage.removeEventListener("change", handleFileChange);
                removeBtn.removeEventListener("click", handleRemoveClick);
            };
    }, [post.thumbnail]);

    return (
        <>
        <Header />
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6" data-aos="fade-up">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Editar Post</h1>
                    <a href="/posts/edit" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                        Voltar
                    </a>
                </div>

                <form id="editPostForm" className="space-y-6 h-[950px]" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-3">
                            <div className="flex items-center justify-between">
                                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">Imagem de destaque</label>
                                <button type="button" id="removeImageBtn" className="text-sm text-red-600 hover:text-red-800 hidden cursor-pointer">Remover imagem</button>
                            </div>
                            <div className="mt-1 flex flex-col items-center">
                                <div id="imagePreviewContainer" className="relative w-full h-82 bg-gray-100 rounded-lg overflow-hidden mb-2 border border-dashed border-gray-300 flex items-center justify-center">
                                    <img id="imagePreview" src={post.thumbnail} alt="Preview" className="hidden absolute h-full w-full object-cover" />
                                    <div id="imagePlaceholder" className="text-center p-4">
                                        <p className="mt-2 text-sm text-gray-600">Clique para adicionar uma imagem</p>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setThumbnail(e.target.files[0]);
                                        }
                                    }}
                                    id="featuredImage"
                                    name="myImage"
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button type="button" id="uploadImageBtn" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                                    Selecionar Imagem
                                </button>
                            </div>
                        </div>

                        <div className="md:col-span-full">
                            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-4">Título</label>
                            <input type="text" id="titulo" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500" placeholder="Digite o título do post"/>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="autor" className="block text-sm font-medium text-gray-700 mb-4">Autor</label>
                            <input type="text" id="autor" name="autor" value={autor} onChange={(e) => setAutor(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500" placeholder="Digite o autor do post"/>
                        </div>

                        <div className="md:col-span-full">
                            <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-4">Conteúdo</label>
                            <textarea id="conteudo" name="conteudo" value={conteudo} onChange={(e) => setConteudo(e.target.value)} className="w-full h-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500" placeholder="Digite o conteúdo do post"/>
                        </div>

                        <div className="md:col-span-3 pt-4">
                            <div className="flex justify-between">
                                <button type="button" id="deleteBtn" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer">
                                    Excluir Post
                                </button>
                                <div className="space-x-3">
                                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                                        Salvar Alterações
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Post;