# iPhone Video Autoplay Fix - Complete Solution

## The Problem

You had a video element in your Angular/React component that was not autoplaying on iPhone (iOS Safari). The HTML looked like this:

```html
<video autoplay loop playsinline preload="auto" class="banner-video" 
       poster="assets/img/banner-poster.webp">
    <source type="video/webm" src="assets/video/video-novo.webm">
    <source type="video/mp4" src="assets/video/video-novo.mp4">
</video>
```

## The Root Cause

**iOS Safari has strict autoplay policies.** Videos will NOT autoplay unless they are **muted**. This is a security and user experience feature to prevent websites from unexpectedly playing audio.

## The Solution

### ✅ Add the `muted` attribute

The critical fix is adding `muted` to your video element:

```html
<video autoplay loop muted playsinline preload="auto" class="banner-video" 
       poster="assets/img/banner-poster.webp">
    <source type="video/webm" src="assets/video/video-novo.webm">
    <source type="video/mp4" src="assets/video/video-novo.mp4">
</video>
```

### React/Next.js Implementation

For this Next.js project, I've created a reusable `BannerVideo` component:

```tsx
<BannerVideo 
    posterUrl="/assets/img/banner-poster.webp"
    webmSrc="/assets/video/video-novo.webm"
    mp4Src="/assets/video/video-novo.mp4"
/>
```

## Required Attributes for iOS Autoplay

| Attribute | Required? | Purpose |
|-----------|-----------|---------|
| `muted` | ✅ **YES** | Without this, iOS Safari will NOT autoplay the video |
| `playsInline` | ✅ **YES** | Prevents video from automatically going fullscreen on iOS |
| `autoPlay` | ✅ **YES** | Enables autoplay functionality |
| `loop` | ⚪ Optional | Makes the video loop continuously |
| `preload="auto"` | ⚪ Optional | Hints to browser to start loading early |
| `poster` | ⚪ Optional | Shows an image while loading |

## Implementation Files

### 1. Component File
- **Location**: `src/components/banner_video.tsx`
- **Purpose**: Reusable React component with proper iOS autoplay support

### 2. Example Usage
- **Location**: `src/pages/banner-example.tsx`
- **URL**: `/banner-example`
- **Purpose**: Demonstrates how to use the component

### 3. Styles
- **Location**: `src/styles/globals.css`
- **Purpose**: Responsive styling for the video banner

### 4. Assets
Create these directories and add your files:
```
public/
  assets/
    img/
      banner-poster.webp    (your poster image)
    video/
      video-novo.webm       (your WebM video)
      video-novo.mp4        (your MP4 video)
```

## Testing on iPhone

### Local Testing
1. The dev server is running at `http://localhost:3001`
2. To test on iPhone, you need to:
   - Use a service like ngrok to expose your local server
   - Or deploy to a staging environment
   - Or test on a real device connected to the same network

### Production Testing
1. Deploy your application
2. Open the page on an iPhone using Safari
3. The video should autoplay without sound
4. Tap the video or add a mute/unmute button if you need audio

## Browser Compatibility

| Browser | Autoplay Support | Notes |
|---------|------------------|-------|
| iOS Safari | ✅ YES (with `muted`) | Requires `muted` and `playsInline` |
| Chrome Mobile | ✅ YES (with `muted`) | Also requires `muted` |
| Firefox Mobile | ✅ YES (with `muted`) | Also requires `muted` |
| Desktop Browsers | ✅ YES | Generally more permissive |

## Common Issues and Solutions

### Issue: Video still doesn't autoplay on iPhone
**Solutions:**
1. Verify `muted` attribute is present
2. Verify `playsInline` attribute is present
3. Check that video file paths are correct
4. Ensure video files are properly encoded
5. Check iOS version (older versions may have different policies)

### Issue: I need audio
**Solution:** Add a mute/unmute toggle button:
```tsx
const [muted, setMuted] = useState(true);

<video muted={muted} /* other attributes */>
<button onClick={() => setMuted(!muted)}>
  {muted ? 'Unmute' : 'Mute'}
</button>
```

### Issue: Video file is too large
**Solutions:**
1. Compress the video (target 2-5 Mbps bitrate)
2. Use lower resolution (720p instead of 1080p)
3. Shorten the video duration
4. Use WebM format for better compression

## Next Steps

1. **Add your video files** to `public/assets/video/`
2. **Add your poster image** to `public/assets/img/`
3. **Use the component** in your pages:
   ```tsx
   import BannerVideo from "@/components/banner_video";
   
   // In your component
   <BannerVideo />
   ```
4. **Test on iPhone** to verify autoplay works
5. **Optimize** video file sizes for better performance

## Additional Resources

- [Apple Developer - Inline Playback](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- [MDN - Video Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
- [Chrome - Autoplay Policy](https://developer.chrome.com/blog/autoplay/)

## Support

If you have any issues:
1. Check that the `muted` attribute is present
2. Verify video files are in the correct location
3. Test on a real iPhone device (simulators may behave differently)
4. Check browser console for any errors
