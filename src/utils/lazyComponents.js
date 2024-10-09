import { lazy } from 'react';

export const NavBar = lazy(() => import('../components/NavBar'));
export const Home = lazy(() => import('../components/Home'));
export const About = lazy(() => import('../components/subPages/About'));
export const Projects = lazy(() => import('../components/subPages/Projects'));
export const Contact = lazy(() => import('../components/subPages/Contact'));
export const Experience = lazy(() => import('../components/subPages/Experience'));
export const PointerParticles = lazy(() => import('../components/animation/PointerParticle.jsx'));
export const MultiWaveRing = lazy(() => import('../components/animation/MultiWaveRing'));
export const FlowerShoots = lazy(() => import('../components/animation/FlowerShoots'));