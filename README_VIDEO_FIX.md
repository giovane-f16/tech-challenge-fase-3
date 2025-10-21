# Video Autoplay Fix for iPhone/iOS Safari

## 🎯 Problem Solved

Video elements were not autoplaying on iPhone (iOS Safari) devices. The HTML had all the standard autoplay attributes but was missing the critical `muted` attribute required by iOS.

## ✅ Solution

**Added the `muted` attribute to enable autoplay on iPhone/iOS Safari.**

iOS Safari has strict autoplay policies and will **NOT** autoplay videos unless they are muted. This is a security and user experience feature to prevent unexpected audio playback.

### The Fix

**Before (doesn't work on iPhone):**
```html
<video autoplay loop playsinline preload="auto">
  <source src="video.mp4" />
</video>
```

**After (works on iPhone):**
```html
<video autoplay loop muted playsinline preload="auto">
  <source src="video.mp4" />
</video>
```

## 📦 What's Included

### 1. BannerVideo Component
**File:** `src/components/banner_video.tsx`

A reusable React component with proper iOS autoplay support:

```tsx
import BannerVideo from "@/components/banner_video";

<BannerVideo 
    posterUrl="/assets/img/banner-poster.webp"
    webmSrc="/assets/video/video-novo.webm"
    mp4Src="/assets/video/video-novo.mp4"
/>
```

### 2. Example Page
**File:** `src/pages/banner-example.tsx`  
**URL:** `/banner-example`

Live demonstration of the component with documentation.

![Banner Example Page](https://github.com/user-attachments/assets/021e49c6-6e05-4758-b30e-81e1915549e3)

### 3. Documentation
- **SOLUTION.md** - Complete technical solution guide
- **BANNER_VIDEO_GUIDE.md** - Component usage guide
- **Asset directories** - Structured folders for video and image files

### 4. Styling
Added responsive CSS for the banner video in `src/styles/globals.css`

## 🔑 Required Attributes for iOS Autoplay

| Attribute | Required? | Purpose |
|-----------|-----------|---------|
| **`muted`** | ✅ **CRITICAL** | Without this, iOS Safari will NOT autoplay |
| **`playsInline`** | ✅ **YES** | Prevents fullscreen on iOS |
| **`autoPlay`** | ✅ **YES** | Enables autoplay |
| `loop` | ⚪ Optional | Continuous playback |
| `preload="auto"` | ⚪ Optional | Early loading |

## 📁 File Structure

```
public/
  assets/
    img/
      banner-poster.webp    (your poster image)
    video/
      video-novo.webm       (WebM format)
      video-novo.mp4        (MP4 format)

src/
  components/
    banner_video.tsx        (reusable component)
  pages/
    banner-example.tsx      (demo page)
  styles/
    globals.css            (video styling)
```

## 🚀 Usage

### Basic Usage
```tsx
import BannerVideo from "@/components/banner_video";

export default function HomePage() {
    return (
        <div>
            <BannerVideo mp4Src="/assets/video/video-novo.mp4" />
        </div>
    );
}
```

### With All Options
```tsx
<BannerVideo 
    posterUrl="/assets/img/banner-poster.webp"
    webmSrc="/assets/video/video-novo.webm"
    mp4Src="/assets/video/video-novo.mp4"
    className="banner-video"
/>
```

## 🧪 Testing

### Build Test
```bash
npm run build
```
✅ Build successful - all components compile correctly

### Browser Compatibility
- ✅ iOS Safari (iPhone/iPad) - Autoplay works with `muted`
- ✅ Chrome Mobile - Works with `muted`
- ✅ Firefox Mobile - Works with `muted`
- ✅ Desktop Browsers - Full support

## 📱 Testing on iPhone

To test on a real iPhone:
1. Deploy to a staging/production environment
2. Open the page in Safari on iPhone
3. Video should autoplay without sound
4. Verify continuous loop playback

## 💡 Important Notes

1. **Muted is Required**: iOS Safari requires the `muted` attribute for autoplay
2. **No Sound**: Videos will play without audio by default
3. **Add Audio Control**: If audio is needed, add a mute/unmute toggle button
4. **File Formats**: Provide both WebM and MP4 for browser compatibility
5. **Poster Image**: Always include a poster for better UX during loading

## 🎨 Responsive Design

The component includes responsive styling:
- Desktop: Max height 600px
- Mobile: Max height 400px
- Full width, maintains aspect ratio
- Optimized for all screen sizes

## 📚 Additional Resources

- [Apple - Inline Playback](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- [MDN - Video Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
- [Chrome - Autoplay Policy](https://developer.chrome.com/blog/autoplay/)

## ✨ Next Steps

1. Add your video files to `public/assets/video/`
2. Add your poster image to `public/assets/img/`
3. Import and use the `BannerVideo` component in your pages
4. Test on iPhone to verify autoplay works
5. Optimize video files for web (2-5 Mbps bitrate recommended)

---

**Summary:** This fix enables video autoplay on iPhone by adding the critical `muted` attribute. The solution includes a reusable component, example implementation, complete documentation, and responsive styling.
