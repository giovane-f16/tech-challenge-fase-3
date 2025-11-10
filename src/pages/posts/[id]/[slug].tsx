import PostProvider from "@/providers/post";
import { GetServerSideProps } from "next";
import Image from "next/image";

const formatarData = (data: Date | string) => {
    const dataObj = typeof data === "string" ? new Date(data) : data;

    if (isNaN(dataObj.getTime())) {
        return "Data inválida";
    }

    return dataObj.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const Post = ({ post }: { post: { _id: string; titulo: string; conteudo: string; autor: string; data_criacao: string; data_atualizacao?:string, thumbnail?: string; } }) => {
    return (
        <>
            <article className="flex flex-col justify-center max-w-[1200px] mx-auto w-full p-7 md:p-14">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-7 mt-4">{post.titulo}</h1>
                <div className="mb-6 relative w-full h-[300px] md:h-[700px] rounded-xl overflow-hidden">
                    <Image
                        src={post.thumbnail ? post.thumbnail : "/placeholder.svg"}
                        alt={post.titulo}
                        title={post.titulo}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                    />
                </div>

                <div className="text-1xl text-gray-900 mb-6">
                    <p>Por {post.autor} |
                        Publicado em{" "}
                        {formatarData(post.data_criacao)}
                    </p>

                    {post.data_atualizacao && (
                        <p className="mt-3">
                            Atualizado em{" "}
                            {formatarData(post.data_atualizacao)}
                        </p>
                    )}
                </div>

                <section className="mt-6">
                    <p className="text-base md:text-2xl">{post.conteudo}</p>
                </section>
            </article>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;
    const post = await PostProvider.getById(id);

    if (!post) {
        return { notFound: true };
    }

    return {
        props: { post, title: `Tech Challenge - ${post.titulo}` }
    };
};

export default Post;