import React from 'react';
import '../styles/NavBar.css';

function NavBar() {
    return (
        <nav className="fixed top-0 right-0 w-full p-4 flex items-center backdrop-blur-md backdrop-brightness-125 text-lg transition ease-out">
            <ul className="flex ml-auto space-x-4">
                <li className="space-game text-white hover:underline">About</li>
                <li className="space-game text-white hover:underline">Projects</li>
                <li className="space-game text-white hover:underline">Contact</li>
                <li className="space-game text-white hover:underline">Experience</li>
            </ul>
        </nav>
    );
}

export default NavBar;