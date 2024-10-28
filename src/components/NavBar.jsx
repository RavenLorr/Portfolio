import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useLanguage } from '@/context/LanguageContext.jsx';
import { navbarData } from '@/data/navbarData.js';
import { CanvasUtils } from '@/utils/canvasUtils.js';

import './style/navbar.css';

function NavItem({ text, path, scalingFactor }) {
    return (
      <li style={{ margin: `${10 * scalingFactor}px` }}>
          <Link to={path} className="font-space-game text-white hover:underline transition duration-300" style={{ fontSize: `${22 * scalingFactor}px` }}>
              {text}
          </Link>
      </li>
    );
}

const NavBar = () => {
  const [scalingFactor, setScalingFactor] = useState(1);
  const { language, toggleLanguage } = useLanguage();
  const navItems = [
    { text: navbarData[language].home, path: '/' },
    { text: navbarData[language].about, path: '/about' },
    { text: navbarData[language].projects, path: '/projects' },
    { text: navbarData[language].contact, path: '/contact' },
    { text: navbarData[language].experience, path: '/experience' }
  ];

  const updateScalingFactor = () => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const { scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvas);
    setScalingFactor(scalingFactor);
  };

  useEffect(() => {
    updateScalingFactor();
    window.addEventListener('resize', updateScalingFactor);

    return () => {
      window.removeEventListener('resize', updateScalingFactor);
    };
  }, []);

  return (
    <nav className="fixed top-0 right-0 w-full p-4 flex items-center bg-custom-radial bg-custom-radial-opacity z-50" style={{ height: `${50 * scalingFactor}px` }}>
      <button onClick={toggleLanguage} className="text-white mr-auto" style={{ fontSize: `${22 * scalingFactor}px` }}>
        {language === 'en' ? 'FR' : 'EN'}
      </button>
      <ul className="flex ml-auto space-x-4">
        {navItems.map((item) => (
          <NavItem key={item.text} {...item} scalingFactor={scalingFactor} />
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;