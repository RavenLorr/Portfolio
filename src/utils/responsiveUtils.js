export class ResponsiveUtils {
    static getScalingFactor() {
        const width = window.innerWidth;
        if (width >= 7680) { // 8K
            return { fontSize: 48, scale: 2.5 };
        } else if (width >= 5120) { // 5K
            return { fontSize: 32, scale: 2 };
        } else if (width >= 3840) { // 4K
            return { fontSize: 24, scale: 1.5 };
        } else if (width >= 2560) { // 2K
            return { fontSize: 20, scale: 1.25 };
        } else if (width >= 1920) { // Full HD
            return { fontSize: 16, scale: 1 };
        } else {
            return { fontSize: 16, scale: 1 };
        }
    }

    static updateRootFontSize() {
        const { fontSize } = this.getScalingFactor();
        document.documentElement.style.setProperty('--root-font-size', `${fontSize}px`);
    }
}