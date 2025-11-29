# Hero Background Videos

This directory is for hero section background videos and images.

## File Naming Convention

- **Home page**: `hero-home.webm` / `hero-home.mov` / `hero-home.jpg`
- **About page**: `hero-about.webm` / `hero-about.mov` / `hero-about.jpg`
- **Teams page**: `hero-teams.webm` / `hero-teams.mov` / `hero-teams.jpg`
- **Support page**: `hero-support.webm` / `hero-support.mov` / `hero-support.jpg`
- **Contact page**: `hero-contact.webm` / `hero-contact.mov` / `hero-contact.jpg`

## Video Requirements

### Format
- **Primary**: WebM with VP8/VP9 alpha channel (`.webm`)
- **Fallback**: MOV with alpha channel (`.mov`) for Safari/iOS
- **Alternative**: High-quality JPG/PNG images work great too, especially for mobile

### Specifications
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration**: 5-15 seconds (will loop automatically)
- **File Size**: Under 5MB per video (compress if needed)
- **Transparency**: Alpha channel required for transparent effect
- **Content**: Should be subtle and not distract from text

### Recommended Content by Page
- **Home**: Leadership teaching, coaching, mentoring moments
- **About**: Leadership team in action, community engagement
- **Teams**: Great plays, team highlights, game moments
- **Support**: Charitable events, community impact moments
- **Contact**: General foundation activities

## Video Editing Workflow

### 1. Edit Raw Footage
Use any of these tools:
- **iMovie** (Mac) - Simple, free, great for compilations
- **DaVinci Resolve** - Free, professional-grade
- **CapCut** - Free, easy highlight reels
- **Canva** - Online, simple editing

### 2. Create Compilation
- Select best moments (3-10 seconds each)
- Add transitions between clips
- Keep it dynamic but not overwhelming
- Consider adding subtle motion blur or slow-motion

### 3. Export with Transparency
**Option A: WebM with Alpha (Recommended)**
- Use DaVinci Resolve or After Effects
- Export as WebM with VP8/VP9 codec
- Enable alpha channel in export settings

**Option B: MOV with Alpha**
- Use Final Cut Pro or After Effects
- Export as QuickTime MOV
- Enable alpha channel (RGB + Alpha)

**Option C: Online Converter**
- Upload your video to a tool like CloudConvert
- Convert to WebM with alpha channel

### 4. Optimize for Web
- Compress video to reduce file size
- Tools: HandBrake, FFmpeg, or online compressors
- Target: Under 5MB for fast loading

### 5. Create Fallback Image
- Export a single frame from the video
- Or use a related high-quality photo
- Save as JPG (optimized, under 500KB)

## Mobile Considerations

Videos are automatically hidden on mobile devices (< 768px) for performance. 
Images will be used instead if provided, or the gradient background will show.

## Usage

Once videos/images are added, they'll automatically be used in the hero sections.
The component handles:
- Video autoplay, loop, and mute
- Fallback to images on mobile
- Proper opacity/overlay for text readability
- Browser compatibility (WebM + MOV fallback)

