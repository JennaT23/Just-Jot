import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const editMemoriesToFirebase = async (memory) => {
    try {
        const db = getFirestore();
        console.log("id: ", memory.id);
        const memoryRef = doc(db, "Memories", memory.id);

        await updateDoc(memoryRef, {
            // id: entry.id,
            DateCreated: memory.DateCreated,
            DateMarked: memory.DateMarked,
            Location: memory.Location,
            Title: memory.Title,
            Text: memory.Text,
            uid: memory.uid,
        });
        Alert.alert('Entry Saved');

    } catch (error) {
        console.error('Error saving journal entry:', error);
        throw error;
    }
}
