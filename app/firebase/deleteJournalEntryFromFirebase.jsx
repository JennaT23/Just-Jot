import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Alert } from "react-native";

export const deleteJournalEntryFromFirebase = async (entryId) => {
  try {
    const db = getFirestore();
    const storage = getStorage();

    const entryRef = doc(db, "JournalEntries", entryId);
    const entrySnapshot = await getDoc(entryRef);
    const image = entrySnapshot.data().Images;

    // delete image from storage
    const imageRef = ref(storage, image);
    await deleteObject(imageRef);

    // delete document
    await deleteDoc(entryRef);
    
    Alert.alert('Entry Deleted');
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    throw error;
  }
};
