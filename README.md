# Othentk Website

A modern, responsive React TypeScript website template with beautiful UI and smooth animations.

## Features

- ⚛️ **React 17** with TypeScript
- 🎨 **Modern Design** with gradient backgrounds and smooth animations
- 📱 **Responsive Layout** that works on all devices
- 🚀 **Fast Performance** optimized for speed
- 🎯 **Type Safety** with TypeScript
- 📝 **Contact Form** ready for integration
- 🎭 **Smooth Scrolling** navigation

## Sections

- **Hero Section** - Eye-catching landing area with call-to-action
- **About Section** - Feature highlights with animated cards
- **Services Section** - Service offerings in a grid layout
- **Contact Section** - Contact form and information
- **Navigation** - Fixed header with smooth scrolling

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd othentk-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
othentk-website/
├── public/
│   ├── index.html          # Main HTML file
│   └── manifest.json       # PWA manifest
├── src/
│   ├── App.tsx            # Main App component
│   ├── App.css            # App-specific styles
│   ├── index.tsx          # Entry point
│   ├── index.css          # Global styles
│   ├── reportWebVitals.ts # Performance monitoring
│   └── react-app-env.d.ts # TypeScript declarations
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## Customization

### Colors
The main color scheme uses blue (`#2563eb`) as the primary color. You can customize this in `src/App.css`:

```css
.nav-logo h2 {
  color: #2563eb; /* Change this to your brand color */
}
```

### Content
Update the content in `src/App.tsx` to match your business or personal information:

- Company name in the navigation
- Hero section content
- About section features
- Services offered
- Contact information

### Styling
The CSS is organized in `src/App.css` with clear sections for:
- Navigation styles
- Hero section
- Content sections
- Cards and grids
- Contact form
- Responsive design

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, please open an issue on GitHub.