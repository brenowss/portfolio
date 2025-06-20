import React from 'react'

interface ExperienceCardProps {
  date: string
  title: string
  company: string
  companyUrl?: string
  position: string
  description: string
  technologies: string[]
}

export default function ExperienceCard({
  date,
  title,
  company,
  companyUrl,
  position,
  description,
  technologies,
}: ExperienceCardProps) {
  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:opacity-100!">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
      <header
        className="z-10 mt-1 mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase sm:col-span-2"
        aria-label={date}
      >
        {date}
      </header>
      <div className="z-10 sm:col-span-6">
        <h3 className="leading-snug font-medium text-slate-200">
          <div>
            {companyUrl ? (
              <a
                className="group/link inline-flex items-baseline text-base leading-tight font-medium text-slate-200 hover:text-purple-300 focus-visible:text-purple-300"
                href={companyUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded-sm md:-inset-x-6 md:-inset-y-4 lg:block" />
                <span>
                  {title} @{' '}
                  <span className="inline-block">
                    {company}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 motion-reduce:transition-none"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </span>
              </a>
            ) : (
              <span className="inline-flex items-baseline text-base leading-tight font-medium text-slate-200 hover:text-purple-300 focus-visible:text-purple-300">
                <span>
                  {title} @ {company}
                </span>
              </span>
            )}
          </div>
          <div className="text-sm text-slate-500">{position}</div>
        </h3>

        <p className="prose prose-invert prose-p:m-0 mt-2 max-w-none text-sm leading-relaxed text-slate-300">
          {description}
        </p>

        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
          {technologies.map((technology) => (
            <li className="mt-2 mr-1.5" key={technology}>
              <div className="flex items-center rounded-full bg-purple-400/10 px-3 py-1 text-xs leading-5 font-medium text-purple-300">
                {technology}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
