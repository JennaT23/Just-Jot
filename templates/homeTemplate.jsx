import React, { useState, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appJournalStyle as appJournal_style } from "../app/screens/journal/appJournal/journal.style";
import { appstyle as app_style } from "../appStyles/appstyle";
import { getAuth } from "firebase/auth";
import Text from "../appStyles/customStyle";
import useThemedStyles from "../appStyles/useThemedStyles";
import {
    Card,
    Title,
    Paragraph,
    Button,
    FAB,
    Subheading,
    IconButton,
} from "react-native-paper";
import { newEntrystyle as newEntry_style } from "../app/screens/journal/newEntry/newEntry.style";
import useTheme from "../appStyles/useTheme";
import { getLocation } from "../app/location/getLocation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { displayAddress } from "../app/location/geocode";
import DropDownPicker from "react-native-dropdown-picker";
// import Pagination from "react-native-pagination";
import { JournalEntry } from "../app/screens/journal/appJournal/journalEntry";
import { ViewTemplate } from "./viewTemplate";

export const HomeTemplate = ({ navigation, fetchFromFirebase, screen, newEntry }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const appJournalstyle = useThemedStyles(appJournal_style);
    const newEntrystyle = useThemedStyles(newEntry_style);

    const auth = getAuth();
    const user = auth.currentUser;

    const [username, setUsername] = useState("");
    const [entries, setEntries] = useState([]);
    const [sortByOldest, setSortByOldest] = useState(true);
    const [refreshData, setRefreshData] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [displayedAddresses, setDisplayedAddresses] = useState([]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);

    // filter stuff
    const [selectedFilter, setSelectedFilter] = useState(null);

    // grab journal entries from firebase and display them on login
    const fetchEntries = async () => {
        try {
            const entries = await fetchFromFirebase();
            setEntries(entries);
        } catch (error) {
            console.log("Error fetching", error);
        }
    };

    useEffect(() => {
        if (user) {
            setUsername(user.displayName);
        }
        fetchEntries();
    }, [refreshData]);

    const fetchAndDisplayAddresses = async () => {
        const addresses = await Promise.all(
            entries.map(async (entry) => {
                const address = await displayAddress(entry.Location);
                return address;
            })
        );
        setDisplayedAddresses(addresses);
    };

    useEffect(() => {
        fetchAndDisplayAddresses();
    }, [entries]);

    const handleExitView = () => {
        navigation.navigate("NavBar");
        setRefreshData((prev) => prev + 1);
    };

    const moveNewEntry = () => {
        let newEntry;
        if (screen === "journal") {
            newEntry = {
                Text: "",
                Title: "",
                Location: null,
                Images: "",
                DateCreated: new Date(),
                uid: user.uid,
            };
        }
        else if (screen === "memory") {
            newEntry = {
                Text: "",
                Title: "",
                Location: null,
                Images: "",
                DateCreated: new Date(),
                DateMarked: new Date(),
                uid: user.uid,
            };
        }
        if (screen === "journal")
            navigation.navigate("NewEntry", { newEntry, screen, handleExitView });
        else if (screen === "memory")
            navigation.navigate("NewMemory", { newEntry, screen, handleExitView });
    };

    const handleFilter = (oldestToNewest) => {
        Alert.alert("Dropdown clicked");
        const sortedEntries = [...entries].sort((a, b) => {
            const dateA = new Date(a.DateCreated);
            const dateB = new Date(b.DateCreated);
            return oldestToNewest ? dateA - dateB : dateB - dateA;
        });
        setEntries(sortedEntries);
        setSelectedFilter(oldestToNewest ? "Oldest to Newest" : "Newest to Oldest");
    };

    // to handle searching through the entries
    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setIsSearching(false); // if query is empty, make sure it's not searching still
            fetchEntries();
        } else {
            setIsSearching(true); // if query isn't empty, make sure it performs the search
            const filteredEntries = entries.filter((entry) => {
                // so far it searches for the word in entry title and entry contents, can change later
                const entryTitle = entry.Title.toLowerCase();
                const entryText = entry.Text.toLowerCase();
                const query = searchQuery.toLowerCase();
                return entryTitle.includes(query) || entryText.includes(query);
            });
            setEntries(filteredEntries);
        }
    };

    // handle what happens when the search textfield is cleared
    const handleClearSearch = () => {
        setSearchQuery(""); // clear search query
        setIsSearching(false); // stop searching when false
        fetchEntries(); // reset journal entsries
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
        if (screen === "journal")
            navigation.navigate("ViewEntry", { entry, screen, handleExitView });
        else if (screen === "memory")
            navigation.navigate("ViewMemory", { entry, screen, handleExitView });
    };

    const message = "Ready to jot down today's reflections? \n Your thoughts are waiting!";

    return (
        <SafeAreaView style={appJournalstyle.container}>
            <View style={appJournalstyle.headingContainer}>
            <Text style={appJournalstyle.journalTitle}>Welcome {username}!</Text>
            <Text style={appJournalstyle.journalMessage}>{message}</Text> 
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
            <ScrollView style={appJournalstyle.scrollView}>
                {entries.map((entry, index) => (
                    <ViewTemplate
                        navigation={navigation}
                        data={entry}
                        index={index}
                        handleExitView={handleExitView}
                        location={displayAddress[index]}
                        screen={screen}
                    />
                ))}
            </ScrollView>
            <FAB
                style={appJournalstyle.fab}
                color={theme.colors.TEXT}
                icon="plus"
                onPress={moveNewEntry}
            />
        </SafeAreaView>
    );
}