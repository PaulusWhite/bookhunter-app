import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

let getCurrentUserData = async (auth) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export { getCurrentUserData }