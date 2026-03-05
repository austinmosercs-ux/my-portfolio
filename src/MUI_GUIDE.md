# Material UI Component Usage Guide

This portfolio now uses **Material UI (MUI Core)** as its component library. Below are common patterns for using MUI components.

## Common MUI Components

### Button

```typescript
import { Button } from '@mui/material';

<Button variant="contained" color="primary">
  Click Me
</Button>

<Button variant="outlined" startIcon={<SendIcon />}>
  Send
</Button>
```

**Variants:** `contained`, `outlined`, `text`
**Colors:** `primary`, `secondary`, `error`, `warning`, `info`, `success`
**Sizes:** `small`, `medium`, `large`

### Card

```typescript
import { Card, CardContent, CardHeader } from '@mui/material';

<Card>
  <CardHeader title="Title" />
  <CardContent>
    Your content here
  </CardContent>
</Card>
```

### Typography

```typescript
import { Typography } from '@mui/material';

<Typography variant="h1">Heading</Typography>
<Typography variant="body1">Body text</Typography>
```

**Variants:** `h1` to `h6`, `body1`, `body2`, `caption`, `overline`, etc.

### Stack

```typescript
import { Stack } from '@mui/material';

<Stack direction="row" spacing={2}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

Layout components for spacing and direction.

### Grid

```typescript
import { Grid } from '@mui/material';

<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    Content
  </Grid>
</Grid>
```

Responsive grid layout system.

### Box

```typescript
import { Box } from '@mui/material';

<Box sx={{ p: 2, backgroundColor: '#fff' }}>
  Content with padding and background
</Box>
```

Flexible container with sx prop for styling.

### AppBar & Toolbar

```typescript
import { AppBar, Toolbar } from '@mui/material';

<AppBar position="sticky">
  <Toolbar>
    <Typography variant="h6">My App</Typography>
  </Toolbar>
</AppBar>
```

Navigation header component.

### Chip

```typescript
import { Chip } from '@mui/material';

<Chip label="React" color="primary" variant="outlined" />
```

Small tag/badge component.

### TextField

```typescript
import { TextField } from '@mui/material';

<TextField
  label="Email"
  type="email"
  variant="outlined"
  fullWidth
/>
```

Form input component.

## Theming

The portfolio uses a custom theme defined in `src/portfolio.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#1e40af',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// Use theme in your app:
<ThemeProvider theme={theme}>
  <YourApp />
</ThemeProvider>
```

### Common Theme Customizations

```typescript
// Change color
palette: {
  primary: { main: '#your-color' },
}

// Change fonts
typography: {
  fontFamily: 'Your Font',
  h1: { fontSize: '3rem' }
}

// Add custom spacing
spacing: 8,

// Break points for responsive design
breakpoints: {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  }
}
```

## Styling with sx Prop

MUI components support the `sx` prop for inline styling:

```typescript
<Box
  sx={{
    p: 2,                              // padding
    m: 1,                              // margin
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    '@media (max-width: 600px)': {
      p: 1,
    }
  }}
>
  Styled content
</Box>
```

**Common sx properties:**
- `p`: padding
- `m`: margin
- `pt`, `pr`, `pb`, `pl`: padding top/right/bottom/left
- `mt`, `mr`, `mb`, `ml`: margin top/right/bottom/left
- `display`, `flexDirection`, `alignItems`, `justifyContent`
- `width`, `height`, `minHeight`, `maxWidth`
- `backgroundColor`, `color`, `border`, `borderRadius`

## Icons

MUI Icons are available via `@mui/icons-material`:

```typescript
import { GitHub, Email, LinkedIn, Twitter } from '@mui/icons-material';

<Button startIcon={<GitHub />}>GitHub</Button>
<Button endIcon={<Email />}>Email</Button>
```

**Popular icons:** `GitHub`, `Email`, `LinkedIn`, `Twitter`, `Facebook`, `Instagram`, `Language`, `MoreVert`, `Menu`, `Close`, `Search`, `Delete`, `Edit`, `Check`, `Warning`

View all icons at: https://mui.com/material-ui/icons/

## Responsive Design

MUI Grid system with breakpoints:

```typescript
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    This will be:
    - 100% width on mobile (xs)
    - 50% width on tablets (sm)
    - 33% width on desktop (md)
  </Grid>
</Grid>
```

Alternative using sx:

```typescript
<Box sx={{ 
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
  gap: 2
}}>
```

## Additional Resources

- [MUI Documentation](https://mui.com/material-ui/getting-started/)
- [Component API Reference](https://mui.com/material-ui/api/)
- [Theming Guide](https://mui.com/material-ui/customization/theming/)
- [Icons Gallery](https://mui.com/material-ui/icons/)

## Migration Notes

The previous custom component library (`src/components/`) is no longer in use. All components are now from MUI. If you wish to reference the old custom components, they're still in the directory but marked for deprecation.

To update existing code to use MUI:

1. Replace custom `Button` with `@mui/material Button`
2. Replace custom `Card` with `@mui/material Card`
3. Use `Stack` instead of flex containers
4. Use `Grid` for layouts instead of CSS Grid
5. Use theme colors via `theme.palette.*`
6. Use `sx` prop instead of custom CSS classes
