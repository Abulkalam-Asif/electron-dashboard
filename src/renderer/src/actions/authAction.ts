import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import bcrypt from "bcryptjs";
import { signJwt } from "../utils/signJwt";

export const registerUser = async (registerData: {
  name: string;
  username: string;
  password: string;
}) => {
  try {
    const userRef = doc(collection(firestore, "USERS"), registerData.username);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    await setDoc(userRef, {
      name: registerData.name,
      username: registerData.username,
      password: hashedPassword,
    });
    return true;
  } catch (error) {
    console.error(`Registration failed: ${error}`);
    return false;
  }
};

export const loginUser = async (loginData: {
  username: string;
  password: string;
}) => {
  try {
    const userRef = doc(collection(firestore, "USERS"), loginData.username);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("Invalid username or password");
    }

    const user = userDoc.data();
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    const token = signJwt(loginData.username);
    return token;
  } catch (error) {
    console.error(`Login failed: ${error}`);
    return false;
  }
};
