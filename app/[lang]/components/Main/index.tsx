'use client'

import { useContext, useEffect } from 'react'
import { InView } from 'react-intersection-observer'
import ExperienceCard from './ExperienceCard'
import { getDictionary } from '../../../../get-dictionary'
import { NavigationContext, CurrentSection } from '../../Provider'
import ProjectCard from './ProjectCard'
import Caravaggio from './images/caravaggio.png'
import EsteriliMed from './images/esterilimed.png'
import HSFDA from './images/hsfda.png'
import MKBot from './images/mkbot.png'
import Fincheck from './images/fincheck.png'

interface MainProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  lang: 'pt' | 'en'
}

export default function Main({ dictionary, lang }: MainProps) {
  const { setCurrentSection } = useContext(NavigationContext)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && ['about', 'experience', 'projects'].includes(hash)) {
      setCurrentSection(hash as CurrentSection)
    }
  }, [setCurrentSection])

  const experiences = ['Mobiauto', 'Meta', 'Freelancer', 'Webde', 'Nucleo']
  const projects = [
    {
      name: 'Fincheck',
      imageSrc: Fincheck,
    },
    {
      name: 'MKBOT',
      imageSrc: MKBot,
    },
    {
      name: 'Caravaggio',
      imageSrc: Caravaggio,
    },
    {
      name: 'Esterili-med',
      imageSrc: EsteriliMed,
    },
    {
      name: 'HSFDA',
      imageSrc: HSFDA,
    },
  ]

  return (
    <main className="lg:w-1/2 lg:pb-24">
      <InView
        as="section"
        className="flex min-h-screen scroll-mt-16 flex-col justify-center py-12 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        id="about"
        onChange={(inView) => inView && setCurrentSection('about')}
      >
        <h2 className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 font-medium backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          {dictionary.sections.about}
        </h2>
        <p dangerouslySetInnerHTML={{ __html: dictionary.about.text }} />
      </InView>

      <InView
        as="section"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        id="experience"
        onChange={(inView) => inView && setCurrentSection('experience')}
      >
        <h2 className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 font-medium backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          {dictionary.sections.experiences}
        </h2>

        <ol className="group/list">
          {experiences.map((experience) => (
            <li key={experience} className="mb-12">
              <ExperienceCard
                date={
                  dictionary.experiences[
                    experience as keyof typeof dictionary.experiences
                  ].date
                }
                title={
                  dictionary.experiences[
                    experience as keyof typeof dictionary.experiences
                  ].position
                }
                company={
                  dictionary.experiences[
                    experience as keyof typeof dictionary.experiences
                  ].company
                }
                companyUrl={
                  dictionary.experiences[
                    experience as keyof typeof dictionary.experiences
                  ].companyUrl
                }
                position={
                  dictionary.experiences[
                    experience as keyof typeof dictionary.experiences
                  ].position
                }
                description={
                  dictionary.experiences[
                    experience as keyof typeof dictionary.experiences
                  ].description
                }
                technologies={
                  dictionary.experiences[
                    experience as keyof typeof dictionary.experiences
                  ].technologies
                }
              />
            </li>
          ))}
        </ol>

        <a
          className="group inline-flex items-center font-semibold leading-tight text-slate-200"
          aria-label="View Full Résumé"
          href={`/files/Breno_Fiorese(${lang}).docx`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="whitespace-nowrap">
            <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
              {dictionary.components.resume.viewFull}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </a>
      </InView>

      <InView
        as="section"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        id="projects"
        onChange={(inView) => inView && setCurrentSection('projects')}
      >
        <h2 className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 font-medium backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          {dictionary.sections.projects}
        </h2>

        <ul className="group/list">
          {projects.map((project) => (
            <ProjectCard
              title={project.name}
              imageSrc={project.imageSrc}
              technologies={
                dictionary.projects[
                  project.name as keyof typeof dictionary.projects
                ].technologies
              }
              description={
                dictionary.projects[
                  project.name as keyof typeof dictionary.projects
                ].description
              }
              link={
                dictionary.projects[
                  project.name as keyof typeof dictionary.projects
                ].url
              }
              imageAlt={project.name}
              key={project.name}
            />
          ))}
        </ul>
      </InView>

      <footer className="max-w-md text-sm text-slate-600 opacity-75 transition-opacity hover:opacity-100 sm:pb-0">
        <p
          dangerouslySetInnerHTML={{
            __html: dictionary.components.footer.inspiration,
          }}
        />
      </footer>
    </main>
  )
}
