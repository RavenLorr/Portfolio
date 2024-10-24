import React from 'react';
import '../style/experience.css';
import { motion } from 'framer-motion';

const TimelineEvent = ({ startYear, endYear, title, subtitle, color, verticalPosition }) => {
    const width = `${(endYear - startYear) * 10}%`;
    const left = `${(startYear - 2015) * 10}%`;

    return (
        <li
            className="timeline-event"
            style={{ width, left, top: `${verticalPosition * 26}px` }}
        >
            <div className={`event-bar ${color}`}>
                <h3 className="event-title">{title}</h3>
            </div>
            <p className="event-subtitle">{subtitle}</p>
        </li>
    );
};

const YearMarker = ({ year }) => (
    <motion.li
        className="year-marker"
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
        { startYear: 2015, endYear: 2018, title: "Lorem ipsum dolor", subtitle: "Sit amet consectetur", color: "blue" },
        { startYear: 2018, endYear: 2021, title: "Ipsum dolor sit", subtitle: "Amet elit sed", color: "green" },
        { startYear: 2021, endYear: 2025, title: "Dolor sit amet", subtitle: "Consectetur adipiscing elit", color: "purple" },
    ];

    const education = [
        { startYear: 2015, endYear: 2019, title: "Lorem ipsum dolor", subtitle: "Sit amet consectetur adipiscing", color: "orange" },
        { startYear: 2016, endYear: 2020, title: "Ipsum dolor sit", subtitle: "Amet elit sed do eiusmod", color: "blue" },
        { startYear: 2020, endYear: 2022, title: "Dolor sit amet", subtitle: "Consectetur adipiscing elit sed", color: "red" },
        { startYear: 2023, endYear: 2025, title: "Sit amet consectetur", subtitle: "Lorem ipsum dolor adipiscing", color: "teal" },
    ];

    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    return (
        <div className="timeline-container">
            <div className="timeline">
                <motion.h2
                    className="timeline-section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Professional Experience
                </motion.h2>
                <motion.ul
                    className="timeline-events"
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

            <ul className="timeline-years">
                {years.map((year) => (
                    <YearMarker key={year} year={year} />
                ))}
            </ul>

            <div className="timeline">
                <motion.h2
                    className="timeline-section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Education
                </motion.h2>
                <motion.ul
                    className="timeline-events"
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