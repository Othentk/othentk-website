# Assets Folder

This folder contains all static assets used in the React application.

## Structure

```
assets/
├── images/     # Image files (jpg, png, svg, webp, etc.)
├── icons/      # Icon files (svg, png, ico, etc.)
└── fonts/      # Font files (woff, woff2, ttf, otf, etc.)
```

## Usage

### Importing Images
```typescript
import logo from '../assets/images/logo.png';
import heroImage from '../assets/images/hero.jpg';
```

### Importing Icons
```typescript
import menuIcon from '../assets/icons/menu.svg';
import closeIcon from '../assets/icons/close.svg';
```

### Importing Fonts
```css
@font-face {
  font-family: 'CustomFont';
  src: url('../assets/fonts/custom-font.woff2') format('woff2');
}
```

## Best Practices

1. **Optimize images** before adding them to the project
2. **Use appropriate formats**:
   - JPG for photographs
   - PNG for images with transparency
   - SVG for icons and simple graphics
   - WebP for modern browsers (with fallbacks)
3. **Keep file sizes reasonable** for better performance
4. **Use descriptive filenames** that indicate the content
5. **Organize files** in subfolders if you have many assets

## Supported Formats

### Images
- JPG/JPEG
- PNG
- SVG
- WebP
- GIF

### Icons
- SVG (recommended)
- PNG
- ICO

### Fonts
- WOFF2 (recommended)
- WOFF
- TTF
- OTF 