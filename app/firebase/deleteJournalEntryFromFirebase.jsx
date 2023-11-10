import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const deleteJournalEntryFromFirebase = async (entryId) => {
  try {
    const db = getFirestore();
    const entryRef = doc(db, "JournalEntries", entryId);

    await deleteDoc(entryRef);
    Alert.alert('Entry Deleted');
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    throw error;
  }
};
