import {motion} from 'framer-motion';
import React, {useState, useEffect} from 'react';

import withPageBuilder from '@/components/hoc/withPageBuilder.jsx';
import {useLanguage} from '@/context/LanguageContext';
import {projectsData} from '@/data/projectsData.js';

const ProjectsContent = ({scale}) => {
    const {language} = useLanguage();
    const [activeTag, setActiveTag] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const data = projectsData[language];
    const allTags = ['All', ...new Set(data.projects.flatMap(project => project.tags))];

    useEffect(() => {
        setFilteredProjects(
            activeTag === 'All'
                ? data.projects
                : data.projects.filter(project => project.tags.includes(activeTag))
        );
    }, [activeTag, data.projects]);

    const isValidUrl = (url) => url && url.startsWith('http');

    const renderLink = (link, defaultText, className) => {
        if (isValidUrl(link)) {
            return (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${className} text-white px-4 py-2 rounded`}
                    style={{fontSize: `${scale}rem`}}
                >
                    {defaultText}
                </a>
            );
        }
        return (
            <span
                className={`${className} text-white px-4 py-2 rounded cursor-not-allowed`}
                style={{fontSize: `${scale}rem`}}
            >
        {link || defaultText}
      </span>
        );
    };

    return (
        <>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {allTags.map(tag => (
                    <motion.button
                        key={tag}
                        className={`px-4 py-2 rounded-full ${
                            activeTag === tag ? 'bg-blue-600' : 'bg-gray-700'
                        } hover:bg-blue-500 transition-colors duration-200 text-white`}
                        onClick={() => setActiveTag(tag)}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        style={{fontSize: `${1.25 * scale}rem`}}
                    >
                        {tag}
                    </motion.button>
                ))}
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.3}}
            >
                {filteredProjects.map(project => (
                    <motion.div
                        key={project.id}
                        className="bg-black bg-opacity-40 rounded-lg overflow-hidden backdrop-filter backdrop-blur-sm"
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.2}}
                    >
                        <div className="relative">
                            <img src={project.image} alt={project.name} className="w-full h-48 object-cover"/>
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-white text-center p-4">
                                    <h3
                                        className="text-xl font-semibold mb-2"
                                        style={{fontSize: `${1.5 * scale}rem`}}
                                    >
                                        {project.name}
                                    </h3>
                                    <p className="text-sm mb-4" style={{fontSize: `${scale}rem`}}>
                                        {project.description}
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <div className="flex justify-center space-x-4">
                                            {renderLink(project.liveLink, 'Show', isValidUrl(project.liveLink) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600')}
                                            {renderLink(project.codeLink, 'Code', isValidUrl(project.codeLink) ? 'bg-gray-700 hover:bg-gray-800' : 'bg-red-700 hover:bg-red-800')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <ul className="flex flex-wrap">
                                {project.tags.map(tag => (
                                    <li
                                        key={tag}
                                        className="bg-gray-700 text-white text-xs px-2 py-1 rounded mr-2 mb-2"
                                        style={{fontSize: `${0.75 * scale}rem`}}
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

const Projects = withPageBuilder(ProjectsContent, language => projectsData[language], 80, 48);
export default Projects;
