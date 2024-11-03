import { FaUser, FaRunning, FaCamera, FaPencilAlt, FaFlag, FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';

export const aboutData = {
  locationIcon: FaMapMarkerAlt,
  languageIcon: FaLanguage,
  en: {
    title: 'About Me',
    location: 'Location: Québec, Canada',
    language: 'Languages: English, French',
    tabs: {
      basics: {
        icon: FaUser,
        title: 'The Basics',
        content:
          'My name is Étienne, even thought I am commonly reffered to by my English name Ethan. I am a 21-year-old developer born in Québec, Canada. Currently, ' +
          'I am completing my studies in Application Development while also engaging in various contract and personal projects.',
      },
      sport: {
        icon: FaRunning,
        title: 'Sport',
        content:
          'I have a passion for sports, much like many others. During my childhood, I played soccer, and over the years, ' +
          'I transitioned to basketball, volleyball, climbing, and many others. My most recent and favorite sports discovery remains calisthenics.',
      },
      photography: {
        icon: FaCamera,
        title: 'Photography',
        content:
          'One of my hobbies is photography. I take great pleasure in capturing moments, landscapes, and the beauty of people. ' +
          'I am continually learning and refining my skills, much like in my development work, and I take pride in my progress and passion for this art form.',
      },
      drawing: {
        icon: FaPencilAlt,
        title: 'Drawing',
        content:
          "I have always had a passion for drawing, a passion I kept since childhood. Although I wasn't particularly skilled at the time," +
          ' I kept practicing and have seen significant improvement over the years. While drawing remains a hobby, I take great joy in it and am proud of the progress I have made.',
      },
      goals: {
        icon: FaFlag,
        title: 'Goals',
        content:
          'I would love expand my knowledge in AI and machine learning, as well as improving my skills in web development. I am also interested in ' +
          'learning more about game development and design. I consistently seek new challenges and opportunities for learning and growth',
      },
    },
  },
  fr: {
    title: 'À propos de moi',
    location: 'localisation: Québec, Canada',
    language: 'Langues: Anglais, Français',
    tabs: {
      basics: {
        icon: FaUser,
        title: 'Les Bases',
        content:
          "Je m'appelle Étienne, bien que je sois normalement appelé par mon nom anglais Ethan. Je suis un développeur de 21 ans, né au Québec, Canada." +
          "je complète actuellement mes études en développement d'applications tout en travaillant sur divers projets personnels et contractuels.",
      },
      sport: {
        icon: FaRunning,
        title: 'Sport',
        content:
          "J'ai une passion pour le sport, tout comme beaucoup d'autres. Durant mon enfance, j'ai joué au soccer, et au fil des ans, " +
          "je suis passé au basketball, au volleyball, à l'escalade, et à bien d'autres. Ma découverte sportive la plus récente et préférée reste encore à ce jour la callisthénie.",
      },
      photography: {
        icon: FaCamera,
        title: 'Photographie',
        content:
          'Un de mes passe-temps est la photographie. Je prends un grand plaisir à capturer des moments, des paysages, et la beauté des gens. ' +
          "Je continue d'apprendre et de perfectionner mes compétences, tout comme dans mon travail de développement, et je suis fier de mes progrès et de ma passion pour cet art.",
      },
      drawing: {
        icon: FaPencilAlt,
        title: 'Dessin',
        content:
          "J'ai toujours eu une passion pour le dessin, une passion que j'ai gardée depuis l'enfance. Bien que je n'étais pas particulièrement doué à l'époque," +
          " j'ai continué à me pratiquer et j'ai vu une amélioration significative au fil des ans. Bien que le dessin reste un passe-temps, je prends un grand plaisir et suis fier des progrès que j'ai réalisés.",
      },
      goals: {
        icon: FaFlag,
        title: 'Objectifs',
        content:
          "J'aimerais approfondir mes connaissances en IA et en apprentissage machine, ainsi qu'améliorer mes compétences en développement web. Je suis également intéressé à " +
          "en apprendre plus sur le développement et la conception de jeux. Je cherche constamment de nouveaux défis et des opportunités d'apprentissage et de croissance.",
      },
    },
  },
};
