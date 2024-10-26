import React, { useState, useCallback } from 'react';

import { experience, education, years } from '@/data/experienceData.js';
import { useResponsiveAdjustments } from '@/hooks/useResponsiveAdjustments.js';
import { Section, TimelineList, YearLine, MobileWarning } from '@/utils/responsiveComponents.jsx';

function Experience() {
    const [selectedEndYear, setSelectedEndYear] = useState(null);
    const responsiveAdjustments = useResponsiveAdjustments();

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