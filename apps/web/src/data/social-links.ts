import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import { Mail } from 'lucide-react'
import { PROFILE } from './profile'

function withoutProtocol(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '')
}

// Business rule: public contact info is email, GitHub, and LinkedIn only. Never a phone number.
export const SOCIAL_LINKS = [
  { label: 'Email', href: `mailto:${PROFILE.email}`, display: PROFILE.email, Icon: Mail, isExternal: false },
  { label: 'GitHub', href: PROFILE.githubUrl, display: withoutProtocol(PROFILE.githubUrl), Icon: IconBrandGithub, isExternal: true },
  { label: 'LinkedIn', href: PROFILE.linkedinUrl, display: withoutProtocol(PROFILE.linkedinUrl), Icon: IconBrandLinkedin, isExternal: true },
]

export type SocialLink = (typeof SOCIAL_LINKS)[number]
