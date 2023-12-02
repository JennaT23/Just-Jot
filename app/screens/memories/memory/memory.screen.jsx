import React from "react";
import { fetchMemoriesFromFirebase } from "../../../firebase/fetchMemoriesFromFirebase";
import { HomeTemplate } from "../../../../templates/homeTemplate";

export const Memories = ({ navigation }) => {
    return (
        <HomeTemplate navigation={navigation} fetchFromFirebase={fetchMemoriesFromFirebase} screen="memory" />
    )
};