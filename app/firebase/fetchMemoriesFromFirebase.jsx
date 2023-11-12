import { getFirestore, collection, getDocs, whereEqualTo, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const fetchMemoriesFromFirebase = async () => {
    const db = getFirestore();

    try {
        const auth = getAuth();
        const user = auth.currentUser;
        const memoriesCollection = query(collection(db, 'Memories'), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(memoriesCollection);

        const entries = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            DateCreated: doc.data().DateCreated.toDate(),
            DateMarked: doc.data().DateMarked.toDate(),
            Location: doc.data().Location,
            Title: doc.data().Title,
            Text: doc.data().Text,
            Title: doc.data().Title,
            Images: doc.data().Images,
            uid: doc.data().uid,
        }));

        return entries;
    } catch (error) {
        console.error('Error fetching memories:', error);
        throw error;
    }
};