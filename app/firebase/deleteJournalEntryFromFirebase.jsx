import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Alert } from "react-native";

export const deleteJournalEntryFromFirebase = async (entryId) => {
  try {
    const db = getFirestore();
    const storage = getStorage();

    const entryRef = doc(db, "JournalEntries", entryId);
    const entrySnapshot = await getDoc(entryRef);

    // making sure the actual entry exists
    if (entrySnapshot.exists()) {
      const image = entrySnapshot.data().Images;

      // check if the entry had an image before deletion
      if (image) {
        const imageRef = ref(storage, image);
        await deleteObject(imageRef);
      }

      await deleteDoc(entryRef);

      Alert.alert("Entry Deleted");
    } else {
      Alert.alert("Entry does not exist");
    }
  } catch (error) {
    console.error("Error deleting journal entry:", error);
    throw error;
  }
};
