import PostList from "@/components/posts";

export default function Home() {
    return (
        <div className="bg-gray-50 font-sans items-center justify-items-center min-h-screen">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <PostList />
            </main>
        </div>
    );
}
