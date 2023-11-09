import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, Image, Modal, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appJournalStyle, appJournalStyle as appJournal_style, } from "./journal.style";
import { appstyle as app_style } from "../../../../appStyles/appstyle";
import { getAuth } from "firebase/auth";
import Text from "../../../../appStyles/customStyle";
import useThemedStyles from "../../../../appStyles/useThemedStyles";
import { useNavigation } from "@react-navigation/core";
import { Card, Title, Paragraph, Button, FAB, Subheading, IconButton, } from "react-native-paper";
import { fetchJournalEntriesFromFirebase } from "../../../firebase/fetchJournalEntriesFromFirebase";
import { newEntrystyle as newEntry_style } from "../newEntry/newEntry.style";
import useTheme from "../../../../appStyles/useTheme";
import { getLocation } from "../../../location/getLocation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Journal = ({ navigation }) => {
  const theme = useTheme();
  const appstyle = useThemedStyles(app_style);
  const appJournalstyle = useThemedStyles(appJournal_style);
  const newEntrystyle = useThemedStyles(newEntry_style);

  const { navigate } = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  // react hooks
  const [username, setUsername] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);
  const [sortByOldest, setSortByOldest] = useState(true); // true for oldest to newest, false for newest to oldest
  const [refreshData, setRefreshData] = useState(0);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.displayName);
    }
    fetchJournalEntries();
  }, [refreshData]);

  const handleExitView = () => {
    navigation.navigate("NavBar");
    setRefreshData((prev) => prev + 1);
  };

  const moveNewEntry = () => {
    const entry = {
      Text: "",
      Title: "",
      Location: null,
      Images: "",
      Date: new Date(),
      uid: user.uid,
    };
    navigation.navigate("NewEntry", { entry, handleExitView });
  };

  // grab journal entries from firebase and display them on login
  const fetchJournalEntries = async () => {
    try {
      const entries = await fetchJournalEntriesFromFirebase();
      setJournalEntries(entries);
    } catch (error) {
      console.log("Error fetching", error);
    }
  };

  // to handle filtering certain journal entries
  const handleFilter = (oldestToNewest) => {
    const sortedEntries = [...journalEntries].sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return oldestToNewest ? dateA - dateB : dateB - dateA;
    });
    setJournalEntries(sortedEntries);
    setFilterModalVisible(false);
  };

  // to handle searching through the entries
  const handleSearch = () => {
    const filteredEntries = journalEntries.filter((entry) => {
      const entryTitle = entry.Title.toLowerCase();
      const entryText = entry.Text.toLowerCase();
      const query = searchQuery.toLowerCase();
      return entryTitle.includes(query) || entryText.includes(query);
    });
    setJournalEntries(filteredEntries);
    setIsSearching(false);
  };

  function formatDate(date) {
    if (!(date instanceof Date)) {
      throw new Error("Invalid date object");
    }

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time to be in 12-hour format
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const formattedDate = `${dayOfWeek}. ${month}. ${day}, ${year} ${formattedHours}:${String(
      minutes
    ).padStart(2, "0")} ${amPm}`;

    return formattedDate;
  }

  const formatGeoPoint = (geopoint) => {
    const lat = geopoint.latitude.toString();
    const lng = geopoint.longitude.toString();

    const formattedLocation = "[" + lat + ", " + lng + "]";
    return formattedLocation;
  };

  const handleView = (entry) => {
    navigation.navigate("ViewEntry", { entry, handleExitView });
  };

  return (
    // <SafeAreaView style={appstyle.pageContainer}>
    <SafeAreaView style={appJournalstyle.container}>
      <View>
        <Text style={appJournalstyle.journalTitle}>Hello {username}!</Text>
      </View>

      <View style={appJournalstyle.header}>
        <View style={appJournalstyle.searchBarContainer}>
          <TextInput
            style={appJournalstyle.searchBar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity
            onPress={handleSearch}
            style={appJournalstyle.iconButton}
          >
            <MaterialCommunityIcons name="magnify" size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <FAB style={appJournalstyle.iconButton} icon={"filter"} />
        </TouchableOpacity>
      </View>

      {isSearching && (
        <View style={appJournalstyle.searchBarContainer}>
          <TextInput
            style={appJournalstyle.searchBar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        // transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={appJournalstyle.modalContainer}>
          <TouchableOpacity
            style={appJournalstyle.modalDropdownOption}
            onPress={() => handleFilter(true)}
          >
            <Text>Oldest to Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={appJournalstyle.modalDropdownOption}
            onPress={() => handleFilter(false)}
          >
            <Text>Newest to Oldest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={appJournalstyle.modalDropdownOption}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView>
        {journalEntries.map((entry, index) => (
          <Card key={index} style={appJournalstyle.card}>
            <Card.Content>
              <TouchableOpacity onPress={() => handleView(entry)}>
                <Title style={appJournalstyle.title}>{entry.Title}</Title>
                <Subheading style={appJournalstyle.subheading}>
                  {entry.Date && formatDate(new Date(entry.Date))}
                </Subheading>
                <Subheading style={appJournalstyle.subheading}>
                  Location: {entry.Location && formatGeoPoint(entry.Location)}
                </Subheading>
                <Paragraph>{entry.Text}</Paragraph>
                <Image
                  style={{ height: 200, width: 200 }}
                  source={{ uri: entry.Images }}
                />
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <FAB style={appJournalstyle.fab} icon="plus" onPress={moveNewEntry} />
    </SafeAreaView>
  );
};
