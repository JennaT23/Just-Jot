import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { Alert } from "react-native";

export const writeJournalEntryToFirebase = async (entry) => {
    const db = getFirestore();

    try {
            // Add a new document in collection "JournalEntries"
    const docRef = await addDoc(collection(db, "JournalEntries"), {
        Date: entry.Date,
        Location: entry.Location,
        Title: entry.Title,
        Text: entry.Text,
        uid: entry.uid,
      });

      Alert.alert('Entry Saved');

    } catch (error) {
        console.error('Error saving journal entry:', error);
        throw error;
    }
}
