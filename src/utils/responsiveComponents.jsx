import React from 'react';
import { motion } from 'framer-motion';

const TimelineEvent = React.memo(({ startYear, endYear, title, subtitle, color, verticalPosition, onHover, onLeave, isMobile, scalingFactor }) => {
    const width = `${(endYear - startYear) * 10}%`;
    const left = `${(startYear - 2015) * 10}%`;
    const topPosition = `${verticalPosition * (isMobile ? 20 : 26 * scalingFactor)}px`;

    return (
        <li
            className="absolute z-40 transition-all duration-300 ease-in-out group"
            style={{ width, left, top: topPosition }}
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
});

const YearMarker = React.memo(({ year, isMobile, scalingFactor }) => (
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
));

export const Section = ({ title, children, isMobile, scalingFactor }) => (
    <div className="w-full" style={{maxWidth: isMobile ? '1000px' : `${1000 * scalingFactor}px`}} role="region" aria-label={title}>
        <motion.h2
            className="font-space-game mb-3 sm:mb-5 text-center"
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            style={{fontSize: isMobile ? '24px' : `${24 * scalingFactor}px`}}
        >
            {title}
        </motion.h2>
        {children}
    </div>
);

export const TimelineList = ({ events, onHover, onLeave, isMobile, scalingFactor }) => (
    <motion.ul
        className="relative list-none"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        style={{height: isMobile ? '90px' : `${120 * scalingFactor}px`}}
    >
        {events.map((event, index) => (
            <TimelineEvent
                key={index}
                {...event}
                verticalPosition={index}
                onHover={() => onHover(event.endYear)}
                onLeave={onLeave}
                isMobile={isMobile}
                scalingFactor={scalingFactor}
            />
        ))}
    </motion.ul>
);

export const YearLine = ({ selectedEndYear, years, isMobile, scalingFactor }) => (
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
);

export const MobileWarning = () => (
    <div className="absolute bottom-0 w-full text-center p-2">
        <p className="text-xs text-gray-400">
            This page is limited on mobile. Consider opening it on a computer to get detailed information about my experience.
        </p>
    </div>
);