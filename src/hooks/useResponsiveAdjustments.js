import { useState, useEffect, useCallback } from 'react';

import { CanvasUtils } from '../utils/canvasUtils.js';

export const useResponsiveAdjustments = () => {
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

    return responsiveAdjustments;
};