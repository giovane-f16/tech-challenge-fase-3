import Posts from "@/providers/post";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";

const formatarData = (dataString: string) => {
    const partes = dataString.split('/');
    if (partes.length !== 3) {
        return "Formato de data inválido";
    }
    const [dia, mes, ano] = partes.map(Number);
    const dataObj = new Date(ano, mes - 1, dia);

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
            <article className="flex flex-col justify-center max-w-[1200px] mx-auto w-full p-14">
                <h1 className="text-4xl font-bold text-gray-900 mb-7 mt-4">{post.titulo}</h1>
                <div className="mb-6 relative w-full h-[700px] rounded-xl overflow-hidden">
                    <Image
                        src={post.thumbnail ? post.thumbnail : "/placeholder.svg" }
                        alt={`Thumbnail do post ${post.titulo}`}
                        fill
                        className="rounded-xl object-cover object-center"
                        priority
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
                    <p className="text-2xl">{post.conteudo}</p>
                </section>
            </article>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await Posts.getAll();
    const slugs = posts.map((post: { titulo: string }) => Posts.slugify(post.titulo));

    return {
        paths: slugs.map((slug: string) => ({ params: { slug } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const posts = await Posts.getAll();
    const slug = params?.slug as string;

    const post = posts.find(
        (p: { titulo: string }) => Posts.slugify(p.titulo) === slug
    );

    if (!post) {
        return {notFound: true};
    }

    return { props: { post } };
};

export default Post;