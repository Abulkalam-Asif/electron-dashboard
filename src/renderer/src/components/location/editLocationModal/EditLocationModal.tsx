import { useEffect, useState } from 'react'
import H1 from '@renderer/components/general/h1/H1'
import InputBox from '@renderer/components/general/inputBox/InputBox'
import Button from '@renderer/components/general/button/Button'
import styles from './editLocationModal.module.css'
import Loader from '@renderer/components/general/loader/Loader'
import { useMutation } from '@apollo/client'
import { EDIT_LOCATION } from '@renderer/graphql/location'
import { LocationType, LocationWithIdType } from '@renderer/types'
import Modal from '@renderer/components/general/modal/Modal'
import CloseButton from '@renderer/components/general/closeButton/CloseButton'

type EditLocationModalProps = {
  hideEditLocationModal: () => void
  editLocationData: LocationWithIdType
}

function EditLocationModal({ hideEditLocationModal, editLocationData }: EditLocationModalProps) {
  const [editLocationMutation] = useMutation(EDIT_LOCATION)

  const [locationData, setLocationData] = useState(editLocationData)
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstSubmit, setIsFirstSubmit] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    pin: ''
  })

  const locationDataInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setLocationData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(
    function validateOnInputChange() {
      if (isFirstSubmit) {
        validateInput(locationData)
      }
    },
    [locationData]
  )

  const validateInput = (locationData: LocationType) => {
    const newErrors = { name: '', description: '', pin: '' }
    let isValid = true

    if (locationData.name === '') {
      newErrors.name = 'Location Name is required'
      isValid = false
    }
    if (locationData.description === '') {
      newErrors.description = 'Description is required'
      isValid = false
    }
    if (locationData.pin === '') {
      newErrors.pin = 'Location Pin is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const updateHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!isFirstSubmit) {
      setIsFirstSubmit(true)
    }
    setIsLoading(true)
    if (!validateInput(locationData)) {
      setIsLoading(false)
      return
    }
    try {
      const { data } = await editLocationMutation({
        variables: {
          id: editLocationData?.id,
          name: locationData.name,
          description: locationData.description,
          pin: locationData.pin
        }
      })
      if (data.editLocation) {
        alert('Location updated successfully')
      } else {
        alert('Failed to update location')
      }
    } catch (error) {
      console.error('Error updating location:', error)
      alert('Failed to update location')
    }
    setIsLoading(false)
    setIsFirstSubmit(false)
    hideEditLocationModal()
  }

  return (
    <>
      <Modal cardClassName={styles.modalCard}>
        <div className={styles.header}>
          <H1>Location</H1>
          <CloseButton onClick={hideEditLocationModal} />
        </div>
        <form className={styles.form}>
          <InputBox
            name="name"
            label="Location Name"
            type="text"
            value={locationData.name}
            inputHandler={locationDataInputHandler}
            error={errors.name}
          />
          <InputBox
            name="description"
            label="Description"
            type="text"
            value={locationData.description}
            inputHandler={locationDataInputHandler}
            error={errors.description}
          />
          <InputBox
            name="pin"
            label="Location Pin"
            type="text"
            value={locationData.pin}
            inputHandler={locationDataInputHandler}
            error={errors.pin}
          />
          <Button disabled={isLoading} onClick={updateHandler} className={styles.button}>
            Update
          </Button>
        </form>
      </Modal>
      {isLoading && <Loader text="Updating location..." />}
    </>
  )
}

export default EditLocationModal
