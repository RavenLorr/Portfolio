import React from 'react';
import '../style/experience.css';

const TimelineEvent = ({ startYear, endYear, title, subtitle, color, verticalPosition }) => {
    const width = `${(endYear - startYear) * 10}%`;
    const left = `${(startYear - 2015) * 10}%`;
    const titleTop = `${verticalPosition}px`;
    const subtitleTop = `${verticalPosition + 20}px`;

    return (
        <li className="timeline-event" style={{ width, left, top: `${verticalPosition * 15}px` }}>
            <div className={`event-bar ${color}`}></div>
            <div className="event-content">
                <h3 className="event-title" style={{ top: titleTop }}>{title}</h3>
                <p className="event-subtitle" style={{ top: subtitleTop }}>{subtitle}</p>
            </div>
        </li>
    );
};

const YearMarker = ({ year }) => (
    <li className="year-marker" style={{ left: `${(year - 2015) * 10}%` }}>
        {year}
    </li>
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
                <h2 className="timeline-section-title">Professional Experience</h2>
                <ul className="timeline-events">
                    {experience.map((event, index) => (
                        <TimelineEvent key={index} {...event} verticalPosition={index}/>
                    ))}
                </ul>
            </div>

            <ul className="timeline-years">
                {years.map((year) => (
                    <YearMarker key={year} year={year}/>
                ))}
            </ul>

            <div className="timeline">
                <h2 className="timeline-section-title">Education</h2>
                <ul className="timeline-events">
                    {education.map((event, index) => (
                        <TimelineEvent key={index} {...event} verticalPosition={index}/>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default Experience;