import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const deleteMemoryFromFirebase = async (entryId) => {
  try {
    const db = getFirestore();
    const entryRef = doc(db, "Memories", entryId);

    await deleteDoc(entryRef);
    Alert.alert('Entry Deleted');
  } catch (error) {
    console.error('Error deleting memory:', error);
    throw error;
  }
};
