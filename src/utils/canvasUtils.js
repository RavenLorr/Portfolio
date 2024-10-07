export const calculateBaseRadiusAndCenter = (canvas) => {
    const baseRadius = Math.min(1920, 1080) * 0.30;
    const ringCenterX = canvas.width / 2;
    const ringCenterY = canvas.height / 2;
    return { baseRadius, ringCenterX, ringCenterY };
};