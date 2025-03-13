import Card from '../card/Card'
import styles from './modal.module.css'

type ModalProps = {
  sectionClassName?: string
  children?: React.ReactNode
  cardClassName?: string
}

const Modal = ({ children, sectionClassName = '', cardClassName = '' }: ModalProps) => {
  return (
    <>
      <Card sectionClassName={`${styles.modal} ${sectionClassName}`} cardClassName={cardClassName}>
        {children}
      </Card>
    </>
  )
}

export default Modal
