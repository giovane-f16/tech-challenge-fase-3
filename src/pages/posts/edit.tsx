import Image from "next/image";
import PostProvider from "@/providers/post";
import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

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

    return (
        <>
        <Header />
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
                    Posts mais recentes
                </h1>
                <div className="space-y-12 relative">
                    <a href="/posts/edit/novo" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 fixed right-[25%] z-10">Criar Novo Post</a>
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

                                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between space-x-2 text-sm text-gray-500 mb-2">
                                            <time dateTime={post.data_criacao}>{post.data_criacao}
                                            {post.data_atualizacao != null && (
                                                <span className="text-xs text-gray-400">
                                                    · Atualizado em {post.data_atualizacao}
                                                </span>
                                            )}
                                            </time>
                                            <a href={`/posts/edit/${post._id}`} className="
                                                  text-white
                                                    self-end
                                                    end-2.5
                                                    bottom-2.5
                                                  bg-blue-700
                                                  hover:bg-blue-800
                                                    font-medium rounded-lg
                                                    text-sm px-4 py-2
                                                  dark:bg-blue-600
                                                  dark:hover:bg-blue-700
                                                  dark:focus:ring-blue-800"
                                                    >
                                                Editar Post
                                            </a>
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
        <Footer />
        </>
    );
}

export default Edit;