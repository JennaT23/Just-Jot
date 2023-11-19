import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const editJournalEntriesToFirebase = async (entry) => {
    try {
        const db = getFirestore();
        const entryRef = doc(db, "JournalEntries", entry.id);

        await updateDoc(entryRef, {
            // id: entry.id,
            DateCreated: entry.DateCreated,
            Location: entry.Location,
            Title: entry.Title,
            Text: entry.Text,
            Images: entry.Images,
            uid: entry.uid,
        });
        Alert.alert('Entry Saved');

    } catch (error) {
        console.error('Error saving journal entry:', error);
        throw error;
    }
}
