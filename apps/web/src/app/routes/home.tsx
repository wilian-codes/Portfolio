// Placeholder sections so the nav has targets; steps 3–7 replace each one.
const PLACEHOLDER_SECTIONS = [
  { id: 'about', label: '01 / Overview', title: 'At a glance', note: 'Bento grid arrives in step 5.' },
  { id: 'work', label: '02 / Work', title: 'Selected projects', note: 'Projects arrive in step 6.' },
  { id: 'contact', label: '03 / Contact', title: "Let's work together", note: 'Contact arrives in step 7.' },
]

export function HomePage() {
  return (
    <>
      <section
        id="home"
        className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-5xl scroll-mt-24 flex-col justify-center gap-6 px-4 md:px-8"
      >
        <p className="font-mono text-label text-subtle">Full-stack developer and tester</p>
        <h1 className="text-display font-medium">
          Wilian Nunag.
          <br />
          <span className="text-subtle">Web and mobile.</span>
        </h1>
        <p className="max-w-md text-muted-foreground">
          BSIT student at National University – Clark. I build and test web apps from database to UI.
        </p>
      </section>

      {PLACEHOLDER_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto min-h-[80dvh] max-w-5xl scroll-mt-24 border-t border-border px-4 py-24 md:px-8"
        >
          <p className="font-mono text-label text-subtle">{section.label}</p>
          <h2 className="mt-2 text-title font-medium">{section.title}</h2>
          <p className="mt-3 text-muted-foreground">{section.note}</p>
        </section>
      ))}
    </>
  )
}
