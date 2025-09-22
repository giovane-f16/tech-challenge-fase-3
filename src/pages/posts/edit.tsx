import Image from "next/image";
import PostProvider from "@/providers/post";
import DeleteButton from "@/components/delete";
import { useSession } from "next-auth/react";

export async function getServerSideProps() {
    const posts_provider = await PostProvider.getAll();
    return {
        props: { posts_provider },
    };
}

const Edit = ({ posts_provider }: { posts_provider: any[] }) => {
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
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Posts Recentes</h1>
                <a href="/posts/edit/novo" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all">
                    Criar Novo Post
                </a>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts_provider.map((post: { _id: string; titulo: string; conteudo: string; autor: string; data_criacao: string; data_atualizacao?:string, thumbnail?: string; }) => (
                <div className="post-card bg-white rounded-xl shadow-md overflow-hidden" data-aos="fade-up" key={post._id}>
                    <a href={`/posts/${PostProvider.slugify(post.titulo)}`}>
                        <img src={post.thumbnail ? post.thumbnail : "/placeholder.svg" } alt="Post Image" className="w-full h-48 object-cover"/>
                    </a>
                    <div className="p-6 flex flex-col justify-between md:h-54">
                        <div className="flex justify-between items-start mb-2">
                            <a href={`/posts/${PostProvider.slugify(post.titulo)}`}>
                                <h2 className="text-xl font-semibold text-gray-800">{post.titulo}</h2>
                            </a>
                        </div>
                        <a href={`/posts/${PostProvider.slugify(post.titulo)}`}>
                            <p className="text-gray-600 mb-4">{PostProvider.truncateText(post.conteudo, 50)}</p>
                        </a>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Publicado em: {post.data_criacao}</span>
                            <div className="flex gap-2">
                                <DeleteButton id={post._id} />
                                <a href={`/posts/edit/${post._id}`} className="
                                    inline-flex
                                    items-center
                                    px-4 py-2 border
                                    border-transparent
                                    text-sm
                                    font-medium
                                    rounded-md
                                    shadow-sm
                                    text-white
                                    bg-blue-700
                                    hover:bg-blue-800
                                    dark:bg-blue-600
                                    dark:hover:bg-blue-700
                                    dark:focus:ring-blue-800"
                                >
                                    Editar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Edit;