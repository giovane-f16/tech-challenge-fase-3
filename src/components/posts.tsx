import Image from "next/image";
import PostProvider from "@/providers/post";

const Posts = ({ posts_provider }: { posts_provider: any[] }) => {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">Posts Recentes</h1>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts_provider.map((post: { _id: string; titulo: string; conteudo: string; autor: string; data_criacao: string; data_atualizacao?:string, thumbnail?: string; }) => (
                <div className="post-card bg-white rounded-xl shadow-md overflow-hidden" data-aos="fade-up" key={post._id}>
                    <a href={`/posts/${post._id}/${PostProvider.slugify(post.titulo)}`}>
                        <img src={post.thumbnail ? post.thumbnail : "/placeholder.svg" } alt={post.titulo} title={post.titulo} className="w-full h-48 object-cover"/>
                    </a>
                    <div className="p-6 flex flex-col justify-between md:h-54">
                        <div className="flex justify-between items-start mb-2">
                            <a href={`/posts/${post._id}/${PostProvider.slugify(post.titulo)}`}>
                                <h2 className="text-xl font-semibold text-gray-800">{post.titulo}</h2>
                            </a>
                        </div>
                        <a href={`/posts/${post._id}/${PostProvider.slugify(post.titulo)}`}>
                            <p className="text-gray-600 mb-4">{PostProvider.truncateText(post.conteudo, 50)}</p>
                        </a>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Publicado em: {post.data_criacao}</span>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;