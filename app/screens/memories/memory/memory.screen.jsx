import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, Image } from "react-native";
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
import { newEntrystyle as newEntry_style } from "../../journal/newEntry/newEntry.style";
import useTheme from "../../../../appStyles/useTheme";
import { appJournalStyle as appJournal_style } from "../../journal/appJournal/journal.style";
import { GeoPoint } from "firebase/firestore";
import { displayAddress } from "../../../location/geocode";
import { Memory } from "./memory";
import { ViewTemplate } from "../../../../templates/viewTemplate";
import { TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

export const Memories = ({ navigation }) => {
  const theme = useTheme();
  const appstyle = useThemedStyles(app_style);
  const appJournalstyle = useThemedStyles(appJournal_style);
  const newEntrystyle = useThemedStyles(newEntry_style);

  const { navigate } = useNavigation();
  const screen = "memory";

  const auth = getAuth();
  const user = auth.currentUser;
  const [username, setUsername] = useState("");
  const [memories, setMemories] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [displayedAddresses, setDisplayedAddresses] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const fetchMemories = async () => {
    try {
      const entries = await fetchMemoriesFromFirebase();
      setMemories(entries);
    } catch (error) {
      console.log("Error fetching", error);
    }
  };

  useEffect(() => {
    if (user) {
      setUsername(user.displayName);
    }
    fetchMemories();
  }, [refreshData]);

  const fetchAndDisplayAddresses = async () => {
    const addresses = await Promise.all(
      memories.map(async (memory) => {
        const address = await displayAddress(memory.Location);
        return address;
      })
    );
    setDisplayedAddresses(addresses);
  };

  useEffect(() => {
    fetchAndDisplayAddresses();
  }, [memories]);

  const handleExitView = () => {
    navigation.navigate("NavBar");
    setRefreshData((prev) => prev + 1);
  };

  const moveNewMemory = () => {
    const memory = {
      Text: "",
      Title: "",
      Location: null,
      Images: "",
      DateCreated: new Date(),
      DateMarked: new Date(),
      uid: user.uid,
    };
    navigation.navigate("NewMemory", { memory, screen, handleExitView });
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setIsSearching(false);
      fetchMemories();
    } else {
      setIsSearching(true);
      const filteredMemories = memories.filter((memory) => {
        const memoryTitle = memory.Title.toLowerCase();
        const memoryText = memory.Text.toLowerCase();
        const query = searchQuery.toLowerCase();
        return memoryTitle.includes(query) || memoryText.includes(query);
      });
      setMemories(filteredMemories);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    fetchMemories();
  };

  const handleFilter = (oldestToNewest) => {
    const sortedMemories = [...memories].sort((a, b) => {
      const dateA = new Date(a.DateCreated);
      const dateB = new Date(b.DateCreated);
      return oldestToNewest ? dateA - dateB : dateB - dateA;
    });
    setMemories(sortedMemories);
    setSelectedFilter(oldestToNewest ? "Oldest to Newest" : "Newest to Oldest");
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

  const handleView = (newMemory) => {
    navigation.navigate("ViewMemory", { newMemory, screen, handleExitView });
  };

  const formatGeoPoint = (geopoint) => {
    const lat = geopoint.latitude.toString();
    const lng = geopoint.longitude.toString();

    const formattedLocation = "[" + lat + ", " + lng + "]";
    return formattedLocation;
  };

  return (
    <SafeAreaView style={appJournalstyle.container}>
      <View>
        <Text style={appstyle.title}>Hello {username}!</Text>
      </View>
      <View style={appJournalstyle.header}>
        <View style={appJournalstyle.searchBarContainer}>
          <TextInput
            style={{
              color: theme.colors.TEXT,
              textShadowColor: theme.colors.SUBHEADING,
              ...appJournalstyle.searchBar,
            }}
            placeholder="Search..."
            placeholderTextColor={theme.colors.SUBHEADING}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={handleSearch}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={theme.colors.TEXT}
            />
          </TouchableOpacity>
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Text>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ position: "relative", zIndex: 1 }}>
          <DropDownPicker
            items={[
              { label: "Sort By", value: null },
              { label: "Oldest to Newest", value: "Oldest to Newest" },
              { label: "Newest to Oldest", value: "Newest to Oldest" },
            ]}
            defaultValue={selectedFilter}
            containerStyle={appJournalstyle.filterDropdown}
            style={{ backgroundColor: theme.colors.BACKGROUND }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => {
              console.log("tried to change items in dropdown");
              if (item.value) {
                handleFilter(item.value === "Oldest to Newest");
              }
            }}
          />
        </View>
      </View>
      <ScrollView>
        {memories.map((memory, index) => (
          <ViewTemplate
            navigation={navigation}
            data={memory}
            index={index}
            handleExitView={handleExitView}
            location={displayedAddresses[index]}
            screen={screen}
          />
        ))}
      </ScrollView>
      <FAB
        style={appJournalstyle.fab}
        color={theme.colors.TEXT}
        icon="plus"
        onPress={moveNewMemory}
      />
    </SafeAreaView>
  );
};
