import PostList from "@/components/posts";
import PostProvider from "@/providers/post";

export async function getServerSideProps() {
    const posts = await PostProvider.getAll();

    return {
        props: { posts },
    };
}

export default function Home({ posts }: { posts: any[] }) {
    return (
        <div className="bg-gray-50 font-sans items-center justify-items-center min-h-screen">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <PostList posts_provider={posts}/>
            </main>
        </div>
    );
}