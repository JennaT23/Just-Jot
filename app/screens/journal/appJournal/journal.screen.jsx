import React, { useState, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appJournalStyle as appJournal_style } from "./journal.style";
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
import { fetchJournalEntriesFromFirebase } from "../../../firebase/fetchJournalEntriesFromFirebase";
import { newEntrystyle as newEntry_style } from "../newEntry/newEntry.style";
import useTheme from "../../../../appStyles/useTheme";
import { getLocation } from "../../../location/getLocation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { displayAddress } from "../../../location/geocode";
import ModalDropdown from "react-native-modal-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import Pagination from "react-native-pagination";
import { JournalEntry } from "./journalEntry";

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
    const [sortByOldest, setSortByOldest] = useState(true);
    const [refreshData, setRefreshData] = useState(0);
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [displayedAddresses, setDisplayedAddresses] = useState([]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);

    // grab journal entries from firebase and display them on login
    const fetchJournalEntries = async () => {
        try {
            const entries = await fetchJournalEntriesFromFirebase();
            setJournalEntries(entries);
        } catch (error) {
            console.log("Error fetching", error);
        }
    };

    useEffect(() => {
        if (user) {
            setUsername(user.displayName);
        }
        fetchJournalEntries();
    }, [refreshData]);

    const fetchAndDisplayAddresses = async () => {
        const addresses = await Promise.all(
            journalEntries.map(async (entry) => {
                const address = await displayAddress(entry.Location);
                return address;
            })
        );
        setDisplayedAddresses(addresses);
    };

    useEffect(() => {
        fetchAndDisplayAddresses();
    }, [journalEntries]);

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

    // to handle filtering certain journal entries
    const handleFilter = (oldestToNewest) => {
        const sortedEntries = [...journalEntries].sort((a, b) => {
            const dateA = new Date(a.Date);
            const dateB = new Date(b.Date);
            return oldestToNewest ? dateA - dateB : dateB - dateA;
        });
        setJournalEntries(sortedEntries);
        setSelectedFilterIndex(oldestToNewest ? 0 : 1);
        setFilterModalVisible(false);
    };

    // to handle searching through the entries
    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setIsSearching(false);    // if query is empty, make sure it's not searching still
            fetchJournalEntries();
        } else {
            setIsSearching(true);     // if query isn't empty, make sure it performs the search
            const filteredEntries = journalEntries.filter((entry) => {  // so far it searches for the word in entry title and entry contents, can change later
                const entryTitle = entry.Title.toLowerCase();
                const entryText = entry.Text.toLowerCase();
                const query = searchQuery.toLowerCase();
                return entryTitle.includes(query) || entryText.includes(query);
            });
            setJournalEntries(filteredEntries);
        }
    };

    // handle what happens when the search textfield is cleared
    const handleClearSearch = () => {
        setSearchQuery("");       // clear search query
        setIsSearching(false);    // stop searching when false
        fetchJournalEntries();    // reset journal entsries
    };

    function formatDate(date) {
        if (!(date instanceof Date)) {
            throw new Error("Invalid date object");
        }

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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


    /////////////////////////////////////////////////////////////////////////////////////////////////
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentPage(journalEntries.slice(itemOffset, endOffset));
        setTotalPages(Math.ceil(journalEntries / itemsPerPage));
    }, [itemOffset, itemsPerPage, journalEntries]);
    // const pageCount = Math.ceil(journalEntries.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % journalEntries.length;
        setItemOffset(newOffset);
    }

    // const [currentItems, setCurrentItems] = useState(0);
    // const [pageCount, setPageCount] = useState(0);
    // const [itemOffset, setItemOffset] = useState(0);
    // const itemsPerPage = 10;

    // const handlePageClick = (event) => {
    //     const newOffset = (event.selected * itemsPerPage) % journalEntries.length;
    //     setItemOffset(newOffset);
    // }



    return (
        <SafeAreaView style={appJournalstyle.container}>
            <View>
                <Text style={appJournalstyle.journalTitle}>Hello {username}!</Text>
            </View>
            <View style={appJournalstyle.header}>
                <View style={appJournalstyle.searchBarContainer}>
                    <TextInput
                        style={{ color: theme.colors.TEXT, textShadowColor: theme.colors.SUBHEADING, ...appJournalstyle.searchBar }}
                        placeholder="Search..."
                        placeholderTextColor={theme.colors.SUBHEADING}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                    <TouchableOpacity
                        onPress={handleSearch}
                    >
                        <MaterialCommunityIcons name="magnify" size={24} color={theme.colors.TEXT} />
                    </TouchableOpacity>
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={handleClearSearch}>
                            <Text>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ModalDropdown
                    options={["Oldest to Newest", "Newest to Oldest"]}
                    defaultValue="Sort By"
                    style={appJournalstyle.ModalDropdownOption}
                    dropdownStyle={{ width: 150, marginTop: -15 }}
                    dropdownTextStyle={{ fontSize: 16 }}
                    onSelect={(index, value) => handleFilter(index === 0)}
                    showsVerticalScrollIndicator={false}
                    onDropdownWillShow={() => setFilterModalVisible(true)}
                    onDropdownWillHide={() => setFilterModalVisible(false)}
                >
                    {/* <IconButton
                        icon="filter"
                        style={{color: theme.colors.TEXT, ...appJournalstyle.iconButton}}
                        // color={theme.colors.TEXT}
                    /> */}
                    <FAB style={appJournalstyle.iconButton} color={theme.colors.TEXT} icon="filter" onSelect />
                </ModalDropdown>
            </View>
            <ScrollView>
                {journalEntries.map((entry, index) => (
                    <JournalEntry
                        navigation={navigation}
                        entry={entry}
                        index={index}
                        handleExitView={handleExitView}
                        title={entry.Title}
                        date={formatDate(new Date(entry.Date))}
                        location={displayAddress[index]}
                        text={entry.Text}
                        image={entry.Images}
                    />
                ))}
            </ScrollView>
            <FAB style={appJournalstyle.fab} icon="plus" onPress={moveNewEntry} />
{/*             
            <Pagination
                total={totalPages} // Total number of pages
                current={currentPage} // Current page
                display={5} // Number of pages to display in the pagination bar
                onPageChange={handlePageClick} // Callback when a page is selected
                containerStyle={{ paddingVertical: 20 }} // Style for the pagination container
                textStyles={{ color: theme.colors.TEXT }} // Styles for text
                selectedTextStyles={{ color: theme.colors.BUTTON_COLOR }} // Styles for selected text
            />

            <ScrollView>
                {journalEntries
                    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                    .map((entry, index) => (
                        <Card key={index} style={appJournalstyle.card}>
                            <Card.Content>
                                <TouchableOpacity onPress={() => handleView(entry)}>
                                    <Title style={appJournalstyle.title}>{entry.Title}</Title>
                                    <Subheading style={appJournalstyle.subheading}>{entry.Date && formatDate(new Date(entry.Date))}</Subheading>
                                    <Subheading style={appJournalstyle.subheading}>Location: {displayedAddresses[index]}</Subheading>
                                    <Paragraph style={{ color: theme.colors.TEXT }}>{entry.Text}</Paragraph>
                                    <Image
                                        style={{ height: 200, width: 200 }}
                                        source={{ uri: entry.Images }}
                                    />
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>
                    ))}
            </ScrollView> */}

            {/* <Pagination
                breakLabel={<Text>{"..."}</Text>}
                nextLabel={<Text>{"next >"}</Text>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel={<Text>{"< previous"}</Text>}
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
            /> */}

            <FAB style={appJournalstyle.fab} color={theme.colors.TEXT} icon="plus" onPress={moveNewEntry} />
        </SafeAreaView>
    );
};
