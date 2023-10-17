import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { Alert } from "react-native";

export const writeJournalEntryToFirebase = async (journal) => {
    const db = getFirestore();

    try {
            // Add a new document in collection "JournalEntries"
    const docRef = await addDoc(collection(db, "JournalEntries"), {
        Date: journal.date,
        Location: journal.location,
        Title: journal.title,
        Text: journal.text,
        uid: journal.uid,
      });

      Alert.alert('Entry Saved');
      
    } catch (error) {
        console.error('Error creating journal entry:', error);
        throw error;
    }
}
