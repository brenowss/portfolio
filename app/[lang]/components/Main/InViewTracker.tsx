'use client'

import { useContext } from 'react'
import { InView } from 'react-intersection-observer'
import type { ReactNode } from 'react'
import { CurrentSection, NavigationContext } from '../../Provider'

interface SectionTrackerProps {
  id: CurrentSection
  children: ReactNode
  className?: string
}

export default function InViewTracker({
  id,
  children,
  className,
}: SectionTrackerProps) {
  const { setCurrentSection } = useContext(NavigationContext)

  return (
    <InView
      as="section"
      id={id}
      className={className}
      onChange={(inView) => inView && setCurrentSection(id)}
    >
      {children}
    </InView>
  )
}
