import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const editMemoriesToFirebase = async (memory) => {
    try {
        const db = getFirestore();
        const memoryRef = doc(db, "Memories", memory.id);

        await updateDoc(memoryRef, {
            DateCreated: memory.DateCreated,
            DateMarked: memory.DateMarked,
            Location: memory.Location,
            Address: memory.Address,
            Title: memory.Title,
            Text: memory.Text,
            Images: memory.Images,
            uid: memory.uid,
        });
        Alert.alert('Entry Saved');

    } catch (error) {
        console.error('Error saving memory entry:', error);
        throw error;
    }
}
