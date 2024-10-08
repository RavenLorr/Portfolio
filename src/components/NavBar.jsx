// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Projects', path: '/projects' },
    { text: 'Contact', path: '/contact' },
    { text: 'Experience', path: '/experience' }
];

function NavItem({ text, path }) {
    return (
        <li>
            <Link to={path} className="font-space-game text-white hover:underline transition duration-300">
                {text}
            </Link>
        </li>
    );
}

function NavBar() {
    return (
        <nav className="fixed top-0 right-0 w-full p-4 flex items-center bg-custom-radial bg-custom-radial-opacity z-50">
            <ul className="flex ml-auto space-x-4">
                {navItems.map((item) => (
                    <NavItem key={item.text} {...item} />
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;