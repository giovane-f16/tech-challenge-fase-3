# Technical Details: iPhone Video Autoplay Fix

## Understanding iOS Autoplay Restrictions

### Why Does iOS Require 'muted' for Autoplay?

Apple introduced autoplay restrictions in iOS Safari to:
1. **Prevent unexpected data usage** - Downloading video with audio
2. **Preserve user privacy** - Prevent tracking through audio
3. **Improve user experience** - Prevent annoying auto-playing sounds
4. **Save battery life** - Audio processing uses more power

### Historical Context

- **iOS 10 (2016)**: Introduced `playsInline` attribute
- **iOS 10+**: Required `muted` for autoplay
- **Current**: These restrictions remain in all modern iOS versions

## Technical Implementation

### React/JSX Attributes vs HTML

In React/Next.js, note the attribute naming:
- HTML: `playsinline` → React: `playsInline`
- HTML: `autoplay` → React: `autoPlay`
- HTML: `muted` → React: `muted` (same)

### Why Both WebM and MP4?

```tsx
{webmSrc && <source type="video/webm" src={webmSrc} />}
<source type="video/mp4" src={mp4Src} />
```

- **WebM**: Better compression, smaller file size (~30% smaller)
- **MP4**: Universal compatibility, fallback for older devices
- Browser uses first supported format

### Video Loading Strategy

The component uses `preload="auto"`:
```tsx
preload="auto"  // Browser starts downloading immediately
```

Alternatives:
- `preload="metadata"` - Only load metadata (smaller initial load)
- `preload="none"` - Don't load until user interaction (saves bandwidth)

For autoplay videos, `"auto"` is recommended.

## Browser Behavior Differences

### iOS Safari
- Requires: `muted` + `playsInline`
- Without `muted`: Video won't play automatically
- Without `playsInline`: Video opens in fullscreen

### Chrome Mobile
- Requires: `muted`
- More lenient than iOS but follows similar policies
- May autoplay unmuted videos in some contexts (user has interacted with site)

### Desktop Browsers
- More permissive
- May autoplay without `muted` based on:
  - User's browsing history
  - Site engagement score
  - Browser settings

### Best Practice
Always include `muted` for consistent behavior across all platforms.

## Performance Considerations

### File Size Optimization

Recommended video specifications for web:
```
Resolution:  1920x1080 (1080p) or 1280x720 (720p)
Frame Rate:  24-30 fps
Bitrate:     2-5 Mbps (balance between quality and size)
Duration:    10-30 seconds (shorter is better for autoplay)
File Size:   < 10MB ideal, < 20MB maximum
Codec:       H.264 (MP4), VP9 (WebM)
```

### Compression Tips
```bash
# Example ffmpeg command for web-optimized video
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

# WebM version
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
```

### Poster Image
Always include a poster image:
- Shows while video loads
- Improves perceived performance
- Fallback if video fails to load
- Should match first frame of video

## Accessibility Considerations

### Current Implementation
```tsx
Your browser does not support the video tag.
```

### Enhanced Accessibility
Consider adding:
```tsx
<video 
    aria-label="Banner video showcasing our product"
    // ... other attributes
>
    <source type="video/webm" src={webmSrc} />
    <source type="video/mp4" src={mp4Src} />
    <track kind="captions" src="/captions.vtt" label="English" />
    Your browser does not support the video tag.
</video>
```

### Considerations
- Background videos should be purely decorative
- Important content should not rely on video
- Consider users with motion sensitivity (prefers-reduced-motion)

## Testing Strategy

### Manual Testing Checklist

1. **iOS Safari** (iPhone/iPad)
   - [ ] Video autoplays without user interaction
   - [ ] Video plays inline (not fullscreen)
   - [ ] Video loops continuously
   - [ ] No audio plays automatically
   - [ ] Poster image shows during loading

2. **Chrome Mobile** (Android/iOS)
   - [ ] Video autoplays
   - [ ] Responsive sizing works
   - [ ] Video loops

3. **Desktop Browsers** (Chrome, Firefox, Safari, Edge)
   - [ ] Video autoplays
   - [ ] Responsive at different window sizes

### Automated Testing

Example test with Jest and React Testing Library:
```tsx
import { render } from '@testing-library/react';
import BannerVideo from './banner_video';

test('renders video with required attributes', () => {
    const { container } = render(
        <BannerVideo mp4Src="/test.mp4" />
    );
    
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('muted');
    expect(video).toHaveAttribute('playsinline');
    expect(video).toHaveAttribute('loop');
});
```

## Common Issues and Solutions

### Issue: Video Doesn't Autoplay on iPhone
**Diagnosis:**
1. Check browser console for errors
2. Verify `muted` attribute is present
3. Check video file exists and is accessible
4. Verify MIME types are correct

**Solution:**
Ensure all required attributes are present:
```tsx
autoPlay muted playsInline
```

### Issue: Video Plays in Fullscreen on iOS
**Solution:**
Add `playsInline` attribute (already included in component)

### Issue: Video File Not Loading
**Check:**
1. File path is correct (relative to `public/` directory)
2. File permissions are correct
3. Server is serving video files correctly
4. MIME types are configured:
   - `.mp4` → `video/mp4`
   - `.webm` → `video/webm`

### Issue: Poor Video Quality
**Solution:**
Adjust encoding parameters:
- Increase bitrate (but watch file size)
- Use higher resolution source
- Use 2-pass encoding for better quality

### Issue: Slow Loading
**Solutions:**
1. Reduce file size (compress video)
2. Use CDN for video hosting
3. Implement lazy loading for videos below fold
4. Consider adaptive bitrate streaming for longer videos

## Security Considerations

### Content Security Policy (CSP)
If using CSP headers, ensure video sources are allowed:
```
Content-Security-Policy: media-src 'self' https://cdn.example.com;
```

### HTTPS Requirement
- Modern browsers require HTTPS for many features
- Some autoplay policies are stricter on HTTP

## Future Enhancements

### Progressive Enhancement
Consider adding controls for users who want to interact:
```tsx
<video 
    autoPlay
    muted
    playsInline
    loop
    controls={false}  // Can be made true conditionally
>
```

### Mute/Unmute Toggle
If video has audio:
```tsx
const [isMuted, setIsMuted] = useState(true);

<video muted={isMuted}>
<button onClick={() => setIsMuted(!isMuted)}>
    {isMuted ? '🔇 Unmute' : '🔊 Mute'}
</button>
```

### Intersection Observer
Load/play video only when visible:
```tsx
useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videoRef.current?.play();
            } else {
                videoRef.current?.pause();
            }
        });
    });
    
    if (videoRef.current) {
        observer.observe(videoRef.current);
    }
    
    return () => observer.disconnect();
}, []);
```

## References

- [WebKit Blog - New Video Policies for iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- [MDN - HTMLMediaElement.play()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)
- [Chrome Developers - Autoplay Policy](https://developer.chrome.com/blog/autoplay/)
- [Apple Developer - AVPlayer](https://developer.apple.com/documentation/avfoundation/avplayer)

---

**Last Updated:** October 2025  
**Component Version:** 1.0.0  
**Minimum iOS Version:** iOS 10+ (for playsInline support)
