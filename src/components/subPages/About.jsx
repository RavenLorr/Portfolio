import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaLanguage, FaRunning, FaCamera, FaPencilAlt, FaFlag } from 'react-icons/fa';

function About() {
    const [activeTab, setActiveTab] = useState('basics');

    const tabContent = {
        basics: {
            icon: <FaUser />,
            title: "The Basics",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum."
        },
        sport: {
            icon: <FaRunning />,
            title: "Sport",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
        },
        photography: {
            icon: <FaCamera />,
            title: "Photography",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non lorem diam."
        },
        drawing: {
            icon: <FaPencilAlt />,
            title: "Drawing",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem."
        },
        goals: {
            icon: <FaFlag />,
            title: "Goals",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis."
        }
    };

    return (
        <div className="relative min-h-screen flex justify-center">
            <div className="w-4/5 max-w-4xl">
                <div className="relative top-1/4">
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
                            >
                                {tabContent[tab].icon}
                                <span className="ml-2">{tabContent[tab].title}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
                <div className="relative top-1/4">
                    <motion.div
                        className="bg-black bg-opacity-40 p-8 rounded-lg backdrop-filter backdrop-blur-sm text-white mt-20"
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.3}}
                    >
                        <div className="w-full">
                            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                                {tabContent[activeTab].icon}
                                <span className="ml-2">{tabContent[activeTab].title}</span>
                            </h2>
                            <p className="text-lg text-center">{tabContent[activeTab].content}</p>

                            {activeTab === 'basics' && (
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="flex items-center justify-center">
                                        <FaMapMarkerAlt className="mr-2"/>
                                        <span>Location: Your City, Country</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <FaLanguage className="mr-2"/>
                                        <span>Languages: English, French</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default About;