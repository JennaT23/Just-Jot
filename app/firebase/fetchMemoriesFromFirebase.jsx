import { getFirestore, collection, getDocs } from "firebase/firestore";

export const fetchMemoriesFromFirebase = async () => {
    const db = getFirestore();

    try {
        const memoriesCollection = collection(db, 'Memories');
        const querySnapshot = await getDocs(memoriesCollection);

        const entries = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            DateCreated: doc.data().DateCreated.toDate(),
            DateMarked: doc.data().DateMarked.toDate(),
            Location: doc.data().Location,
            Title: doc.data().Title,
            Text: doc.data().Text,
            Title: doc.data().Title,
            uid: doc.data().uid,
        }));

        return entries;
    } catch (error) {
        console.error('Error fetching memories:', error);
        throw error;
    }
};