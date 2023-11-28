import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Alert } from "react-native";

export const deleteMemoryFromFirebase = async (memoryId) => {
  try {
    const db = getFirestore();
    const storage = getStorage();

    const memoryRef = doc(db, "Memories", memoryId);
    const memorySnapshot = await getDoc(memoryRef);
    
    if (memorySnapshot.exists()) {
      const image = memorySnapshot.data().Images;

      // check if the memory had an image before deletion
      if (image) {
        const imageRef = ref(storage, image);
        await deleteObject(imageRef);
      }
      await deleteDoc(memoryRef);

      Alert.alert('Memory Deleted');
    } else {
      Alert.alert('Memory not found');
    }
  } catch (error) {
    console.error('Error deleting memory:', error);
    throw error;
  }
};
