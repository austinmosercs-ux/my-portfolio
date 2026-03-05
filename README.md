# My Portfolio

A modern portfolio website built with **Material UI (MUI)**, **React**, and **TypeScript**.

## Features

- ✨ Built with TypeScript & React
- 🎨 Material Design UI with MUI Core
- 📱 Fully responsive design
- 🎯 Modern component-based architecture
- 🚀 Production-ready build setup
- 🔧 Easy to customize

## Project Structure

```
my-portfolio/
├── src/
│   ├── index.tsx         # React entry point
│   ├── portfolio.tsx     # Main Portfolio component
│   └── styles.css        # Global styles (optional)
├── public/
│   └── index.html        # HTML template
├── dist/                 # Build output
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts a development server at `http://localhost:3000` with hot reload enabled.

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Type Checking

```bash
npm run type-check
```

Checks for TypeScript compilation errors.

## Customization

### Adding Projects

Edit `src/portfolio.tsx` and add projects to the `projects` state:

```typescript
{
  id: 'project-2',
  title: 'Your Project Title',
  description: 'Project description',
  technologies: ['TypeScript', 'React', 'MUI'],
  link: 'https://example.com',
  github: 'https://github.com/username/project',
}
```

### Adding Experience

Edit `src/portfolio.tsx` and add experience to the `experience` state:

```typescript
{
  company: 'Company Name',
  position: 'Job Title',
  duration: '2024 - Present',
  description: 'Job description',
}
```

### Customizing Theme

Edit the `theme` object in `src/portfolio.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Change primary color
    },
    secondary: {
      main: '#1e40af',
    },
  },
  typography: {
    fontFamily: 'Your Font Family',
  },
});
```

## Material UI Documentation

For detailed component documentation, visit:
- [MUI Core Documentation](https://mui.com/material-ui/getting-started/)
- [MUI Icons](https://mui.com/material-ui/icons/)
- [Theme Customization](https://mui.com/material-ui/customization/theming/)

## Dependencies

- **React 18** - UI library
- **Material UI (@mui/material)** - Component library
- **@mui/icons-material** - Material Design icons
- **@emotion/react & @emotion/styled** - CSS-in-JS styling
- **TypeScript** - Type safety
- **Webpack** - Module bundler
- **Babel** - JSX compiler

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT

