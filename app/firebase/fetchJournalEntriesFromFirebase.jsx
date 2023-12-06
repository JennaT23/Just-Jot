import { getFirestore, collection, getDocs, whereEqualTo, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export const fetchJournalEntriesFromFirebase = async () => {
    const db = getFirestore();

    try {
        const auth = getAuth();
        const user = auth.currentUser;
        const journalEntriesCollection = query(collection(db, 'JournalEntries'), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(journalEntriesCollection);

        const entries = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            DateCreated: doc.data().DateCreated.toDate(),
            Location: doc.data().Location,
            Address: doc.data().Address,
            Title: doc.data().Title,
            Text: doc.data().Text,
            Title: doc.data().Title,
            Images: doc.data().Images,
            uid: doc.data().uid,
        }));

        return entries;
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        throw error;
    }
};