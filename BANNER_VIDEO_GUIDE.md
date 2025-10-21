# Banner Video Component - iPhone Autoplay Fix

## Problem
Video autoplay was not working on iPhone/iOS Safari due to missing the `muted` attribute.

## Solution
The `BannerVideo` component has been created with all necessary attributes for cross-platform autoplay support, especially for iOS devices.

## Key Attributes for iOS Autoplay

### Required Attributes:
- **`muted`**: This is the critical attribute for iOS Safari autoplay. Without it, autoplay will not work on iPhone.
- **`playsInline`**: Prevents the video from automatically entering fullscreen mode on iOS.
- **`autoPlay`**: Enables autoplay functionality.
- **`loop`**: Makes the video loop continuously.

### Additional Attributes:
- **`preload="auto"`**: Hints to the browser to start downloading the video.
- **`poster`**: Shows an image while the video is loading.

## Usage

### Basic Usage
```tsx
import BannerVideo from "@/components/banner_video";

function HomePage() {
    return (
        <div>
            <BannerVideo 
                mp4Src="/assets/video/video-novo.mp4"
            />
        </div>
    );
}
```

### With All Options
```tsx
import BannerVideo from "@/components/banner_video";

function HomePage() {
    return (
        <div>
            <BannerVideo 
                posterUrl="/assets/img/banner-poster.webp"
                webmSrc="/assets/video/video-novo.webm"
                mp4Src="/assets/video/video-novo.mp4"
                className="banner-video"
            />
        </div>
    );
}
```

## File Structure
Create the following directories for video assets:
```
public/
  assets/
    img/
      banner-poster.webp    (poster image)
    video/
      video-novo.webm       (WebM format video)
      video-novo.mp4        (MP4 format video)
```

## Browser Compatibility
- ✅ iOS Safari (iPhone/iPad) - Autoplay works with `muted` attribute
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop)
- ✅ Edge

## Important Notes
1. **Muted is Required**: iOS Safari will not autoplay videos unless they are muted. This is a security/UX feature to prevent unexpected audio playback.
2. **User Experience**: Consider adding a mute/unmute button if audio is important for your video.
3. **File Formats**: Provide both WebM and MP4 formats for better browser compatibility.
4. **Poster Image**: Always provide a poster image for better UX while the video loads.

## Testing on iPhone
To test autoplay on iPhone:
1. Deploy the site or test on a real iPhone device
2. Open the page in Safari
3. The video should start playing automatically without sound
4. Verify that the video loops continuously
