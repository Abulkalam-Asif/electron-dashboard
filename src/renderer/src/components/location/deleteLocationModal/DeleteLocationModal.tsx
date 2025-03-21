import { useState } from "react";
import styles from "./deleteLocationModal.module.css";
import Loader from "@renderer/components/general/loader/Loader";
import { useMutation } from "@apollo/client";
import { DELETE_LOCATION } from "@renderer/graphql/location";
import Modal from "@renderer/components/general/modal/Modal";
import Button from "@renderer/components/general/button/Button";
import { LocationWithIdType } from "@renderer/types";
import { useAlert } from "@renderer/contexts/AlertContext";

type DeleteLocationModalProps = {
  deleteLocationId: string;
  setDeleteModalToDefault: () => void;
  setAllLocations: React.Dispatch<React.SetStateAction<LocationWithIdType[] | null>>;
};

function DeleteLocationModal({
  deleteLocationId,
  setDeleteModalToDefault,
  setAllLocations,
}: DeleteLocationModalProps) {
  const { showAlert } = useAlert();

  const [deleteLocationMutation] = useMutation(DELETE_LOCATION);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await deleteLocationMutation({
        variables: {
          id: deleteLocationId,
        },
      });
      const data = response.data.deleteLocation;
      if (data.success) {
        // Remove the deleted location from the list of all locations
        setAllLocations((prev) =>
          prev ? prev.filter((location) => location.id !== deleteLocationId) : []
        );
      }
      showAlert({ message: data.message, type: data.success ? "success" : "error" });
    } catch (error) {
      showAlert({ message: "An error occured. Please refresh and try again.", type: "error" });
    }
    setIsLoading(false);
    setDeleteModalToDefault();
  };

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
  );
}

export default DeleteLocationModal;
