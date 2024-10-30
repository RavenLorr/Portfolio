import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import { ResponsiveUtils } from '@/utils/responsiveUtils.js';

class PageBuilder {
  constructor() {
    this.title = '';
    this.content = null;
    this.responsiveData = { fontSize: 16, scale: 1 };
    this.padding = 80;
    this.marginBottom = 12;
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
    this.padding = padding
    return this;
  }

  setMarginbottom(marginBottom) {
    this.marginBottom = marginBottom
    return this;
  }

  build() {
    const BuilderComponent = () => {
      useEffect(() => {
        const updateResponsiveness = () => {
          ResponsiveUtils.updateRootFontSize();
          const { fontSize, scale } = ResponsiveUtils.getScalingFactor();
          this.responsiveData = { fontSize, scale };
        };

        updateResponsiveness();
        window.addEventListener('resize', updateResponsiveness);

        return () => window.removeEventListener('resize', updateResponsiveness);
      }, []);

      return (
        <div className="relative min-h-screen flex justify-center"
             style={{ fontSize: 'var(--root-font-size, 16px)', padding: `${this.padding * this.responsiveData.scale}px` }}>
          <div className="w-4/5 max-w-6xl">
            <motion.h1
              className={`text-6xl font-space-game font-bold text-center mb-${this.marginBottom} text-white`}
              initial={{opacity: 0, y: -50}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
              style={{ fontSize: `${3 * this.responsiveData.scale}rem` }}
            >
              {this.title}
            </motion.h1>
            {React.isValidElement(this.content)
              ? React.cloneElement(this.content, { ...this.responsiveData })
              : typeof this.content === 'function'
                ? this.content(this.responsiveData)
                : this.content}
          </div>
        </div>
      );
    };

    return <BuilderComponent />;
  }
}

export default PageBuilder;