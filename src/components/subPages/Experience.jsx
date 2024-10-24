import React, { useState, useCallback, useMemo } from 'react';
import { Section, TimelineList, YearLine, MobileWarning } from '../../utils/responsiveComponents.jsx';
import { useResponsiveAdjustments } from '../../hooks/useResponsiveAdjustments.js';

function Experience() {
    const [selectedEndYear, setSelectedEndYear] = useState(null);
    const responsiveAdjustments = useResponsiveAdjustments();

    const experience = useMemo(() => [
        { startYear: 2015, endYear: 2018, title: "Lorem ipsum dolor", subtitle: "Sit amet consectetur", color: "bg-blue-500" },
        { startYear: 2018, endYear: 2021, title: "Ipsum dolor sit", subtitle: "Amet elit sed", color: "bg-green-500" },
        { startYear: 2021, endYear: 2025, title: "Dolor sit amet", subtitle: "Consectetur adipiscing elit", color: "bg-purple-500" },
    ], []);

    const education = useMemo(() => [
        { startYear: 2015, endYear: 2019, title: "Lorem ipsum dolor", subtitle: "Sit amet consectetur adipiscing", color: "bg-orange-500" },
        { startYear: 2016, endYear: 2020, title: "Ipsum dolor sit", subtitle: "Amet elit sed do eiusmod", color: "bg-blue-500" },
        { startYear: 2020, endYear: 2022, title: "Dolor sit amet", subtitle: "Consectetur adipiscing elit sed", color: "bg-red-500" },
        { startYear: 2023, endYear: 2025, title: "Sit amet consectetur", subtitle: "Lorem ipsum dolor adipiscing", color: "bg-teal-500" },
    ], []);

    const years = useMemo(() => [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], []);

    const handleEventHover = useCallback((endYear) => {
        setSelectedEndYear(endYear);
    }, []);

    const handleEventLeave = useCallback(() => {
        setSelectedEndYear(null);
    }, []);

    if (!responsiveAdjustments) return null;

    const { isMobile, scalingFactor } = responsiveAdjustments;

    return (
        <div className="relative font-sans text-white min-h-screen flex flex-col justify-center items-center p-2 sm:p-5 box-border">
            <Section
                title="Professional Experience"
                isMobile={isMobile}
                scalingFactor={scalingFactor}
            >
                <TimelineList
                    events={experience}
                    onHover={handleEventHover}
                    onLeave={handleEventLeave}
                    isMobile={isMobile}
                    scalingFactor={scalingFactor}
                />
            </Section>

            <YearLine
                selectedEndYear={selectedEndYear}
                years={years}
                isMobile={isMobile}
                scalingFactor={scalingFactor}
            />

            <Section
                title="Education"
                isMobile={isMobile}
                scalingFactor={scalingFactor}
            >
                <TimelineList
                    events={education}
                    onHover={handleEventHover}
                    onLeave={handleEventLeave}
                    isMobile={isMobile}
                    scalingFactor={scalingFactor}
                />
            </Section>

            {isMobile && <MobileWarning />}
        </div>
    );
}

export default Experience;