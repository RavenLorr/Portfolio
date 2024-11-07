import BoxTD from '@/assets/BoxTD.png';
import Portfolio from '@/assets/Portfolio.png';

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
        image: '',
        tags: ['Unity', 'C#', 'Game'],
        liveLink: 'Soon',
        codeLink: 'Private',
      },
      {
        id: 3,
        name: 'Car Review site',
        description: 'Experimental product review site made in team(2)',
        image: '',
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
        liveLink: 'Soon',
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
        image: '',
        tags: ['Unity', 'C#', 'Game'],
        liveLink: 'Bientôt',
        codeLink: 'Privé',
      },
      {
        id: 3,
        name: 'Site de Critique de Voiture',
        description: 'Site de test de produits expérimentaux réalisé en équipe(2)',
        image: '',
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
        liveLink: 'Soon',
        codeLink: 'Soon',
      },
    ],
  },
};
