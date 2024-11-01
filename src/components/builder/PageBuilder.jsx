import React, {useEffect, useState} from 'react';

import {CanvasUtils} from '@/utils/canvasUtils.js';
import {ResponsiveUtils} from '@/utils/responsiveUtils.js';

class PageBuilder {
    constructor() {
        this.canvas = document.createElement('canvas');
        CanvasUtils.setCanvasDimensions(this.canvas);
        this.Adjustments = CanvasUtils.getResponsiveAdjustments(this.canvas);

        this.title = '';
        this.content = null;
        this.responsiveData = {fontSize: 16, scale: 1};
        this.padding = 80;
        this.marginBottom = 48;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setContent(content) {
        this.content = content;
        return this;
    }

    setPadding(padding) {
        this.padding = padding;
        return this;
    }

    setMarginbottom(marginBottom) {
        this.marginBottom = marginBottom;
        return this;
    }

    build() {
        const Content = this.content;

        return () => {
            const [adjustments, setAdjustments] = useState(this.Adjustments);
            const [responsiveData, setResponsiveData] = useState(this.responsiveData);

            useEffect(() => {
                const updateResponsiveness = () => {
                    ResponsiveUtils.updateRootFontSize();
                    const newData = ResponsiveUtils.getScalingFactor();
                    setResponsiveData(newData);

                    CanvasUtils.setCanvasDimensions(this.canvas);
                    setAdjustments(CanvasUtils.getResponsiveAdjustments(this.canvas));
                };

                updateResponsiveness();
                window.addEventListener('resize', updateResponsiveness);

                return () => window.removeEventListener('resize', updateResponsiveness);
            }, []);

            return (
                <div
                    className="relative min-h-screen flex justify-center"
                    style={{
                        fontSize: 'var(--root-font-size, 16px)',
                        padding: adjustments.isPortrait ? '0px' : `${this.padding * responsiveData.scale}px`,
                        marginTop: adjustments.isPortrait ? `${this.padding * responsiveData.scale}px` : '0px'
                    }}
                >
                    <div className="" style={{width: adjustments.isPortrait ? '95%' : '75%'}}>
                        <h1
                            className="text-6xl font-space-game font-bold text-center text-white"
                            style={{
                                fontSize: `${3 * responsiveData.scale}rem`,
                                marginBottom: `${this.marginBottom * responsiveData.scale}px`
                            }}
                        >
                            {this.title}
                        </h1>
                        {Content && <Content {...responsiveData} />}
                    </div>
                </div>
            );
        };
    }
}

export default PageBuilder;