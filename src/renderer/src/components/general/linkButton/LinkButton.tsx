import { Link } from 'react-router-dom'
import styles from './linkButton.module.css'

type LinkButtonProps = {
  children: React.ReactNode
  to: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LinkButton = ({ children, size = 'md', to, className = '' }: LinkButtonProps) => {
  return (
    <>
      <Link
        to={to}
        className={`${styles.link} ${
          size === 'sm' ? styles.small : size === 'md' ? styles.medium : styles.large
        } ${className}`}
      >
        {children}
      </Link>
    </>
  )
}

export default LinkButton
