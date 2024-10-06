import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-blue-600 p-4 text-white">
            <nav className="flex justify-between">
                <h1 className="text-2xl font-bold">My Portfolio</h1>
                <div>
                    <Link to="/" className="mr-4">Home</Link>
                    <Link to="/about" className="mr-4">About</Link>
                    <Link to="/projects" className="mr-4">Projects</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;