'use client'

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

interface PostCardProps {
  variant?: 'wide' | 'vertical'
  title: string
  excerpt: string
  coverImage: string
  href: string
  projectBadge: string
  extraBadges?: string[]
}

export default function PostCard({
  variant = 'wide',
  title,
  excerpt,
  coverImage,
  href,
  projectBadge,
  extraBadges = [],
}: PostCardProps) {
  const isWide = variant === 'wide'

  return (
    <Link
      href={href}
      className={clsx(
        'hover:shadow-glow group relative flex overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all hover:border-slate-700',
        isWide
          ? 'flex-col gap-6 p-4 md:flex-row md:p-6'
          : 'flex-col space-y-4 p-4'
      )}
    >
      <div
        className={clsx(
          'relative overflow-hidden rounded-xl',
          isWide
            ? 'aspect-video w-full min-w-[160px] md:w-1/3'
            : 'aspect-video w-full'
        )}
      >
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div
        className={clsx(
          'flex flex-1 flex-col justify-between gap-3',
          isWide && 'pr-2'
        )}
      >
        <h3 className="text-lg font-semibold text-slate-100 transition-colors group-hover:text-white">
          {title}
        </h3>

        <p className="line-clamp-3 text-sm text-slate-400">{excerpt}</p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            {projectBadge}
          </span>
          {extraBadges.map((badge, i) => (
            <span
              key={i}
              className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
