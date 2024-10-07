export const calculateBaseRadiusAndCenter = (canvas) => {
    const referenceWidth = 1920;
    const referenceHeight = 1080;
    const scalingFactor = Math.min(canvas.width / referenceWidth, canvas.height / referenceHeight);
    const baseRadius = Math.min(referenceWidth, referenceHeight) * 0.30 * scalingFactor;
    const ringCenterX = canvas.width / 2;
    const ringCenterY = canvas.height / 2;
    return { baseRadius, ringCenterX, ringCenterY, scalingFactor };
};