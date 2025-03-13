import { useState } from 'react'
import styles from './deleteLocationModal.module.css'
import Loader from '@renderer/components/general/loader/Loader'
import { useMutation } from '@apollo/client'
import { DELETE_LOCATION } from '@renderer/graphql/location'
import Modal from '@renderer/components/general/modal/Modal'
import Button from '@renderer/components/general/button/Button'

type DeleteLocationModalProps = {
  deleteLocationId: string
  setDeleteModalToDefault: () => void
}

function DeleteLocationModal({
  deleteLocationId,
  setDeleteModalToDefault
}: DeleteLocationModalProps) {
  const [deleteLocationMutation] = useMutation(DELETE_LOCATION)
  const [isLoading, setIsLoading] = useState(false)

  const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await deleteLocationMutation({
        variables: {
          id: deleteLocationId
        }
      })
      if (data.deleteLocation) {
        alert('Location deleted successfully')
      } else {
        alert('Failed to delete location')
      }
    } catch (error) {
      console.error('Error deleting location:', error)
      alert('Failed to delete location')
    }
    setIsLoading(false)
    setDeleteModalToDefault()
  }

  return (
    <>
      <Modal cardClassName={styles.modalCard}>
        <div>Are you sure you want to delete this location?</div>
        <div className={styles.buttons}>
          <Button size="sm" onClick={deleteHandler} className={styles.delete}>
            Delete
          </Button>
          <Button size="sm" onClick={setDeleteModalToDefault}>
            Cancel
          </Button>
        </div>
      </Modal>
      {isLoading && <Loader text="Deleting location..." />}
    </>
  )
}

export default DeleteLocationModal
