import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CanvasUtils } from '../../utils/canvasUtils';

const TimelineEvent = ({ startYear, endYear, title, subtitle, color, verticalPosition, onHover, onLeave, isMobile, scalingFactor }) => {
    const width = `${(endYear - startYear) * 10}%`;
    const left = `${(startYear - 2015) * 10}%`;

    return (
        <li
            className="absolute z-40 transition-all duration-300 ease-in-out group"
            style={{
                width,
                left,
                top: `${verticalPosition * (isMobile ? 20 : 26 * scalingFactor)}px`
            }}
            onMouseEnter={() => onHover(endYear)}
            onMouseLeave={onLeave}
        >
            <div className={`rounded-md transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden ${color} event-bar`}
                 style={{ height: isMobile ? '18px' : `${18 * scalingFactor}px` }}>
                <h3 className="m-0 whitespace-nowrap overflow-hidden text-ellipsis text-center"
                    style={{ fontSize: isMobile ? '12px' : `${12 * scalingFactor}px` }}>{title}</h3>
            </div>
            <p className="mt-[5px] mb-0 opacity-0 whitespace-nowrap overflow-hidden text-ellipsis text-center transition-opacity duration-300 ease-in-out group-hover:opacity-100"
               style={{ fontSize: isMobile ? '10px' : `${10 * scalingFactor}px` }}>{subtitle}</p>
        </li>
    );
};

const YearMarker = ({ year, isMobile, scalingFactor }) => (
    <motion.li
        className="absolute transform -translate-x-1/2"
        style={{
            left: `${(year - 2015) * 10}%`,
            top: isMobile ? '10px' : `${10 * scalingFactor}px`,
            fontSize: isMobile ? '12px' : `${12 * scalingFactor}px`
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        {isMobile && year % 2 !== 0 ? '' : year}
    </motion.li>
);

function Experience() {
    const [selectedEndYear, setSelectedEndYear] = useState(null);
    const [responsiveAdjustments, setResponsiveAdjustments] = useState(null);

    const handleResize = useCallback(() => {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const adjustments = CanvasUtils.getResponsiveAdjustments(canvas);
        const { baseRadius, ringCenterX, ringCenterY, scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvas);
        setResponsiveAdjustments({ ...adjustments, scalingFactor, baseRadius, ringCenterX, ringCenterY });
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const experience = [
        { startYear: 2015, endYear: 2018, title: "Lorem ipsum dolor", subtitle: "Sit amet consectetur", color: "bg-blue-500" },
        { startYear: 2018, endYear: 2021, title: "Ipsum dolor sit", subtitle: "Amet elit sed", color: "bg-green-500" },
        { startYear: 2021, endYear: 2025, title: "Dolor sit amet", subtitle: "Consectetur adipiscing elit", color: "bg-purple-500" },
    ];

    const education = [
        { startYear: 2015, endYear: 2019, title: "Lorem ipsum dolor", subtitle: "Sit amet consectetur adipiscing", color: "bg-orange-500" },
        { startYear: 2016, endYear: 2020, title: "Ipsum dolor sit", subtitle: "Amet elit sed do eiusmod", color: "bg-blue-500" },
        { startYear: 2020, endYear: 2022, title: "Dolor sit amet", subtitle: "Consectetur adipiscing elit sed", color: "bg-red-500" },
        { startYear: 2023, endYear: 2025, title: "Sit amet consectetur", subtitle: "Lorem ipsum dolor adipiscing", color: "bg-teal-500" },
    ];

    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    const handleEventHover = (endYear) => {
        setSelectedEndYear(endYear);
    };

    const handleEventLeave = () => {
        setSelectedEndYear(null);
    };

    if (!responsiveAdjustments) return null;

    const { isMobile, scalingFactor } = responsiveAdjustments;

    return (
        <div className="relative font-sans text-white min-h-screen flex flex-col justify-center items-center p-2 sm:p-5 box-border">
            {/* Professional Experience section */}
            <div className="w-full" style={{maxWidth: isMobile ? '1000px' : `${1000 * scalingFactor}px`}}>
                <motion.h2
                    className="font-space-game mb-3 sm:mb-5 text-center"
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    style={{fontSize: isMobile ? '24px' : `${24 * scalingFactor}px`}}
                >
                    Professional Experience
                </motion.h2>
                <motion.ul
                    className="relative list-none"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    style={{height: isMobile ? '90px' : `${120 * scalingFactor}px`}}
                >
                    {experience.map((event, index) => (
                        <TimelineEvent
                            key={index}
                            {...event}
                            verticalPosition={index}
                            onHover={() => handleEventHover(event.endYear)}
                            onLeave={handleEventLeave}
                            isMobile={isMobile}
                            scalingFactor={scalingFactor}
                        />
                    ))}
                </motion.ul>
            </div>

            {/* Year line */}
            <div className="relative w-full" style={{
                maxWidth: isMobile ? '1000px' : `${1000 * scalingFactor}px`,
                height: isMobile ? '40px' : `${50 * scalingFactor}px`
            }}>
                <div className="absolute top-0 left-0 w-full bg-gray-600" style={{
                    height: isMobile ? '1px' : `${Math.max(1, 1 * scalingFactor)}px`
                }}/>
                <div
                    className="absolute top-0 left-0 bg-white transition-all duration-500 ease-in-out"
                    style={{
                        width: selectedEndYear ? `${((selectedEndYear - 2015) / (2025 - 2015)) * 100}%` : '0%',
                        height: isMobile ? '1px' : `${Math.max(1, 1 * scalingFactor)}px`
                    }}
                />
                <ul className="relative list-none">
                    {years.map((year) => (
                        <YearMarker key={year} year={year} isMobile={isMobile} scalingFactor={scalingFactor}/>
                    ))}
                </ul>
            </div>

            {/* Education section */}
            <div className="w-full" style={{maxWidth: isMobile ? '1000px' : `${1000 * scalingFactor}px`}}>
                <motion.h2
                    className="font-space-game mb-3 sm:mb-5 text-center"
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    style={{fontSize: isMobile ? '24px' : `${24 * scalingFactor}px`}}
                >
                    Education
                </motion.h2>
                <motion.ul
                    className="relative list-none"
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    style={{height: isMobile ? '90px' : `${120 * scalingFactor}px`}}
                >
                    {education.map((event, index) => (
                        <TimelineEvent
                            key={index}
                            {...event}
                            verticalPosition={index}
                            onHover={() => handleEventHover(event.endYear)}
                            onLeave={handleEventLeave}
                            isMobile={isMobile}
                            scalingFactor={scalingFactor}
                        />
                    ))}
                </motion.ul>
            </div>
        </div>
    );
}

export default Experience;