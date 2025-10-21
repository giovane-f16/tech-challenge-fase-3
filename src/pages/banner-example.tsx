import BannerVideo from "@/components/banner_video";

/**
 * Example page demonstrating the BannerVideo component
 * This page shows how to integrate the video banner with proper autoplay support for iPhone
 */
export default function BannerExample() {
    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center py-8">
                    Banner Video Example
                </h1>
                
                <div className="mb-8">
                    <BannerVideo 
                        posterUrl="/assets/img/banner-poster.webp"
                        webmSrc="/assets/video/video-novo.webm"
                        mp4Src="/assets/video/video-novo.mp4"
                        className="banner-video"
                    />
                </div>

                <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">iPhone Autoplay Fix Applied</h2>
                    
                    <p className="mb-4">
                        This video banner now supports autoplay on iPhone/iOS devices. 
                        The key fix was adding the <code className="bg-gray-100 px-2 py-1 rounded">muted</code> attribute.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Key Attributes Used:</h3>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                        <li><strong>muted</strong>: Required for iOS Safari autoplay</li>
                        <li><strong>playsInline</strong>: Prevents fullscreen on iOS</li>
                        <li><strong>autoPlay</strong>: Enables autoplay</li>
                        <li><strong>loop</strong>: Makes video loop continuously</li>
                        <li><strong>preload="auto"</strong>: Starts loading the video early</li>
                    </ul>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm">
                            <strong>Note:</strong> Place your video files in the <code>public/assets/video/</code> directory
                            and your poster image in the <code>public/assets/img/</code> directory.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
