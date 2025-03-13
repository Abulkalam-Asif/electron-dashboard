import { useQuery } from '@apollo/client'
import { GET_ALL_LOCATIONS } from '@renderer/graphql/location'
import { LocationWithIdType } from '@renderer/types'
import { useEffect, useState } from 'react'
import styles from './location.module.css'
import Card from '@renderer/components/general/card/Card'
import H1 from '@renderer/components/general/h1/H1'
import Loader from '@renderer/components/general/loader/Loader'
import Button from '@renderer/components/general/button/Button'
import AddNewLocationModal from '@renderer/components/location/addNewLocationModal/AddNewLocationModal'
import EditLocationModal from '@renderer/components/location/editLocationModal/EditLocationModal'

const Location = () => {
  const { data, loading, error } = useQuery(GET_ALL_LOCATIONS)
  const [allLocations, setAllLocations] = useState<LocationWithIdType[] | null>(null)

  const [isAddLocationModalVisible, setIsAddLocationModalVisible] = useState(false)
  const hideAddLocationModal = () => setIsAddLocationModalVisible(false)

  const [isEditLocationModalVisible, setIsEditLocationModalVisible] = useState(false)
  const hideEditLocationModal = () => setIsEditLocationModalVisible(false)

  const [editLocationData, setEditLocationData] = useState<LocationWithIdType | null>(null)

  useEffect(() => {
    if (data) {
      setAllLocations(data.getAllLocations)
    }
  }, [data])

  if (loading) return <Loader text="Fetching locations..." />
  if (error) return <p>Error: {error.message}</p>

  const deleteHandler = () => {
    console.log('Delete location')
  }

  return (
    <>
      <Card sectionClassName={styles.card}>
        <div className={styles.header}>
          <H1>Locations</H1>
          <Button onClick={() => setIsAddLocationModalVisible(true)} size="sm">
            + Add Location
          </Button>
        </div>
        <div>
          {allLocations && (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th align="left">No.</th>
                    <th align="left">Name</th>
                    <th align="left">Description</th>
                    <th align="left">Pin</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allLocations.map((location, index) => (
                    <tr key={location.id}>
                      <td>{index + 1}</td>
                      <td>{location.name}</td>
                      <td>{location.description}</td>
                      <td>{location.pin}</td>
                      <td>
                        <div className={styles.actions}>
                          <Button
                            size="sm"
                            onClick={() => {
                              setEditLocationData(location)
                              setIsEditLocationModalVisible(true)
                            }}
                          >
                            Edit
                          </Button>
                          <Button size="sm" onClick={deleteHandler} className={styles.delete}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </Card>
      {isAddLocationModalVisible && (
        <AddNewLocationModal hideAddLocationModal={hideAddLocationModal} />
      )}
      {isEditLocationModalVisible && editLocationData && (
        <EditLocationModal
          hideEditLocationModal={hideEditLocationModal}
          editLocationData={editLocationData}
        />
      )}
    </>
  )
}

export default Location
