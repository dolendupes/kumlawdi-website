# Cartoon Kids Setup Guide

## Overview
The Quick Donate button can display cartoon versions of kids that cycle through different images. This guide explains how to add and configure cartoon images.

## Adding Cartoon Images

### Step 1: Create Cartoon Images

Create cartoon/illustrated versions of kids (you can use tools like:
- Adobe Illustrator
- Procreate
- Canva
- Or hire an illustrator)

**Image Requirements:**
- Format: PNG (with transparency) or JPG
- Size: At least 200x200px (will be displayed at ~40-48px)
- Style: Cartoon/illustrated style, friendly and approachable
- Background: Transparent or solid color (will be cropped to circle)

### Step 2: Save Images

Save your cartoon images to:
```
public/images/cartoons/
```

Example filenames:
- `kid1.png`
- `kid2.png`
- `kid3.png`
- `kid4.png`

### Step 3: Configure in Component

Open `src/components/QuickDonateButton.astro` and find the `cartoonKids` array around line 256:

```javascript
const cartoonKids = [
  'images/cartoons/kid1.png',
  'images/cartoons/kid2.png',
  'images/cartoons/kid3.png',
  // Add more as needed
];
```

Add your image paths here. Paths are relative to the `public/` directory.

## Cycling Modes

### Refresh Mode (Random on Each Page Load)

```javascript
const CYCLE_MODE = 'refresh';
```

- Shows a different random kid each time the page loads
- Simple and works immediately
- Good for variety without complexity

### Time-Based Mode (Cycles Automatically)

```javascript
const CYCLE_MODE = 'time';
const CYCLE_INTERVAL = 10000; // 10 seconds in milliseconds
```

- Cycles through kids automatically every X seconds
- Uses sessionStorage to track current kid
- Smooth fade transitions between images
- Good for keeping the button dynamic

**Adjust the interval:**
- `5000` = 5 seconds
- `10000` = 10 seconds
- `30000` = 30 seconds
- `60000` = 1 minute

## Fallback Behavior

If no cartoon images are configured (empty array), the button will:
- Show the heart icon instead
- Work normally otherwise

## Testing

1. Add cartoon images to `public/images/cartoons/`
2. Update the `cartoonKids` array in the component
3. Visit `http://localhost:4321/?quickdonate=true`
4. You should see the cartoon kid in the button
5. Test cycling by refreshing (refresh mode) or waiting (time mode)

## Tips

- **Consistent Style:** Keep all cartoon images in the same illustration style
- **Friendly Faces:** Use happy, approachable expressions
- **Variety:** Include diverse kids to represent your community
- **File Size:** Optimize images (use tools like TinyPNG) to keep load times fast
- **Testing:** Test with 2-3 images first, then add more

## Example Configuration

```javascript
const cartoonKids = [
  'images/cartoons/jahleel-cartoon.png',
  'images/cartoons/harry-cartoon.png',
  'images/cartoons/player1-cartoon.png',
  'images/cartoons/player2-cartoon.png',
];

const CYCLE_MODE = 'time'; // or 'refresh'
const CYCLE_INTERVAL = 15000; // 15 seconds
```

## Troubleshooting

**Images not showing:**
- Check file paths are correct (relative to `public/`)
- Verify images exist in the `public/images/cartoons/` directory
- Check browser console for 404 errors
- Ensure image format is supported (PNG, JPG, WebP)

**Cycling not working:**
- Verify `cartoonKids` array has multiple images
- Check `CYCLE_MODE` is set correctly
- For time mode, check browser console for errors
- Clear browser sessionStorage if testing: `sessionStorage.clear()`

**Heart icon showing instead:**
- This means no cartoon images are configured
- Add images to `cartoonKids` array
- Or leave empty to use heart icon as default

