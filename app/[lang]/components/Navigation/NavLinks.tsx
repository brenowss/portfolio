'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { NavigationContext } from '../../Provider'
import { getDictionary } from '../../../../get-dictionary'
import Link from 'next/link'
import Image from 'next/image'
import ArrowIcon from '../../../../public/icons/arrow-up-right.svg'
import clsx from 'clsx'
import NewBadge from '../NewBadge'

interface NavigationProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  isHome?: boolean
}

export default function NavLinks({
  dictionary,
  isHome = true,
}: NavigationProps) {
  const { currentSection } = useContext(NavigationContext)
  const [ballPosition, setBallPosition] = useState(0)
  const ballRef = useRef<HTMLDivElement>(null)

  function handleNavigateToSection(
    section: 'about' | 'experience' | 'projects'
  ) {
    if (!isHome) return
    const sectionElement = document.getElementById(section)
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (!isHome) return
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
  }, [currentSection, isHome])

  useEffect(() => {
    if (!isHome || !ballRef.current) return
    ballRef.current.style.transition =
      'top 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), box-shadow 0.3s ease-in-out'
    ballRef.current.style.top = `${ballPosition}px`
    ballRef.current.style.boxShadow = `0 0 10px rgba(255, 255, 255, 0.5)`
  }, [ballPosition, isHome])

  const renderNavItem = (
    section: 'about' | 'experience' | 'projects',
    text: string
  ) => {
    if (isHome) {
      return (
        <a
          key={section}
          onClick={(e) => {
            e.preventDefault()
            handleNavigateToSection(section)
          }}
          data-section={section}
          className="cursor-pointer text-lg font-medium tracking-tight text-slate-200 hover:text-slate-100"
        >
          {text}
        </a>
      )
    }

    return (
      <Link
        key={section}
        href={`/#${section}`}
        className={clsx(
          'cursor-pointer text-lg font-medium tracking-tight transition-all duration-300',
          isHome
            ? 'text-slate-200 hover:text-slate-100'
            : 'hover:drop-shadow-glow text-slate-300 hover:text-white'
        )}
      >
        {text}
      </Link>
    )
  }

  return (
    <div
      className={clsx(
        'relative flex gap-4',
        isHome
          ? 'flex-col max-lg:hidden'
          : 'flex-col items-center gap-6 md:flex-row md:justify-center md:gap-4'
      )}
    >
      {renderNavItem('about', dictionary.components.navigation.about)}
      {renderNavItem(
        'experience',
        dictionary.components.navigation.experiences
      )}
      {renderNavItem('projects', dictionary.components.navigation.projects)}
      <Link
        href="/devlog"
        className={clsx(
          'group relative flex cursor-pointer items-center text-lg font-medium tracking-tight transition-all duration-300',
          isHome
            ? 'text-slate-200 hover:text-slate-100'
            : 'hover:drop-shadow-glow text-slate-300 hover:text-white'
        )}
      >
        {isHome && <NewBadge />}
        {dictionary.components.navigation.devlog}
        <Image
          src={ArrowIcon}
          alt="External link"
          height={18}
          width={18}
          className={clsx(
            'mt-1 ml-2 opacity-10 transition-opacity duration-300 group-hover:opacity-100',
            !isHome && 'hidden'
          )}
        />
      </Link>
      {isHome && (
        <div
          ref={ballRef}
          className="absolute -left-6 h-4 w-4 rounded-full bg-slate-200"
          style={{ top: `${ballPosition}px` }}
        ></div>
      )}
    </div>
  )
}
