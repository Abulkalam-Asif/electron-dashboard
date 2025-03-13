import { useEffect } from 'react'
import styles from './card.module.css'
type CardProps = {
  children: React.ReactNode
  sectionClassName?: string
  cardClassName?: string
}

const Card = ({ children, sectionClassName = '', cardClassName = '' }: CardProps) => {
  useEffect(() => {
    const container = document.querySelector(`.${styles.container}`)
    if (container) {
      container.classList.add(styles.enter)
    }
  }, [])

  return (
    <>
      <section className={`${styles.section} ${sectionClassName}`}>
        <div className={`${styles.container} ${cardClassName}`}>{children}</div>
      </section>
    </>
  )
}

export default Card
