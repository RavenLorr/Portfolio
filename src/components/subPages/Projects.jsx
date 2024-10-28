import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import { projects } from '@/data/projectsData.js';
import { ResponsiveUtils } from '@/utils/responsiveUtils.js';

const Projects = () => {
    const [activeTag, setActiveTag] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [scale, setScale] = useState(1);

    const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];

    useEffect(() => {
        const updateScale = () => {
            ResponsiveUtils.updateRootFontSize();
            setScale(ResponsiveUtils.getScalingFactor().scale);
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => window.removeEventListener('resize', updateScale);
    }, []);

    useEffect(() => {
        if (activeTag === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.tags.includes(activeTag)));
        }
    }, [activeTag]);

    return (
      <div className="relative min-h-screen flex justify-center"
           style={{ fontSize: 'var(--root-font-size, 16px)', padding: `${80 * scale}px` }}>
          <div className="w-4/5 max-w-6xl">
              <motion.h1
                className="text-6xl font-space-game font-bold text-center mb-12 text-white"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: `${3 * scale}rem` }}
              >
                  My Projects
              </motion.h1>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {allTags.map(tag => (
                    <motion.button
                      key={tag}
                      className={`px-4 py-2 rounded-full ${
                        activeTag === tag ? 'bg-blue-600' : 'bg-gray-700'
                      } hover:bg-blue-500 transition-colors duration-200 text-white`}
                      onClick={() => setActiveTag(tag)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontSize: `${1.25 * scale}rem` }}
                    >
                        {tag}
                    </motion.button>
                  ))}
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                  {filteredProjects.map(project => (
                    <motion.div
                      key={project.id}
                      className="bg-black bg-opacity-40 rounded-lg overflow-hidden backdrop-filter backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                        <div className="relative">
                            <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                            <div
                              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-white text-center p-4">
                                    <h3 className="text-xl font-semibold mb-2"
                                        style={{ fontSize: `${1.5 * scale}rem` }}>{project.name}</h3>
                                    <p className="text-sm mb-4"
                                       style={{ fontSize: `${scale}rem` }}>{project.description}</p>
                                    <div className="flex justify-center space-x-4">
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                                           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                           style={{ fontSize: `${scale}rem` }}>Show</a>
                                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer"
                                           className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                                           style={{ fontSize: `${scale}rem` }}>Code</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <ul className="flex flex-wrap">
                                {project.tags.map(tag => (
                                  <li key={tag} className="bg-gray-700 text-white text-xs px-2 py-1 rounded mr-2 mb-2"
                                      style={{ fontSize: `${0.75 * scale}rem` }}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                  ))}
              </motion.div>
          </div>
      </div>
    );
};

export default Projects;