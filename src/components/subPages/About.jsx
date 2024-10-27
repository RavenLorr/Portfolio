import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';

import { tabContent } from '@/data/aboutData.js';
import { ResponsiveUtils } from '@/utils/responsiveUtils.js';

function About() {
    const [activeTab, setActiveTab] = useState('basics');
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            ResponsiveUtils.updateRootFontSize();
            const { scale } = ResponsiveUtils.getScalingFactor();
            setScale(scale);
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <div className="relative min-h-screen flex justify-center items-center" style={{ fontSize: 'var(--root-font-size, 16px)' }}>
            <div className="w-4/5 max-w-6xl">
                <motion.h1
                    className="text-6xl font-space-game font-bold text-center mb-12 text-white"
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    About Me
                </motion.h1>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {Object.keys(tabContent).map((tab) => (
                        <motion.button
                            key={tab}
                            className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition-colors duration-200 text-white`}
                            onClick={() => setActiveTab(tab)}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            style={{ fontSize: `${1.25 * scale}rem` }}
                        >
                            {React.createElement(tabContent[tab].icon)}
                            <span className="ml-2">{tabContent[tab].title}</span>
                        </motion.button>
                    ))}
                </div>

                <motion.div
                    className="bg-black bg-opacity-40 p-8 rounded-lg backdrop-filter backdrop-blur-sm text-white mt-8"
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.3}}
                >
                    <div className="w-full">
                        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center" style={{fontSize: `${2 * scale}rem`}}>
                            {React.createElement(tabContent[activeTab].icon)}
                            <span className="ml-2">{tabContent[activeTab].title}</span>
                        </h2>
                        <p className="text-lg text-center"
                           style={{fontSize: `${1.25 * scale}rem`}}>{tabContent[activeTab].content}</p>

                        {activeTab === 'basics' && (
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="flex items-center justify-center"
                                     style={{fontSize: `${1.25 * scale}rem`}}>
                                    <FaMapMarkerAlt className="mr-2"/>
                                    <span>Location: Your City, Country</span>
                                </div>
                                <div className="flex items-center justify-center"
                                     style={{fontSize: `${1.25 * scale}rem`}}>
                                    <FaLanguage className="mr-2"/>
                                    <span>Languages: English, French</span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default About;