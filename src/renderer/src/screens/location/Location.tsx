import { useQuery } from "@apollo/client";
import { GET_ALL_LOCATIONS } from "@renderer/graphql/location";
import { LocationWithIdType } from "@renderer/types";
import { useEffect, useState } from "react";
import styles from "./location.module.css";
import Card from "@renderer/components/general/card/Card";
import H1 from "@renderer/components/general/h1/H1";
import Loader from "@renderer/components/general/loader/Loader";
import Button from "@renderer/components/general/button/Button";
import AddNewLocationModal from "@renderer/components/location/addNewLocationModal/AddNewLocationModal";
import EditLocationModal from "@renderer/components/location/editLocationModal/EditLocationModal";
import BackButton from "@renderer/components/general/backButton/BackButton";
import DeleteLocationModal from "@renderer/components/location/deleteLocationModal/DeleteLocationModal";

const Location = () => {
  const { data, loading, error } = useQuery(GET_ALL_LOCATIONS, {
    fetchPolicy: "network-only",
  });
  const [allLocations, setAllLocations] = useState<LocationWithIdType[] | null>(null);

  const [isAddLocationModalVisible, setIsAddLocationModalVisible] = useState(false);
  const hideAddLocationModal = () => setIsAddLocationModalVisible(false);

  const [isEditLocationModalVisible, setIsEditLocationModalVisible] = useState(false);
  const [editLocationData, setEditLocationData] = useState<LocationWithIdType | null>(null);
  const setEditModalToDefault = () => {
    setIsEditLocationModalVisible(false);
    setEditLocationData(null);
  };

  const [isDeleteLocationModalVisible, setIsDeleteLocationModalVisible] = useState(false);
  const [deleteLocationId, setDeleteLocationId] = useState("");
  const setDeleteModalToDefault = () => {
    setIsDeleteLocationModalVisible(false);
    setDeleteLocationId("");
  };

  useEffect(() => {
    if (data) {
      setAllLocations(data.getAllLocations);
    }
  }, [data]);

  if (loading) return <Loader text="Fetching locations..." />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Card cardClassName={styles.card}>
        <div className={styles.header}>
          <BackButton to="/" />
          <H1>Locations</H1>
          <Button onClick={() => setIsAddLocationModalVisible(true)} size="sm">
            + Add Location
          </Button>
        </div>
        <div>
          {allLocations &&
            (allLocations.length === 0 ? (
              <div className={styles.noData}>
                <p>No locations found</p>
              </div>
            ) : (
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
                                setEditLocationData(location);
                                setIsEditLocationModalVisible(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                setDeleteLocationId(location.id);
                                setIsDeleteLocationModalVisible(true);
                              }}
                              className={styles.delete}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ))}
        </div>
      </Card>
      {isAddLocationModalVisible && (
        <AddNewLocationModal
          hideAddLocationModal={hideAddLocationModal}
          setAllLocations={setAllLocations}
        />
      )}
      {isEditLocationModalVisible && editLocationData && (
        <EditLocationModal
          setEditModalToDefault={setEditModalToDefault}
          editLocationData={editLocationData}
          setAllLocations={setAllLocations}
        />
      )}
      {isDeleteLocationModalVisible && (
        <DeleteLocationModal
          deleteLocationId={deleteLocationId}
          setDeleteModalToDefault={setDeleteModalToDefault}
          setAllLocations={setAllLocations}
        />
      )}
    </>
  );
};

export default Location;
