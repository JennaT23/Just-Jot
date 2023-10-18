import { getFirestore, collection, getDocs } from "firebase/firestore";

export const fetchJournalEntriesFromFirebase = async () => {
    const db = getFirestore();

    try {
        const journalEntriesCollection = collection(db, 'JournalEntries');
        const querySnapshot = await getDocs(journalEntriesCollection);
        console.log(querySnapshot.docs)

        const entries = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            Date: doc.data().Date,
            Location: doc.data().Location,
            Text: doc.data().Text,
            Title: doc.data().Title,
            uid: doc.data().uid,
        }));
        return entries;
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        throw error;
    }
};