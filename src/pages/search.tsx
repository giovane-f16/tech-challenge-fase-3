import { GetServerSideProps } from "next";
import PostProvider from "@/providers/post";

export default function SearchPage({ query, results }: any) {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">Resultados para: {query}</h1>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((post: { _id: string; titulo: string; conteudo: string; autor: string; data_criacao: string; data_atualizacao?:string, thumbnail?: string; }) => (
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
                        </div>
                    </div>
                </div>
                ))}

                {results.length === 0 && (
                    <h2 className="text-gray-500">Nenhum resultado encontrado.</h2>
                )}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = (context.query.conteudo as string) || "";

    console.log("Query: " + query);

    if (!query) {
        return {
            props: {
                query,
                results: [],
            },
        };
    }

    try {
        const results = await PostProvider.getBySearch(query);

        return {
            props: {
                query,
                results,
            },
        };
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
        return {
            props: {
                query,
                results: [],
            },
        };
    }
};
