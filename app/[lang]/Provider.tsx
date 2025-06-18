'use client'

import { createContext, useState } from 'react'

interface PageProps {
  children: React.ReactNode
}

export type CurrentSection = 'about' | 'experience' | 'projects'
export const NavigationContext = createContext({
  currentSection: 'about',
  setCurrentSection: (section: CurrentSection) => {},
})

export default function Provider({ children }: PageProps) {
  const [currentSection, setCurrentSection] = useState<CurrentSection>('about')

  return (
    <NavigationContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </NavigationContext.Provider>
  )
}
