'use client'

import { createContext, useState } from 'react'

interface PageProps {
  children: React.ReactNode
}

export const NavigationContext = createContext({
  currentSection: 'about',
  setCurrentSection: (section: 'about' | 'experience' | 'projects') => {},
})

export type CurrentSection = 'about' | 'experience' | 'projects'
export default function Provider({ children }: PageProps) {
  const [currentSection, setCurrentSection] = useState<CurrentSection>('about')

  return (
    <NavigationContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </NavigationContext.Provider>
  )
}
