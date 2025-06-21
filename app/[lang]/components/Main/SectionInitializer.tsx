'use client'

import { useEffect, useContext } from 'react'
import { CurrentSection, NavigationContext } from '../../Provider'

export default function SectionInitializer() {
  const { setCurrentSection } = useContext(NavigationContext)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && ['about', 'experience', 'projects'].includes(hash)) {
      setCurrentSection(hash as CurrentSection)
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [setCurrentSection])

  return null
}
