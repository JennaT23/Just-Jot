import { getFirestore, collection, getDocs } from "firebase/firestore";

export const fetchJournalEntriesFromFirebase = async () => {
    const db = getFirestore();

    try {
        const journalEntriesCollection = collection(db, 'JournalEntries');
        const querySnapshot = await getDocs(journalEntriesCollection);

        const entries = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            Date: doc.data().Date.toDate(),
            Location: doc.data().Location,
            Title: doc.data().Title,
            Text: doc.data().Text,
            Title: doc.data().Title,
            uid: doc.data().uid,
        }));

        for (entry in entries) {
            console.log("loop date", entry.Date);
        }

        return entries;
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        throw error;
    }
};