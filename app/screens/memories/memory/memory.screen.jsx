import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appstyle as app_style } from "../../../../appStyles/appstyle";
import { getAuth } from "firebase/auth";
import Text from "../../../../appStyles/customStyle";
import useThemedStyles from "../../../../appStyles/useThemedStyles";
import { useNavigation } from "@react-navigation/core";
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  Subheading,
  IconButton,
} from "react-native-paper";
import { fetchMemoriesFromFirebase } from "../../../firebase/fetchMemoriesFromFirebase";
import { HomeTemplate } from "../../../../templates/homeTemplate";
import PaginationComponent from "../../../../templates/PaginationComponent";

export const Memories = ({ navigation }) => {
    return (
        <HomeTemplate navigation={navigation} fetchFromFirebase={fetchMemoriesFromFirebase} screen="memory" />
    )
};
