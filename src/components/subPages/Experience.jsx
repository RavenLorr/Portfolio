import React, { useState, useCallback } from 'react';

import {
  Section,
  TimelineList,
  YearLine,
  MobileWarning,
} from '@/components/builder/responsiveComponents.jsx';
import withPageBuilder from '@/components/hoc/withPageBuilder.jsx';
import { useLanguage } from '@/context/LanguageContext';
import { experienceData } from '@/data/experienceData';
import { useResponsiveAdjustments } from '@/hooks/useResponsiveAdjustments';

function ExperienceContent() {
  const { language } = useLanguage();
  const [selectedEndYear, setSelectedEndYear] = useState(null);
  const responsiveAdjustments = useResponsiveAdjustments();

  const handleEventHover = useCallback(endYear => {
    setSelectedEndYear(endYear);
  }, []);

  const handleEventLeave = useCallback(() => {
    setSelectedEndYear(null);
  }, []);

  if (!responsiveAdjustments) return null;

  const { isMobile, scalingFactor } = responsiveAdjustments;
  const data = experienceData[language];

  return (
    <div className="relative font-sans text-white min-h-screen flex flex-col justify-evenly items-center p-2 sm:p-5 box-border">
      <Section title={data.experienceTitle} isMobile={isMobile} scalingFactor={scalingFactor}>
        <TimelineList
          events={data.experience}
          onHover={handleEventHover}
          onLeave={handleEventLeave}
          isMobile={isMobile}
          scalingFactor={scalingFactor}
        />
      </Section>

      <YearLine
        selectedEndYear={selectedEndYear}
        years={experienceData.years}
        isMobile={isMobile}
        scalingFactor={scalingFactor}
      />

      <Section title="Education" isMobile={isMobile} scalingFactor={scalingFactor}>
        <TimelineList
          events={data.education}
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

const Experience = withPageBuilder(ExperienceContent, language => experienceData[language], 0, 0);
export default Experience;
