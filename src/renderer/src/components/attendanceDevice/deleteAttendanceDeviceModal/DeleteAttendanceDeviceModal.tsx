import { useState } from "react";
import styles from "./deleteAttendanceDeviceModal.module.css";
import Loader from "@renderer/components/general/loader/Loader";
import { useMutation } from "@apollo/client";
import Modal from "@renderer/components/general/modal/Modal";
import Button from "@renderer/components/general/button/Button";
import { AttendanceDeviceWithLocationType } from "@renderer/types";
import { DELETE_ATTENDANCE_DEVICE } from "@renderer/graphql/attendanceDevice";
import { useAlert } from "@renderer/contexts/AlertContext";

type DeleteAttendanceDeviceModalProps = {
  deleteAttendanceDeviceId: string;
  setDeleteModalToDefault: () => void;
  setAllAttendanceDevices: React.Dispatch<
    React.SetStateAction<AttendanceDeviceWithLocationType[] | null>
  >;
};

function DeleteAttendanceDeviceModal({
  deleteAttendanceDeviceId,
  setDeleteModalToDefault,
  setAllAttendanceDevices,
}: DeleteAttendanceDeviceModalProps) {
  const { showAlert } = useAlert();
  const [deleteAttendanceDeviceMutation] = useMutation(DELETE_ATTENDANCE_DEVICE);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await deleteAttendanceDeviceMutation({
        variables: {
          id: deleteAttendanceDeviceId,
        },
      });
      const data = response.data.deleteAttendanceDevice;
      if (data.success) {
        // Remove the deleted attendance device from the list
        setAllAttendanceDevices((prev) =>
          prev ? prev.filter((device) => device.id !== deleteAttendanceDeviceId) : []
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
        <div>Are you sure you want to delete this attendance device?</div>
        <div className={styles.buttons}>
          <Button size="sm" onClick={deleteHandler} className={styles.delete}>
            Delete
          </Button>
          <Button size="sm" onClick={setDeleteModalToDefault}>
            Cancel
          </Button>
        </div>
      </Modal>
      {isLoading && <Loader text="Deleting attendance device..." />}
    </>
  );
}

export default DeleteAttendanceDeviceModal;
