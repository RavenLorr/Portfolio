import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CanvasUtils } from '../utils/canvasUtils.js';
import './style/navbar.css';

const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Projects', path: '/projects' },
    { text: 'Contact', path: '/contact' },
    { text: 'Experience', path: '/experience' }
];

function NavItem({ text, path, scalingFactor }) {
    return (
        <li style={{ margin: `${10 * scalingFactor}px` }}>
            <Link to={path} className="font-space-game text-white hover:underline transition duration-300" style={{ fontSize: `${22 * scalingFactor}px` }}>
                {text}
            </Link>
        </li>
    );
}

function NavBar() {
    const [scalingFactor, setScalingFactor] = useState(1);

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
            <ul className="flex ml-auto space-x-4">
                {navItems.map((item) => (
                    <NavItem key={item.text} {...item} scalingFactor={scalingFactor} />
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;