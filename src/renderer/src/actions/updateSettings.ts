import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { SETTINGS_DOC_ID } from "../constants";

const updateSettings = async (settings: any) => {
  try {
    const settingsDocRef = doc(firestore, "SETTINGS", SETTINGS_DOC_ID);
    await setDoc(settingsDocRef, settings, { merge: true });
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
};

export default updateSettings;
