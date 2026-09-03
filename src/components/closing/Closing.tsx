interface ClosingProps {
  headline: string
  description: string
  ctaText: string
  email: string
}

export default function Closing({
  headline,
  description,
  ctaText,
  email,
}: ClosingProps) {
  return (
    <section id="closing">
      <h2 id="closing-headline">{headline}</h2>
      <p>{description}</p>

      <a href={`mailto:${email}`}>{ctaText}</a>
    </section>
  )
}
