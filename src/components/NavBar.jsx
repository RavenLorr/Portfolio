import React from 'react';
import '../styles/NavBar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li className="nav-item">Home</li>
                <li className="nav-item">About</li>
                <li className="nav-item">Projects</li>
                <li className="nav-item">Contact</li>
            </ul>
        </nav>
    );
}

export default NavBar;