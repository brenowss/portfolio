import Image from 'next/image';
import GithubIcon from '../../../../public/icons/github.svg';
import InstagramIcon from '../../../../public/icons/instagram.svg';
import LinkedInIcon from '../../../../public/icons/linkedin.svg';

interface SocialLinkProps {
  href: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
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
  );
};

export default function Socials() {
  return (
    <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
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
    </ul>
  );
}
