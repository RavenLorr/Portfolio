import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';

import PageBuilder from '@/components/builder/PageBuilder.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { aboutData } from '@/data/aboutData.js';

function About() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('basics');
  const data = aboutData[language];

  const renderTabContent = (scale) => (
    <motion.div
      className="bg-black bg-opacity-40 p-8 rounded-lg backdrop-filter backdrop-blur-sm text-white mt-8"
      initial={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}
    >
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center" style={{fontSize: `${2 * scale}rem`}}>
          {React.createElement(data.tabs[activeTab].icon)}
          <span className="ml-2">{data.tabs[activeTab].title}</span>
        </h2>
        <p className="text-lg text-center" style={{fontSize: `${1.25 * scale}rem`}}>
          {data.tabs[activeTab].content}
        </p>
        {activeTab === 'basics' && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center" style={{fontSize: `${1.25 * scale}rem`}}>
              <FaMapMarkerAlt className="mr-2"/>
              <span>{data.location}</span>
            </div>
            <div className="flex items-center justify-center" style={{fontSize: `${1.25 * scale}rem`}}>
              <FaLanguage className="mr-2"/>
              <span>{data.language}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const content = ({ scale }) => (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(data.tabs).map((tab) => (
          <motion.button
            key={tab}
            className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition-colors duration-200 text-white`}
            onClick={() => setActiveTab(tab)}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            style={{ fontSize: `${1.25 * scale}rem` }}
          >
            {React.createElement(data.tabs[tab].icon)}
            <span className="ml-2">{data.tabs[tab].title}</span>
          </motion.button>
        ))}
      </div>
      {renderTabContent(scale)}
    </>
  );

  const pageBuilder = new PageBuilder();
  pageBuilder.setTitle(data.title);
  pageBuilder.setContent(content);
  return pageBuilder.build();
}

export default About;