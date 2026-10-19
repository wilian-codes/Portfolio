import { BentoCardLabel, CardArrow, CardLink } from './bento-card'

export function ContactCard() {
  return (
    <>
      <BentoCardLabel title="Contact">
        <CardArrow className="group-hover:text-background" />
      </BentoCardLabel>
      <p className="mt-auto text-heading font-medium">
        <CardLink to="/#contact">Let's build something together.</CardLink>
      </p>
    </>
  )
}
