import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const editJournalEntries = async (entryData) => {
    const db = getFirestore();

    const entryRef = doc(db, "JournalEntries", entryData.docId);

    try {
        await updateDoc(entryRef, {
            Date: entryData.date,
            Location: entryData.location,
            Title: entryData.title,
            Text: entryData.text,
            uid: entryData.uid,
        });
        Alert.alert('Entry Saved');

    } catch (error) {
        console.error('Error saving journal entry:', error);
        throw error;
    }
}
