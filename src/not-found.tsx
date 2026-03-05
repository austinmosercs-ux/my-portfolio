import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  GlobalStyles,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  CssBaseline,
} from '@mui/material';
import { ArrowBack, HomeOutlined } from '@mui/icons-material';

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #060810; }
  ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 4px; }

  @keyframes glitch-1 {
    0%, 100% { clip-path: inset(0 0 96% 0); transform: translate(-4px, 0); }
    20%       { clip-path: inset(30% 0 50% 0); transform: translate(4px, 0); }
    40%       { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 0); }
    60%       { clip-path: inset(10% 0 80% 0); transform: translate(2px, 0); }
    80%       { clip-path: inset(50% 0 30% 0); transform: translate(-4px, 0); }
  }

  @keyframes glitch-2 {
    0%, 100% { clip-path: inset(80% 0 0 0); transform: translate(4px, 0); }
    20%       { clip-path: inset(10% 0 70% 0); transform: translate(-4px, 0); }
    40%       { clip-path: inset(60% 0 20% 0); transform: translate(2px, 0); }
    60%       { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 0); }
    80%       { clip-path: inset(40% 0 40% 0); transform: translate(4px, 0); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  .nf-1 { animation: fadeUp 0.7s 0.1s ease both; }
  .nf-2 { animation: fadeUp 0.7s 0.25s ease both; }
  .nf-3 { animation: fadeUp 0.7s 0.4s ease both; }
`;

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#060810', paper: '#0a0e1a' },
    primary: { main: '#06b6d4' },
    text: { primary: '#f1f5f9', secondary: '#64748b' },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    body1: { lineHeight: 1.8, fontWeight: 300 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          borderRadius: 6,
        },
      },
    },
  },
});

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={GLOBAL_STYLES} />

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,182,212,0.07) 0%, transparent 70%),
            radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px',
        }}
      >
        {/* Scanline sweep */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            zIndex: 0,
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.15), transparent)',
              animation: 'scanline 6s linear infinite',
            },
          }}
        />

        {/* Ambient orbs */}
        <Box sx={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          top: '-5%', right: '-5%', pointerEvents: 'none',
        }} />
        <Box sx={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
          bottom: '5%', left: '-5%', pointerEvents: 'none',
        }} />

        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Glitch 404 number */}
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
            {/* Base layer */}
            <Typography
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontSize: 'clamp(7rem, 20vw, 14rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                userSelect: 'none',
              }}
            >
              404
            </Typography>

            {/* Glitch layer 1 — cyan */}
            <Typography
              aria-hidden
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontSize: 'clamp(7rem, 20vw, 14rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                color: '#06b6d4',
                position: 'absolute',
                inset: 0,
                opacity: 0.6,
                animation: 'glitch-1 4s steps(1) infinite',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              404
            </Typography>

            {/* Glitch layer 2 — purple */}
            <Typography
              aria-hidden
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontSize: 'clamp(7rem, 20vw, 14rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                color: '#a855f7',
                position: 'absolute',
                inset: 0,
                opacity: 0.5,
                animation: 'glitch-2 4s steps(1) infinite',
                animationDelay: '0.5s',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              404
            </Typography>
          </Box>

          {/* Section label */}
          <Stack className="nf-1" direction="row" alignItems="center" spacing={1.5} justifyContent="center" sx={{ mb: 2 }}>
            <Box sx={{ width: 24, height: 1, backgroundColor: '#06b6d4', opacity: 0.5 }} />
            <Typography sx={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Page Not Found
            </Typography>
            <Box sx={{ width: 24, height: 1, backgroundColor: '#06b6d4', opacity: 0.5 }} />
          </Stack>

          <Typography
            className="nf-2"
            variant="body1"
            sx={{ color: 'text.secondary', maxWidth: 400, mx: 'auto', mb: 5 }}
          >
            Looks like this page drifted into the void. Let&apos;s get you back to somewhere real.
          </Typography>

          {/* Actions */}
          <Stack className="nf-3" direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              startIcon={<HomeOutlined />}
              onClick={() => navigate('/')}
              sx={{
                px: 3,
                py: 1.25,
                fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                boxShadow: '0 4px 20px rgba(6,182,212,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                  boxShadow: '0 8px 32px rgba(6,182,212,0.45)',
                },
              }}
            >
              Back to Home
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{
                px: 3,
                py: 1.25,
                fontSize: '0.9rem',
                borderColor: 'rgba(255,255,255,0.12)',
                color: '#94a3b8',
                '&:hover': {
                  borderColor: '#06b6d4',
                  color: '#06b6d4',
                  background: 'rgba(6,182,212,0.06)',
                },
              }}
            >
              Go Back
            </Button>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
