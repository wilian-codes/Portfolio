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

export const TECH_GROUPS = ['Frontend', 'Backend and data', 'Languages and tools'] as const

export type TechGroup = (typeof TECH_GROUPS)[number]

export type Tech = {
  name: string
  icon: SimpleIcon
  group: TechGroup
}

// From the resume. Simple Icons has no Java or C# logo, so OpenJDK and .NET stand in.
export const TECH_STACK: readonly Tech[] = [
  { name: 'HTML', icon: siHtml5, group: 'Frontend' },
  { name: 'CSS', icon: siCss, group: 'Frontend' },
  { name: 'JavaScript', icon: siJavascript, group: 'Frontend' },
  { name: 'React', icon: siReact, group: 'Frontend' },
  { name: 'Java', icon: siOpenjdk, group: 'Languages and tools' },
  { name: 'Kotlin', icon: siKotlin, group: 'Languages and tools' },
  { name: 'PHP', icon: siPhp, group: 'Backend and data' },
  { name: 'C# / .NET', icon: siDotnet, group: 'Backend and data' },
  { name: 'C++', icon: siCplusplus, group: 'Languages and tools' },
  { name: 'MySQL', icon: siMysql, group: 'Backend and data' },
  { name: 'Git', icon: siGit, group: 'Languages and tools' },
  { name: 'GitHub', icon: siGithub, group: 'Languages and tools' },
]
