import { lazy } from 'react';

export const NavBar = lazy(() => import('../../components/NavBar.jsx'));
export const Home = lazy(() => import('../../components/Home.jsx'));
export const About = lazy(() => import('../../components/subPages/About.jsx'));
export const Projects = lazy(() => import('../../components/subPages/Projects.jsx'));
export const Contact = lazy(() => import('../../components/subPages/Contact.jsx'));
export const Experience = lazy(() => import('../../components/subPages/Experience.jsx'));
