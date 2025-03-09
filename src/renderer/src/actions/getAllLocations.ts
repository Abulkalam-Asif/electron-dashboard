import { collection, getDocs } from "firebase/firestore";
import { LocationWithIdType } from "../types";
import { firestore } from "../firebaseConfig";

const getAllLocations = async () => {
  try {
    const locationsCollectionRef = collection(firestore, "LOCATIONS");
    const locationsSnapshot = await getDocs(locationsCollectionRef);
    const locations: LocationWithIdType[] = [];
    locationsSnapshot.forEach((doc) => {
      const data = doc.data();
      const location: LocationWithIdType = {
        id: doc.id,
        locationName: data.locationName,
        description: data.description,
        locationPin: data.locationPin,
      };
      locations.push(location);
    });
    return locations;
  } catch (e) {
    console.error("Error getting locations: ", e);
    return null;
  }
};

export default getAllLocations;
