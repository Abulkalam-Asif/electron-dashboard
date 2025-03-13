import styles from './button.module.css'

type ButtonProps = {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Button = ({
  children,
  onClick,
  size = 'md',
  className = '',
  disabled = false
}: ButtonProps) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${styles.button} ${className} ${disabled ? styles.disabled : ''} ${
          size === 'sm' ? styles.small : size === 'md' ? styles.medium : styles.large
        }`}
      >
        {children}
      </button>
    </>
  )
}

export default Button
