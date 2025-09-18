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
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + "...";
    };

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
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
                    Posts mais recentes
                </h1>
                <div className="space-y-12 flex flex-col">
                    <a href="/posts/edit/novo"
                        className="text-white
                            bg-blue-700
                            hover:bg-blue-800
                            focus:ring-4
                            focus:ring-blue-300
                            font-medium rounded-lg
                            text-sm px-5 py-2.5 mb-4
                            w-[50%] self-center
                            dark:bg-blue-600 dark:hover:bg-blue-700
                            focus:outline-none dark:focus:ring-blue-800">
                        Criar Novo Post
                    </a>
                    {posts_provider.map((post: { _id: string; titulo: string; conteudo: string; autor: string; data_criacao: string; data_atualizacao?:string, thumbnail?: string; }) => (
                        <article
                            key={post._id}
                            className="group rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden"
                        >
                            <div className="md:flex">
                                <div className="md:w-1/3">
                                    <div className="relative w-full h-48 md:h-full overflow-hidden">
                                        <Image
                                            src={post.thumbnail ? post.thumbnail : "/placeholder.svg" }
                                            alt={`Imagem do post ${post.titulo}`}
                                            fill
                                            className="transition-transform duration-500 ease-in-out group-hover:scale-105 object-cover object-center"
                                        />
                                    </div>
                                </div>

                                <div className="p-4 md:p-6 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between space-x-2 text-sm text-gray-500 mb-2">
                                            <time dateTime={post.data_criacao}>{post.data_criacao}
                                            {post.data_atualizacao != null && (
                                                <span className="text-xs text-gray-400 block md:inline">
                                                · Atualizado em {post.data_atualizacao}
                                                </span>
                                            )}
                                            </time>
                                            <div className="flex space-x-2">
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

                                        <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                                            <a href={`/posts/${PostProvider.slugify(post.titulo)}`}>{post.titulo}</a>
                                        </h2>

                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {truncateText(post.conteudo, 100)}
                                        </p>
                                    </div>

                                    <div className="flex items-center mt-4">
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                Autor: {post.autor}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Edit;