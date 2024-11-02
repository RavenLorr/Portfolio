import React, { createContext, useContext, useRef } from 'react';

import PageBuilder from '@/components/builder/PageBuilder.jsx';

const PageBuilderContext = createContext(null);

export function PageBuilderProvider({ children }) {
  const builderRef = useRef(new PageBuilder());
  return (
    <PageBuilderContext.Provider value={builderRef.current}>{children}</PageBuilderContext.Provider>
  );
}

export const usePageBuilder = () => useContext(PageBuilderContext);
