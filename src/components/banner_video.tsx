/**
 * Banner Video Component
 * 
 * This component renders a video banner with autoplay support for all devices,
 * including iPhone/iOS Safari. The key attribute for iOS autoplay is 'muted'.
 * 
 * iOS/Safari autoplay requirements:
 * - muted: Required for autoplay to work
 * - playsInline: Prevents fullscreen playback on iOS
 * - autoPlay: Enables autoplay
 * - loop: Makes video loop continuously
 */

interface BannerVideoProps {
    posterUrl?: string;
    webmSrc?: string;
    mp4Src: string;
    className?: string;
}

const BannerVideo = ({ 
    posterUrl = "/assets/img/banner-poster.webp",
    webmSrc = "/assets/video/video-novo.webm",
    mp4Src = "/assets/video/video-novo.mp4",
    className = "banner-video"
}: BannerVideoProps) => {
    return (
        <video 
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={className}
            poster={posterUrl}
        >
            {webmSrc && <source type="video/webm" src={webmSrc} />}
            <source type="video/mp4" src={mp4Src} />
            Your browser does not support the video tag.
        </video>
    );
};

export default BannerVideo;
