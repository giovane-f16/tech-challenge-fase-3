// components/LoaderSkeleton.tsx
export default function loaderGrid({ count = 9 }: { count?: number }) {
return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse justify-between items-center mb-8 max-w-7xl mx-auto">
        {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="w-full h-40 bg-gray-200" />
            <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-6" />
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-8 bg-gray-200 rounded w-20" />
                </div>
            </div>
        </div>
        ))}
    </div>
);
}
