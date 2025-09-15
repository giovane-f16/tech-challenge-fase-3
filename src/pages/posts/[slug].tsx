import Posts from "@/providers/post";
import { GetStaticProps, GetStaticPaths } from "next";

const Post = ({ post }: { post: { _id: string; titulo: string; conteudo: string; autor: string; data_criacao: string; data_atualizacao?:string } }) => {
    return (
    <article className="prose lg:prose-xl mx-auto p-4">
      <h1>{post.titulo}</h1>
      <p>{post.conteudo}</p>
    </article>
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