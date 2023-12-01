import React from "react";
import { fetchJournalEntriesFromFirebase } from "../../../firebase/fetchJournalEntriesFromFirebase";
import { HomeTemplate } from "../../../../templates/homeTemplate";

export const Journal = ({ navigation }) => {
    return (
        <HomeTemplate navigation={navigation} fetchFromFirebase={fetchJournalEntriesFromFirebase} screen="journal" />
    );
};
