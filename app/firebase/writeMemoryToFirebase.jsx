import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const writeMemoryToFirebase = async (entry) => {
    const db = getFirestore();

    try {   // Add a new document in collection "JournalEntries"
        const docRef = await addDoc(collection(db, "Memories"), {
            DateCreated: entry.DateCreated,
            DateMarked: entry.DateMarked,
            Location: entry.Location,
            Title: entry.Title,
            Text: entry.Text,
            Images: entry.Images,
            uid: entry.uid,
        });

        Alert.alert('Memory Saved');
    } catch (error) {
        console.error('Error saving memory:', error);
        throw error;
    }
}
