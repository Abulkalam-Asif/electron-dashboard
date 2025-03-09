import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { SETTINGS_DOC_ID } from "../constants";
import { SettingsType } from "../types";

const getSettings = async () => {
  try {
    const settingsDocRef = doc(firestore, "SETTINGS", SETTINGS_DOC_ID);
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
      const data: SettingsType = {
        ipOrDomain: docSnap.data().ipOrDomain,
        port: docSnap.data().port,
        apiKey: docSnap.data().apiKey,
      };
      return data;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error fetching document: ", e);
    return null;
  }
};

export default getSettings;
