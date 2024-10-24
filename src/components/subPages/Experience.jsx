import React from 'react';
import { motion } from 'framer-motion';

const TimelineEvent = ({ startYear, endYear, title, subtitle, color, verticalPosition }) => {
    const width = `${(endYear - startYear) * 10}%`;
    const left = `${(startYear - 2015) * 10}%`;

    return (
        <li
            className="absolute z-40 transition-all duration-300 ease-in-out group"
            style={{ width, left, top: `${verticalPosition * 18}px` }}
        >
            <div className={`h-[15px] rounded-md transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden ${color} event-bar`}>
                <h3 className="text-sm m-0 whitespace-nowrap overflow-hidden text-ellipsis text-center">{title}</h3>
            </div>
            <p className="text-xs mt-[5px] mb-0 opacity-0 whitespace-nowrap overflow-hidden text-ellipsis text-center transition-opacity duration-300 ease-in-out group-hover:opacity-100">{subtitle}</p>
        </li>
    );
};

const YearMarker = ({ year }) => (
    <motion.li
        className="absolute top-[10px] text-xs transform -translate-x-1/2"
        style={{ left: `${(year - 2015) * 10}%` }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        {year}
    </motion.li>
);

function Experience() {
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

    return (
        <div className="relative font-sans text-white min-h-screen flex flex-col justify-center items-center p-5 box-border">
            <div className="w-full max-w-[1000px]">
                <motion.h2
                    className="text-2xl mb-5 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Professional Experience
                </motion.h2>
                <motion.ul
                    className="relative h-[120px] list-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {experience.map((event, index) => (
                        <TimelineEvent
                            key={index}
                            {...event}
                            verticalPosition={index}
                        />
                    ))}
                </motion.ul>
            </div>

            <ul className="relative h-[50px] list-none border-t border-gray-600 w-full max-w-[1000px]">
                {years.map((year) => (
                    <YearMarker key={year} year={year} />
                ))}
            </ul>

            <div className="w-full max-w-[1000px]">
                <motion.h2
                    className="text-2xl mb-5 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Education
                </motion.h2>
                <motion.ul
                    className="relative h-[120px] list-none"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {education.map((event, index) => (
                        <TimelineEvent
                            key={index}
                            {...event}
                            verticalPosition={index}
                        />
                    ))}
                </motion.ul>
            </div>
        </div>
    );
}

export default Experience;