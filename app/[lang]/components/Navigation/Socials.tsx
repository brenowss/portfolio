'use client'

import Image from 'next/image'
import GithubIcon from '../../../../public/icons/github.svg'
import InstagramIcon from '../../../../public/icons/instagram.svg'
import LinkedInIcon from '../../../../public/icons/linkedin.svg'
import EmailIcon from '../../../../public/icons/email.svg'

interface SocialLinkProps {
  href: string
  label: string
  iconSrc: string
  iconAlt: string
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  label,
  iconSrc,
  iconAlt,
}) => {
  return (
    <a
      className="block hover:text-slate-200"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${label} (opens in a new tab)`}
    >
      <span className="sr-only">{label}</span>
      <Image
        src={iconSrc}
        alt={iconAlt}
        width="20"
        height="20"
        loading="lazy"
        decoding="async"
      />
    </a>
  )
}

const EmailButton: React.FC = () => {
  const handleCopyToClipboard = () => {
    const email = 'brenofiorese01@gmail.com'
    navigator.clipboard.writeText(email)
  }

  return (
    <button
      className="block hover:text-slate-200"
      onClick={handleCopyToClipboard}
      aria-label="Copy email to clipboard"
      title="Copy email to clipboard"
    >
      <span className="sr-only">Copy email to clipboard</span>
      <Image
        src={EmailIcon}
        alt="Email"
        width="20"
        height="20"
        loading="lazy"
        decoding="async"
      />
    </button>
  )
}

export default function Socials() {
  return (
    <ul className="mt-8 ml-1 flex items-center" aria-label="Social media">
      <li className="mr-5 text-xs">
        <SocialLink
          href="https://github.com/brenowss"
          label="GitHub"
          iconSrc={GithubIcon}
          iconAlt="GitHub"
        />
      </li>
      <li className="mr-5 text-xs">
        <SocialLink
          href="https://www.instagram.com/breno.dev"
          label="Instagram"
          iconSrc={InstagramIcon}
          iconAlt="Instagram"
        />
      </li>
      <li className="mr-5 text-xs">
        <SocialLink
          href="https://www.linkedin.com/in/breno-fiorese"
          label="LinkedIn"
          iconSrc={LinkedInIcon}
          iconAlt="LinkedIn"
        />
      </li>
      <li className="mr-5 text-xs">
        <EmailButton />
      </li>
    </ul>
  )
}
