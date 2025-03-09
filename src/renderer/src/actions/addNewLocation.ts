import { addDoc, collection } from "firebase/firestore";
import { LocationType } from "../types";
import { firestore } from "../firebaseConfig";

const addNewLocation = async (location: LocationType) => {
  try {
    const locationsCollectionRef = collection(firestore, "LOCATIONS");
    await addDoc(locationsCollectionRef, location);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export default addNewLocation;
