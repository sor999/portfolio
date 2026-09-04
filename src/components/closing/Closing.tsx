import styles from './Closing.module.css'
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
    <section className={styles.closing} id="closing">
      <div className={styles.closingText}>
        <h2 className={styles.headline} id="closing-headline">
          {headline}
        </h2>
        <p className={styles.description}>{description}</p>
      </div>
      <a className={styles.ctaButton} href={`mailto:${email}`}>
        {ctaText}
      </a>
    </section>
  )
}
