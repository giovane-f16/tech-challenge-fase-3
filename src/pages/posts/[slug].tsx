import Posts from "@/providers/post";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const Post = ({ post }: { post: { _id: string; titulo: string; conteudo: string; autor: string; data_criacao: string; data_atualizacao?:string, thumbnail?: string; } }) => {
    return (
        <>
        <Header />
            <article className="flex flex-col justify-center max-w-[1200px] mx-auto w-full p-14">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.titulo}</h1>
                <div className="mb-6">
                <Image
                    src={post.thumbnail ? post.thumbnail : "/placeholder.svg" }
                    alt={`Thumbnail do post ${post.titulo}`}
                    width={1200}
                    height={500}
                    className="rounded-xl object-cover"
                    priority
                />
                </div>

                <div className="text-1xl text-gray-900 mb-6">
                    <p>Por {post.autor} |
                        Publicado em{" "}
                        {new Date(post.data_criacao).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        })}
                    </p>

                    {post.data_atualizacao && (
                        <p className="mt-3">
                            Atualizado em{" "}
                            {new Date(post.data_atualizacao).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    )}
                </div>

                <section className="mt-6">
                    <p className="text-2xl">{post.conteudo}</p>
                </section>
            </article>
        <Footer />
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