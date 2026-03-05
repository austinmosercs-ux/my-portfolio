import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Drawer,
  GlobalStyles,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  CssBaseline,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { GitHub, Language, Email, Menu, Close, EmojiEvents, LinkedIn } from '@mui/icons-material';

// ─── Global Styles & Animations ─────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  html { scroll-behavior: smooth; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #060810; }
  ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 4px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 24px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.08); }
    50%       { box-shadow: 0 0 48px rgba(6,182,212,0.55), 0 0 100px rgba(168,85,247,0.18); }
  }

  @keyframes gradientFlow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .h1 { animation: fadeUp 0.8s ease both; }
  .h2 { animation: fadeUp 0.8s 0.12s ease both; }
  .h3 { animation: fadeUp 0.8s 0.24s ease both; }
  .h4 { animation: fadeUp 0.8s 0.36s ease both; }
  .h5 { animation: fadeUp 0.8s 0.48s ease both; }
`;

// ─── Theme ───────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#060810', paper: '#0a0e1a' },
    primary: { main: '#06b6d4' },
    secondary: { main: '#a855f7' },
    text: { primary: '#f1f5f9', secondary: '#64748b' },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: {
      fontFamily: '"Syne", sans-serif',
      fontSize: 'clamp(3rem, 7vw, 5.5rem)',
      fontWeight: 800,
      lineHeight: 1.0,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontFamily: '"Syne", sans-serif',
      fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    body1: { lineHeight: 1.8, fontWeight: 300 },
    body2: { lineHeight: 1.7 },
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
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.68rem',
          letterSpacing: '0.04em',
          fontWeight: 500,
        },
      },
    },
  },
});

// ─── Shared Styles ───────────────────────────────────────────────────────────
const glassCard = {
  background: 'rgba(10,14,26,0.7)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.05)',
  boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
  '&:hover': {
    border: '1px solid rgba(6,182,212,0.22)',
    transform: 'translateY(-6px)',
    boxShadow: '0 16px 48px rgba(6,182,212,0.08), 0 4px 16px rgba(0,0,0,0.6)',
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  dateEarned: string;
  description?: string;
}

// ─── Section Label Component ─────────────────────────────────────────────────
const SectionLabel: React.FC<{ num: string; label: string; accent?: string }> = ({
  num,
  label,
  accent = '#06b6d4',
}) => (
  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
    <Typography
      sx={{
        fontFamily: '"Syne", monospace',
        fontSize: '0.7rem',
        color: accent,
        fontWeight: 700,
        letterSpacing: '0.15em',
      }}
    >
      {num}
    </Typography>
    <Box sx={{ width: 32, height: 1, backgroundColor: accent, opacity: 0.5 }} />
    <Typography
      sx={{
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        color: '#64748b',
        fontWeight: 600,
        textTransform: 'uppercase',
      }}
    >
      {label}
    </Typography>
  </Stack>
);

// ─── Main Component ──────────────────────────────────────────────────────────
export const Portfolio: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['About', 'Skills', 'Projects', 'Certifications', 'Experience', 'Education', 'Contact'];

  const [projects] = useState<Project[]>([
    {
      id: 'project-1',
      title: 'Project Title',
      description:
        'Add your project description here. Describe what it does, the problems it solves, and what makes it interesting.',
      technologies: ['TypeScript', 'React', 'Node.js'],
      link: 'https://example.com',
      github: 'https://github.com/username/project',
    },
  ]);

  const [experience] = useState<Experience[]>([
    {
      company: 'University of Wisconsin — Parkside · App Factory',
      position: 'Mobile Development Intern',
      duration: 'Mar 2025 — Present',
      description:
        'Selected to join UW-Parkside\'s App Factory internship program, a competitive school-sponsored initiative where students build real mobile applications for clients. Developed Android apps using Jetpack Compose and Kotlin, and iOS apps using Xcode and Swift. Participated in weekly agile-style standups to track project progress and collaborate with the team.',
    },
    {
      company: 'University of Wisconsin — Parkside',
      position: 'Computer Science Assistant',
      duration: 'Sept 2024 — May 2025',
      description:
        'Supported students in grasping computer science course material. Guided students in completing and comprehending weekly programming labs. Provided one-on-one assistance with homework and exam preparation.',
    },
  ]);

  const [certifications] = useState<Certification[]>([
    {
      id: 'cert-1',
      title: 'Mobile Development Certificate',
      issuer: 'University of Wisconsin — Parkside',
      dateEarned: '2025',
      description:
        'Covers Android development with Jetpack Compose and Kotlin, and iOS development with Swift and Xcode.',
    },
    {
      id: 'cert-2',
      title: 'Web Development Certificate',
      issuer: 'University of Wisconsin — Parkside',
      dateEarned: '2025',
      description:
        'Full-stack web development including client-side programming, server-side development, and database management.',
    },
  ]);

  const handleNavClick = (section: string) => {
    setMobileOpen(false);
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={GLOBAL_STYLES} />

      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(6,8,16,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(90deg, #06b6d4, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AM
          </Typography>

          {isMobile ? (
            <IconButton onClick={() => setMobileOpen(true)} sx={{ color: '#f1f5f9' }}>
              <Menu />
            </IconButton>
          ) : (
            <Stack direction="row" spacing={0.5}>
              {navLinks.map((link) => (
                <Button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  sx={{
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    fontWeight: 400,
                    px: 1.5,
                    py: 0.75,
                    position: 'relative',
                    '&:hover': { color: '#f1f5f9', background: 'transparent' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%) scaleX(0)',
                      width: '60%',
                      height: '1px',
                      backgroundColor: '#06b6d4',
                      transition: 'transform 0.25s ease',
                    },
                    '&:hover::after': { transform: 'translateX(-50%) scaleX(1)' },
                  }}
                >
                  {link}
                </Button>
              ))}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* ── MOBILE DRAWER ──────────────────────────────────────────────────── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: '#060810',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#94a3b8' }}>
            <Close />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link} disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(link)}
                sx={{ py: 1.5, borderRadius: 1, '&:hover': { background: 'rgba(6,182,212,0.06)' } }}
              >
                <ListItemText
                  primary={link}
                  primaryTypographyProps={{
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#f1f5f9',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            pt: 10,
            pb: 8,
            backgroundImage: `
              radial-gradient(ellipse 80% 55% at 50% -5%, rgba(6,182,212,0.13) 0%, transparent 65%),
              radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 40px 40px',
          }}
        >
          {/* Ambient orbs */}
          <Box sx={{
            position: 'absolute', width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
            top: '5%', right: '-10%', pointerEvents: 'none',
          }} />
          <Box sx={{
            position: 'absolute', width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
            bottom: '10%', left: '-8%', pointerEvents: 'none',
          }} />

          <Container maxWidth="lg" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Profile image with gradient glow ring */}
            <Box className="h1" sx={{ mb: 3, display: 'inline-block' }}>
              <Box
                sx={{
                  width: 148,
                  height: 148,
                  borderRadius: '50%',
                  mx: 'auto',
                  p: '3px',
                  background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                  animation: 'glowPulse 4s ease-in-out infinite',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: '#060810',
                  }}
                >
                  <Box
                    component="img"
                    src="https://via.placeholder.com/200/060810/06b6d4?text=You"
                    alt="Profile"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Availability badge */}
            <Box className="h2" sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.75,
                  py: 0.6,
                  border: '1px solid rgba(6,182,212,0.25)',
                  borderRadius: 20,
                  background: 'rgba(6,182,212,0.06)',
                }}
              >
                <Box
                  sx={{
                    width: 6, height: 6, borderRadius: '50%',
                    backgroundColor: '#06b6d4',
                    boxShadow: '0 0 8px #06b6d4',
                  }}
                />
                <Typography sx={{ fontSize: '0.72rem', color: '#06b6d4', letterSpacing: '0.1em', fontWeight: 500 }}>
                  AVAILABLE FOR WORK
                </Typography>
              </Box>
            </Box>

            {/* Name / headline */}
            <Typography variant="h1" className="h3" sx={{ mb: 1 }}>
              Austin{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #06b6d4 0%, #a855f7 40%, #06b6d4 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientFlow 5s linear infinite',
                }}
              >
                Moser
              </Box>
            </Typography>

            {/* Tagline */}
            <Typography
              variant="body1"
              className="h4"
              sx={{ color: 'text.secondary', fontSize: '1.15rem', maxWidth: 520, mx: 'auto', mb: 4.5 }}
            >
              Software Developer building mobile &amp; web experiences with Kotlin, Swift, TypeScript, and React.
            </Typography>

            {/* CTA buttons */}
            <Stack className="h5" direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                href="#projects"
                sx={{
                  px: 3.5,
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
                View My Work
              </Button>
              <Button
                variant="outlined"
                href="/resume.pdf"
                download="Austin_Moser_Resume.pdf"
                sx={{
                  px: 3.5,
                  py: 1.25,
                  fontSize: '0.9rem',
                  borderColor: 'rgba(168,85,247,0.4)',
                  color: '#c084fc',
                  '&:hover': {
                    borderColor: '#a855f7',
                    color: '#a855f7',
                    background: 'rgba(168,85,247,0.06)',
                  },
                }}
              >
                Download Resume
              </Button>
              <Button
                variant="outlined"
                href="#contact"
                sx={{
                  px: 3.5,
                  py: 1.25,
                  fontSize: '0.9rem',
                  borderColor: 'rgba(255,255,255,0.15)',
                  color: '#f1f5f9',
                  '&:hover': {
                    borderColor: '#06b6d4',
                    color: '#06b6d4',
                    background: 'rgba(6,182,212,0.06)',
                  },
                }}
              >
                Get In Touch
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* ── ABOUT ────────────────────────────────────────────────────────── */}
        <Box id="about" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 4, md: 10 }} alignItems="center">
              <Grid item xs={12} md={4}>
                <SectionLabel num="01" label="About" />
                <Typography variant="h2">About Me</Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2.5 }}>
                  I&apos;m a Computer Science student at the University of Wisconsin — Parkside with a
                  focus on mobile and web development. Currently interning in the App Factory program,
                  where I build Android apps with Jetpack Compose and iOS apps with Xcode.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                  I&apos;ve also worked as a CS Teaching Assistant, helping students through coursework,
                  labs, and exam prep. I enjoy writing clean, purposeful code and am always looking
                  for new challenges at the intersection of design and engineering.
                </Typography>
                <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ gap: '6px' }}>
                  {['Kotlin', 'Swift', 'TypeScript', 'React', 'Jetpack Compose', 'Node.js'].map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: 'rgba(6,182,212,0.3)',
                        color: '#06b6d4',
                        background: 'rgba(6,182,212,0.06)',
                        '&:hover': { background: 'rgba(6,182,212,0.12)' },
                      }}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)', mx: { xs: 2, md: 10 } }} />

        {/* ── SKILLS ───────────────────────────────────────────────────────── */}
        <Box id="skills" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <SectionLabel num="02" label="Skills" />
            <Typography variant="h2" sx={{ mb: 6 }}>
              Tech Stack
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  category: 'Languages',
                  color: '#06b6d4',
                  bg: 'rgba(6,182,212,0.06)',
                  border: 'rgba(6,182,212,0.3)',
                  skills: ['TypeScript', 'JavaScript', 'Kotlin', 'Swift', 'Java', 'Python', 'SQL', 'HTML/CSS'],
                },
                {
                  category: 'Frameworks & Libraries',
                  color: '#a855f7',
                  bg: 'rgba(168,85,247,0.06)',
                  border: 'rgba(168,85,247,0.3)',
                  skills: ['React', 'Jetpack Compose', 'Node.js', 'SwiftUI'],
                },
                {
                  category: 'Tools & Platforms',
                  color: '#f59e0b',
                  bg: 'rgba(245,158,11,0.06)',
                  border: 'rgba(245,158,11,0.3)',
                  skills: ['Git', 'Android Studio', 'Xcode', 'VS Code', 'IntelliJ IDEA', 'Firebase'],
                },
              ].map(({ category, color, bg, border, skills }) => (
                <Grid item xs={12} md={4} key={category}>
                  <Card
                    sx={{
                      ...glassCard,
                      height: '100%',
                      borderTop: `2px solid ${color}55`,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        sx={{
                          fontSize: '0.68rem',
                          letterSpacing: '0.15em',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color,
                          mb: 2,
                        }}
                      >
                        {category}
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" sx={{ gap: '8px' }}>
                        {skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: border,
                              color,
                              background: bg,
                              fontSize: '0.72rem',
                              '&:hover': { background: bg.replace('0.06', '0.12') },
                            }}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)', mx: { xs: 2, md: 10 } }} />

        {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
        <Box id="projects" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <SectionLabel num="03" label="Projects" />
            <Typography variant="h2" sx={{ mb: 6 }}>
              Selected Work
            </Typography>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <Card
                    sx={{
                      ...glassCard,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderTop: '2px solid rgba(6,182,212,0.35)',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
                        {project.description}
                      </Typography>
                      <Stack direction="row" spacing={0.75} sx={{ mb: 2.5, flexWrap: 'wrap', gap: '6px' }}>
                        {project.technologies.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: 'rgba(168,85,247,0.3)',
                              color: '#c084fc',
                              background: 'rgba(168,85,247,0.06)',
                              fontSize: '0.66rem',
                            }}
                          />
                        ))}
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        {project.link && (
                          <Button
                            size="small"
                            startIcon={<Language sx={{ fontSize: 15 }} />}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#06b6d4',
                              fontSize: '0.78rem',
                              p: '4px 8px',
                              '&:hover': { background: 'rgba(6,182,212,0.08)' },
                            }}
                          >
                            Live Demo
                          </Button>
                        )}
                        {project.github && (
                          <Button
                            size="small"
                            startIcon={<GitHub sx={{ fontSize: 15 }} />}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#94a3b8',
                              fontSize: '0.78rem',
                              p: '4px 8px',
                              '&:hover': { background: 'rgba(255,255,255,0.05)', color: '#f1f5f9' },
                            }}
                          >
                            Source
                          </Button>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)', mx: { xs: 2, md: 10 } }} />

        {/* ── CERTIFICATIONS ───────────────────────────────────────────────── */}
        <Box id="certifications" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <SectionLabel num="04" label="Certifications" accent="#f59e0b" />
            <Typography variant="h2" sx={{ mb: 6 }}>
              Credentials
            </Typography>
            <Grid container spacing={3}>
              {certifications.map((cert) => (
                <Grid item xs={12} sm={6} key={cert.id}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(10,14,26,0.7)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(245,158,11,0.14)',
                      boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
                      transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                      '&:hover': {
                        border: '1px solid rgba(245,158,11,0.35)',
                        transform: 'translateY(-6px)',
                        boxShadow: '0 16px 48px rgba(245,158,11,0.07)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 1.5,
                            background: 'rgba(245,158,11,0.1)',
                            border: '1px solid rgba(245,158,11,0.22)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <EmojiEvents sx={{ fontSize: 22, color: '#f59e0b' }} />
                        </Box>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                            <Typography
                              variant="h6"
                              sx={{ fontSize: '0.95rem', mb: 0.5, lineHeight: 1.3, color: '#f1f5f9' }}
                            >
                              {cert.title}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                              {cert.dateEarned}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: '0.8rem' }}>
                            {cert.issuer}
                          </Typography>
                          {cert.description && (
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65, fontSize: '0.85rem' }}>
                              {cert.description}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)', mx: { xs: 2, md: 10 } }} />

        {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
        <Box id="experience" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <SectionLabel num="05" label="Experience" />
            <Typography variant="h2" sx={{ mb: 6 }}>
              Work History
            </Typography>

            {/* Timeline */}
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: 16, md: 20 },
                  top: 24,
                  bottom: 24,
                  width: 1,
                  background: 'linear-gradient(to bottom, rgba(6,182,212,0.45), rgba(6,182,212,0.04))',
                }}
              />
              <Stack spacing={4}>
                {experience.map((exp, index) => (
                  <Box key={`${exp.company}-${index}`} sx={{ pl: { xs: 6, md: 8 }, position: 'relative' }}>
                    {/* Dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: { xs: 10, md: 14 },
                        top: 20,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: '#06b6d4',
                        border: '2px solid #060810',
                        boxShadow: '0 0 10px rgba(6,182,212,0.6)',
                      }}
                    />
                    <Card sx={glassCard}>
                      <CardContent sx={{ p: 3 }}>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          justifyContent="space-between"
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          sx={{ mb: 1 }}
                        >
                          <Typography variant="h6" sx={{ color: '#06b6d4', fontSize: '1rem' }}>
                            {exp.position}
                          </Typography>
                          <Typography sx={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500, mt: { xs: 0.25, sm: 0 } }}>
                            {exp.duration}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#94a3b8', fontSize: '0.85rem', mb: 1.5 }}>
                          {exp.company}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                          {exp.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Container>
        </Box>

        {/* ── EDUCATION ────────────────────────────────────────────────────── */}
        <Box id="education" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <SectionLabel num="06" label="Education" />
            <Typography variant="h2" sx={{ mb: 6 }}>
              Education
            </Typography>
            <Stack spacing={3}>

              {/* UW-Parkside */}
              <Card sx={glassCard}>
                <CardContent sx={{ p: 3 }}>
                  {/* Header row */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'flex-start' }} sx={{ mb: 2 }}>
                    <Box>
                      <Typography
                        variant="h6"
                        component="a"
                        href="https://www.uwp.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: '#06b6d4', fontSize: '1rem', mb: 0.25, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        University of Wisconsin — Parkside
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', mb: 0.5 }}>
                        Bachelor of Science — Computer Science
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Sept 2022 — Expected Dec 2026
                      </Typography>
                    </Box>
                    <Stack alignItems={{ xs: 'flex-start', sm: 'flex-end' }} spacing={0.75} sx={{ mt: { xs: 1.5, sm: 0 }, flexShrink: 0 }}>
                      {/* IN PROGRESS badge */}
                      <Box sx={{ px: 1.25, py: 0.3, borderRadius: 10, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
                        <Typography sx={{ fontSize: '0.65rem', color: '#06b6d4', letterSpacing: '0.08em', fontWeight: 600 }}>IN PROGRESS</Typography>
                      </Box>
                      {/* Dean's List badge */}
                      <Box sx={{ px: 1.25, py: 0.3, borderRadius: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
                        <Typography sx={{ fontSize: '0.65rem', color: '#f59e0b', letterSpacing: '0.08em', fontWeight: 600 }}>DEAN&apos;S LIST</Typography>
                      </Box>
                      {/* GPA */}
                      <Typography sx={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
                        Major GPA: 3.2 / 4.0
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Certificates */}
                  <Typography sx={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase', mb: 1 }}>
                    Certificates
                  </Typography>
                  <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ mb: 2.5, gap: '6px' }}>
                    {['Mobile Development', 'Web Development'].map((cert) => (
                      <Chip key={cert} label={cert} size="small" variant="outlined"
                        sx={{ borderColor: 'rgba(168,85,247,0.3)', color: '#c084fc', background: 'rgba(168,85,247,0.06)', fontSize: '0.68rem' }}
                      />
                    ))}
                  </Stack>

                  {/* Relevant Coursework */}
                  <Typography sx={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase', mb: 1 }}>
                    Relevant Coursework
                  </Typography>
                  <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ gap: '6px' }}>
                    {[
                      'Data Structures & Algorithms',
                      'Software Engineering I & II',
                      'Mobile Dev (Android & iOS)',
                      'Database Management Systems',
                      'Operating Systems',
                      'Computer Architecture',
                      'Artificial Intelligence',
                      'Cloud Computing',
                      'Client & Server Web Programming',
                      'Programming Languages',
                    ].map((course) => (
                      <Chip key={course} label={course} size="small" variant="outlined"
                        sx={{ borderColor: 'rgba(6,182,212,0.2)', color: '#94a3b8', background: 'rgba(6,182,212,0.04)', fontSize: '0.66rem' }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Gateway */}
              <Card sx={glassCard}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
                    <Box>
                      <Typography
                        variant="h6"
                        component="a"
                        href="https://www.gtc.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: '#94a3b8', fontSize: '1rem', mb: 0.25, textDecoration: 'none', '&:hover': { color: '#f1f5f9', textDecoration: 'underline' } }}
                      >
                        Gateway Technical College
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem', mb: 0.5 }}>
                        Associate of Applied Science — Software Developer
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: '#475569' }}>
                        2018 — 2022 · Transferred to UW-Parkside
                      </Typography>
                    </Box>
                    <Box sx={{ mt: { xs: 1.5, sm: 0 }, px: 1.25, py: 0.3, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <Typography sx={{ fontSize: '0.65rem', color: '#64748b', letterSpacing: '0.08em', fontWeight: 600 }}>TRANSFERRED</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

            </Stack>
          </Container>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)', mx: { xs: 2, md: 10 } }} />

        {/* ── CONTACT ──────────────────────────────────────────────────────── */}
        <Box
          id="contact"
          sx={{
            py: { xs: 10, md: 16 },
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `
              radial-gradient(ellipse 60% 50% at 50% 110%, rgba(6,182,212,0.09) 0%, transparent 70%),
              radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 40px 40px',
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <SectionLabel num="07" label="Contact" />
            <Typography variant="h2" sx={{ mb: 2 }}>
              Let&apos;s Build Something
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, maxWidth: 440, mx: 'auto' }}>
              Feel free to reach out for collaborations, opportunities, or just a friendly hello.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Email />}
              href="mailto:austinmosercs@gmail.com"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                boxShadow: '0 4px 24px rgba(6,182,212,0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                  boxShadow: '0 8px 36px rgba(6,182,212,0.5)',
                },
              }}
            >
              Send Me an Email
            </Button>
          </Container>
        </Box>
      </Box>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          py: 4,
          backgroundColor: '#040609',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: '1rem',
                background: 'linear-gradient(90deg, #06b6d4, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AM
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.8rem' }}>
              © 2025 Austin Moser. Crafted with care.
            </Typography>
            <Stack direction="row" spacing={0.5}>
              <IconButton
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: '#475569', '&:hover': { color: '#f1f5f9', background: 'rgba(255,255,255,0.06)' } }}
              >
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/austin-moser-611004290/"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: '#475569', '&:hover': { color: '#0a66c2', background: 'rgba(10,102,194,0.08)' } }}
              >
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton
                href="mailto:austinmosercs@gmail.com"
                size="small"
                sx={{ color: '#475569', '&:hover': { color: '#06b6d4', background: 'rgba(6,182,212,0.07)' } }}
              >
                <Email fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
