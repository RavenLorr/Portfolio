import React, { useState, useEffect } from 'react';

const projects = [
    {
        id: 1,
        name: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum.",
        image: "https://source.unsplash.com/random/800x600?sig=1",
        tags: ["Lorem", "Ipsum", "Dolor", "Sit"],
        liveLink: "https://example.com/lorem-ipsum-1",
        codeLink: "https://github.com/example/lorem-ipsum-1"
    },
    {
        id: 2,
        name: "Dolor Sit Amet",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        image: "https://source.unsplash.com/random/800x600?sig=2",
        tags: ["Consectetur", "Adipiscing", "Elit"],
        liveLink: "https://example.com/dolor-sit-amet",
        codeLink: "https://github.com/example/dolor-sit-amet"
    },
    {
        id: 3,
        name: "Consectetur Adipiscing",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "https://source.unsplash.com/random/800x600?sig=3",
        tags: ["Sed", "Eiusmod", "Tempor", "Incididunt"],
        liveLink: "https://example.com/consectetur-adipiscing",
        codeLink: "https://github.com/example/consectetur-adipiscing"
    },
    {
        id: 4,
        name: "Sed Do Eiusmod",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://source.unsplash.com/random/800x600?sig=4",
        tags: ["Ut", "Labore", "Dolore"],
        liveLink: "https://example.com/sed-do-eiusmod",
        codeLink: "https://github.com/example/sed-do-eiusmod"
    },
    {
        id: 5,
        name: "Ut Enim Ad Minim",
        description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "https://source.unsplash.com/random/800x600?sig=5",
        tags: ["Duis", "Aute", "Irure"],
        liveLink: "https://example.com/ut-enim-ad-minim",
        codeLink: "https://github.com/example/ut-enim-ad-minim"
    },
    {
        id: 6,
        name: "Duis Aute Irure",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://source.unsplash.com/random/800x600?sig=6",
        tags: ["Excepteur", "Sint", "Occaecat"],
        liveLink: "https://example.com/duis-aute-irure",
        codeLink: "https://github.com/example/duis-aute-irure"
    },
    {
        id: 7,
        name: "Excepteur Sint",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "https://source.unsplash.com/random/800x600?sig=7",
        tags: ["Quis", "Nostrud", "Exercitation"],
        liveLink: "https://example.com/excepteur-sint",
        codeLink: "https://github.com/example/excepteur-sint"
    },
    {
        id: 8,
        name: "Quis Nostrud",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "https://source.unsplash.com/random/800x600?sig=8",
        tags: ["Ullamco", "Laboris", "Nisi"],
        liveLink: "https://example.com/quis-nostrud",
        codeLink: "https://github.com/example/quis-nostrud"
    },
    {
        id: 9,
        name: "Ullamco Laboris",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://source.unsplash.com/random/800x600?sig=9",
        tags: ["Aliquip", "Commodo", "Consequat"],
        liveLink: "https://example.com/ullamco-laboris",
        codeLink: "https://github.com/example/ullamco-laboris"
    },
    {
        id: 10,
        name: "Aliquip Ex Ea",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://source.unsplash.com/random/800x600?sig=10",
        tags: ["Reprehenderit", "Voluptate", "Velit", "Esse"],
        liveLink: "https://example.com/aliquip-ex-ea",
        codeLink: "https://github.com/example/aliquip-ex-ea"
    },
    {
        id: 11,
        name: "Reprehenderit In",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "https://source.unsplash.com/random/800x600?sig=11",
        tags: ["Cillum", "Dolore", "Fugiat", "Pariatur"],
        liveLink: "https://example.com/reprehenderit-in",
        codeLink: "https://github.com/example/reprehenderit-in"
    }
];

const Projects = () => {
    const [activeTag, setActiveTag] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);

    const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];

    useEffect(() => {
        if (activeTag === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.tags.includes(activeTag)));
        }
    }, [activeTag]);

    return (
        <div className="container mx-auto px-4 pt-20"> {/* Added pt-20 for top padding */}
            <h1 className="font-space-game text-4xl font-bold text-center text-white mb-8">My Projects</h1>
            <ul className="flex flex-wrap justify-center mb-8">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        className={`m-1 px-4 py-2 rounded-md ${
                            activeTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setActiveTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </ul>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                    <li key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="relative">
                            <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-white text-center p-4">
                                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                                    <p className="text-sm mb-4">{project.description}</p>
                                    <div className="flex justify-center space-x-4">
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Show</a>
                                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Code</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <ul className="flex flex-wrap">
                                {project.tags.map(tag => (
                                    <li key={tag} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-2">{tag}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;