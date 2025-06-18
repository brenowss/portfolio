'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { NavigationContext } from '../../Provider'
import { getDictionary } from '../../../../get-dictionary'
import Link from 'next/link'
import Image from 'next/image'
import ArrowIcon from '../../../../public/icons/arrow-up-right.svg'

interface NavigationProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

export default function NavLinks({ dictionary }: NavigationProps) {
  const { currentSection } = useContext(NavigationContext)
  const [ballPosition, setBallPosition] = useState(0)
  const ballRef = useRef<HTMLDivElement>(null)

  function handleNavigateToSection(
    section: 'about' | 'experience' | 'projects'
  ) {
    const sectionElement = document.getElementById(section)
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    switch (currentSection) {
      case 'about':
        setBallPosition(6)
        break
      case 'experience':
        setBallPosition(50)
        break
      case 'projects':
        setBallPosition(94)
        break
    }
  }, [currentSection])

  useEffect(() => {
    if (ballRef.current) {
      ballRef.current.style.transition =
        'top 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), box-shadow 0.3s ease-in-out'
      ballRef.current.style.top = `${ballPosition}px`
      ballRef.current.style.boxShadow = `0 0 10px rgba(255, 255, 255, 0.5)`
    }
  }, [ballPosition])

  return (
    <div className="relative flex flex-col gap-4 max-lg:hidden">
      <a
        onClick={() => handleNavigateToSection('about')}
        className="cursor-pointer text-lg font-medium tracking-tight text-slate-200 hover:text-slate-100"
      >
        {dictionary.components.navigation.about}
      </a>
      <a
        onClick={() => handleNavigateToSection('experience')}
        className="cursor-pointer text-lg font-medium tracking-tight text-slate-200 hover:text-slate-100"
      >
        {dictionary.components.navigation.experiences}
      </a>
      <a
        onClick={() => handleNavigateToSection('projects')}
        className="cursor-pointer text-lg font-medium tracking-tight text-slate-200 hover:text-slate-100"
      >
        {dictionary.components.navigation.projects}
      </a>
      <Link
        href="/devlog"
        className="group flex cursor-pointer items-center text-lg font-medium tracking-tight text-slate-200 hover:text-slate-100"
      >
        {dictionary.components.navigation.devlog}
        <Image
          src={ArrowIcon}
          alt="External link"
          height={18}
          width={18}
          className="mt-1 opacity-10 transition-opacity group-hover:opacity-100"
        />
      </Link>
      <div
        ref={ballRef}
        className="absolute -left-6 h-4 w-4 rounded-full bg-slate-200"
        style={{ top: `${ballPosition}px` }}
      ></div>
    </div>
  )
}
