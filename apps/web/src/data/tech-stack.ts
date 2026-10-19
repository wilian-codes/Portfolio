import type { SimpleIcon } from 'simple-icons'
import {
  siCplusplus,
  siCss,
  siDotnet,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siKotlin,
  siMysql,
  siOpenjdk,
  siPhp,
  siReact,
} from 'simple-icons'

export type Tech = {
  name: string
  icon: SimpleIcon
}

// From the resume. Simple Icons has no Java or C# logo, so OpenJDK and .NET stand in.
export const TECH_STACK: readonly Tech[] = [
  { name: 'HTML', icon: siHtml5 },
  { name: 'CSS', icon: siCss },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'React', icon: siReact },
  { name: 'Java', icon: siOpenjdk },
  { name: 'Kotlin', icon: siKotlin },
  { name: 'PHP', icon: siPhp },
  { name: 'C# / .NET', icon: siDotnet },
  { name: 'C++', icon: siCplusplus },
  { name: 'MySQL', icon: siMysql },
  { name: 'Git', icon: siGit },
  { name: 'GitHub', icon: siGithub },
]
