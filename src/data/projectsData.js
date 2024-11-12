import BoxTD from '@/assets/BoxTD.png';
import CarReview from '@/assets/CarReview.png';
import DoA from '@/assets/DoA.png';
import Portfolio from '@/assets/Portfolio.png';
import RaceHorizon from '@/assets/RaceHorizon.png';
import TopVentes from '@/assets/TopVentes.png';

export const projectsData = {
  en: {
    title: 'My Projects',
    projects: [
      {
        id: 1,
        name: 'Box TD Battle',
        description: 'Fun and basic remake of the famous Bloons TD Game (Experimental)',
        image: BoxTD,
        tags: ['Unity', 'C#', 'Game'],
        liveLink: 'https://ravenlorr.itch.io/box-td-battle',
        codeLink: 'https://github.com/RavenLorr/BoxTD-fork',
      },
      {
        id: 2,
        name: 'Race Horizon',
        description: 'Top runner mobile game made on my own with Unity',
        image: RaceHorizon,
        tags: ['Unity', 'C#', 'Game'],
        liveLink: 'Soon',
        codeLink: 'Private',
      },
      {
        id: 3,
        name: 'Car Review site',
        description: 'Experimental product review site made in team(2)',
        image: CarReview,
        tags: ['React', 'JavaScript', 'Bootstrap'],
        liveLink: 'Soon',
        codeLink: 'Soon',
      },
      {
        id: 4,
        name: 'This Portfolio',
        description: 'My personal portfolio made with love',
        image: Portfolio,
        tags: ['React', 'JavaScript', 'Tailwind CSS'],
        liveLink: 'https://ravenlorr.com/',
        codeLink: 'https://github.com/RavenLorr/Portfolio',
      },
      {
        id: 5,
        name: 'Dead or Alive',
        description: 'Lead of a RedM server collaboration project made with 8 people (5 devs)',
        image: DoA,
        tags: ['Lua', 'JavaScript'],
        liveLink: 'Not Available',
        codeLink: 'Soon',
      },
      {
        id: 6,
        name: 'Top Ventes',
        description: 'Local accounting application (essential)',
        image: TopVentes,
        tags: ['Java'],
        liveLink: 'Not Available',
        codeLink: 'Soon',
      },
    ],
  },
  fr: {
    title: 'Mes Projets',
    projects: [
      {
        id: 1,
        name: 'Box TD Battle',
        description: 'Remake amusant et basique du célèbre jeu Bloons TD (expérimental)',
        image: BoxTD,
        tags: ['Unity', 'C#', 'Game'],
        liveLink: 'https://ravenlorr.itch.io/box-td-battle',
        codeLink: 'https://github.com/RavenLorr/BoxTD-fork',
      },
      {
        id: 2,
        name: 'Race Horizon',
        description: 'Top runner mobile game made on my own with Unity',
        image: RaceHorizon,
        tags: ['Unity', 'C#', 'Game'],
        liveLink: 'Bientôt',
        codeLink: 'Privé',
      },
      {
        id: 3,
        name: 'Site de Critique de Voiture',
        description: 'Site de test de produits expérimentaux réalisé en équipe(2)',
        image: CarReview,
        tags: ['React', 'JavaScript', 'Bootstrap'],
        liveLink: 'Bientôt',
        codeLink: 'Bientôt',
      },
      {
        id: 4,
        name: 'Ce Portfolio',
        description: 'Mon portfolio personnel fait avec amour',
        image: Portfolio,
        tags: ['React', 'JavaScript', 'Tailwind CSS'],
        liveLink: 'https://ravenlorr.com/',
        codeLink: 'https://github.com/RavenLorr/Portfolio',
      },
      {
        id: 5,
        name: 'Dead or Alive',
        description: 'Chef d\'un projet collaboratif serveur RedM réalisé avec 8 personnes (5 devs)',
        image: DoA,
        tags: ['Lua', 'JavaScript'],
        liveLink: 'Plus Disponible',
        codeLink: 'Bientôt',
      },
      {
        id: 6,
        name: 'Top Ventes',
        description: 'Application monoposte de comptabilité (essentiel)',
        image: TopVentes,
        tags: ['Java'],
        liveLink: 'Pas Disponible',
        codeLink: 'Bientôt',
      },
    ],
  },
};
