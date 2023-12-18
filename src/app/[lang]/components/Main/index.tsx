import { useContext } from 'react';
import { NavigationContext } from '../../page';
import { InView } from 'react-intersection-observer';
import { useTranslation } from '../../../i18n/client';
import { BasePage } from '@customTypes/BasePage';
import ExperienceCard from './ExperienceCard';
import { experiences } from './experiences.json';

interface MainProps extends BasePage {}

export default function Main({ params: { lang } }: MainProps) {
  const { setCurrentSection } = useContext(NavigationContext);

  const { t } = useTranslation(lang, 'translation');
  const { t: tExperience } = useTranslation(lang, 'experiences');

  return (
    <main className="lg:w-1/2">
      <InView
        as="section"
        className="min-h-screen py-12 flex flex-col justify-center scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        id="about"
        onChange={(inView) => inView && setCurrentSection('about')}
      >
        <h2 className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          {t('about.sectionTitle')}
        </h2>
        <p dangerouslySetInnerHTML={{ __html: t('about.text') }} />
      </InView>

      <InView
        as="section"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        id="experience"
        onChange={(inView) => inView && setCurrentSection('experience')}
      >
        <h2 className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          {t('experience.sectionTitle')}
        </h2>

        <ol className="group/list">
          {experiences.map((experience) => (
            <li key={experience.date} className="mb-12">
              <ExperienceCard
                date={experience.date}
                title={experience.position}
                company={experience.company}
                companyUrl={experience.companyUrl}
                position={experience.position}
                description={experience.description}
                technologies={experience.technologies}
              />
            </li>
          ))}
        </ol>
      </InView>

      <InView
        as="section"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        id="projects"
        onChange={(inView) => inView && setCurrentSection('projects')}
      >
        <h2>projects</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
          elit libero, a pharetra augue. Sed posuere consectetur est at
          lobortis. Sed posuere consectetur est at lobortis. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a
          pharetra augue. Sed posuere consectetur est at lobortis. Sed posuere
          consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla vitae elit libero, a pharetra augue. Sed
          posuere consectetur est at lobortis. Sed posuere consectetur est at
          lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est
          at lobortis. Sed posuere consectetur est at lobortis. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero,
          a pharetra augue. Sed posuere consectetur est at lobortis. Sed posuere
          consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla vitae elit libero, a pharetra augue. Sed
          posuere consectetur est at lobortis. Sed posuere consectetur est at
          lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est
          at lobortis. Sed posuere consectetur est at lobortis. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero,
          a pharetra augue. Sed posuere consectetur est at lobortis. Sed posuere
          consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla vitae elit libero, a pharetra augue. Sed
          posuere consectetur est at lobortis. Sed posuere consectetur est at
          lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est
          at lobortis. Sed posuere consectetur est at lobortis. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero,
          a pharetra augue. Sed posuere consectetur est at lobortis. Sed posuere
          consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla vitae elit libero, a pharetra augue. Sed
          posuere consectetur est at lobortis. Sed posuere consectetur est at
          lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est
          at lobortis. Sed posuere consectetur est at lobortis. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero,
          a pharetra augue. Sed posuere consectetur est at lobortis. Sed posuere
          consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla vitae elit libero, a pharetra augue. Sed
          posuere consectetur est at lobortis. Sed posuere consectetur est at
          lobortis.
        </p>
      </InView>
    </main>
  );
}
