import React from 'react';

import { useLanguage } from '@/context/LanguageContext.jsx';
import { usePageBuilder } from '@/context/PageBuilderContext.jsx';

const withPageBuilder = (WrappedComponent, dataSelector, marginBottom = 80, padding = 48) => {
  return function PageBuilderComponent() {
    const pageBuilder = usePageBuilder();
    const { language } = useLanguage();
    const data = dataSelector(language);

    pageBuilder.setTitle(data.title);
    pageBuilder.setContent(WrappedComponent);
    pageBuilder.setMarginbottom(marginBottom);
    pageBuilder.setPadding(padding);

    const BuilderComponent = pageBuilder.build();
    return <BuilderComponent />;
  };
};

export default withPageBuilder;
