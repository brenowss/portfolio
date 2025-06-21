'use client'

import Image from 'next/image'
import EmailIcon from '../../../../public/icons/email.svg'

export function EmailButton() {
  const handleCopyToClipboard = () => {
    const email = 'brenofiorese01@gmail.com'
    navigator.clipboard.writeText(email)
  }

  return (
    <button
      className="block cursor-pointer hover:text-slate-200"
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
