'use client';

import { createContext, useState } from 'react';

import { BasePage } from '@customTypes/BasePage';
import Navigation from './components/Navigation';
import Main from './components/Main';

interface PageProps extends BasePage {}

export const NavigationContext = createContext({
  currentSection: 'about',
  setCurrentSection: (section: 'about' | 'experience' | 'projects') => {},
});

export type CurrentSection = 'about' | 'experience' | 'projects';
export default function Page({ params: { lang } }: PageProps) {
  const [currentSection, setCurrentSection] = useState<CurrentSection>('about');

  return (
    <NavigationContext.Provider value={{ currentSection, setCurrentSection }}>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Navigation
            params={{
              lang,
            }}
          />
          <Main
            params={{
              lang,
            }}
          />
        </div>
      </div>
    </NavigationContext.Provider>
  );
}
