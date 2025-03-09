import { addDoc, collection } from "firebase/firestore";
import { AttendanceDeviceType } from "../types";
import { firestore } from "../firebaseConfig";

const addNewAttendanceDevice = async (device: AttendanceDeviceType) => {
  try {
    const devicesCollectionRef = collection(firestore, "ATTENDANCE_DEVICES");
    await addDoc(devicesCollectionRef, device);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export default addNewAttendanceDevice;
