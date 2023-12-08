import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Pressable, Image, KeyboardAvoidingView, Modal, Alert, Dimensions } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType, onCameraReady } from 'expo-camera';
import { GeoPoint } from "firebase/firestore";
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
// Custom imports
import Text from '../appStyles/customStyle';
import useThemedStyles from '../appStyles/useThemedStyles';
import useTheme from '../appStyles/useTheme';
import { schedulePushNotification } from '../App';
import { writePicsToFirebase } from '../app/firebase/writePicsToFirebase'
import { getNotificationPreference } from '../app/notifications/notificationPreferences';
import { displayAddress } from '../app/location/geocode';

// Styles
import { appstyle as app_style } from '../appStyles/appstyle';
import { newEntrystyle as newEntry_style } from '../app/screens/journal/newEntry/newEntry.style';
import { entryTemplatestyle as entryTemplate_style } from './entryTemplate.style';
import { editTemplateStyle as editTemplate_style } from './editTemplate.style'



export const EditTemplate = ({ navigation, data, screen, writeToFirebase, handleExitView }) => {

    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const newEntrystyle = useThemedStyles(newEntry_style);
    const entryTemplatestyle = useThemedStyles(entryTemplate_style);
    const editTemplatestyle = editTemplate_style(theme, screen);
    // const editTemplatestyle = useThemedStyles(editTemplate_style);


    const [title, setTitle] = useState(data.Title);
    const [text, setText] = useState(data.Text);
    const [coordinates, setCoordinates] = useState(data.Location);
    const [searchText, setSearchText] = useState(data.Location);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [dateCreated, setDateCreated] = useState(new Date(data.DateCreated));
    const [dateMarked, setDateMarked] = useState(new Date(data.DateMarked));
    const [showDateCreatedPicker, setShowDateCreatedPicker] = useState(false);
    const [showTimeCreatedPicker, setShowTimeCreatedPicker] = useState(false);
    const [showDateMarkedPicker, setShowDateMarkedPicker] = useState(false);
    const [showTimeMarkedPicker, setShowTimeMarkedPicker] = useState(false);

    // camera and camera roll hooks
    const [image, setImage] = useState(data.Images);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [type, setType] = useState(CameraType.back);

    const camRef = useRef();
    const auth = getAuth()
    const user = auth.currentUser;

    const fetchAndDisplayAddress = async () => {
        const address = await displayAddress(coordinates);
        setSearchText(address);
    };

    useEffect(() => {
        fetchAndDisplayAddress();
    }, [coordinates]);

    const showCameraScreen = () => {
        setShowCamera(true);
    }

    const handleDateCreatedChange = (event, selectedDate) => {
        if (selectedDate || event.type === 'dismissed') {
            setDateCreated(selectedDate);

            setShowDateCreatedPicker(false);
            setShowTimeCreatedPicker(true);
        }
    };

    const handleTimeCreatedChange = (event, selectedDate) => {
        if (selectedDate || event.type === 'dismissed') {
            setDateCreated(selectedDate);

            setShowTimeCreatedPicker(false);
        }
    };

    const handleDateMarkedChange = (event, selectedDate) => {
        if (selectedDate || event.type === 'dismissed') {
            setDateMarked(selectedDate);

            setShowDateMarkedPicker(false);
            setShowTimeMarkedPicker(true);
        }
    };

    const handleTimeMarkedChange = (event, selectedDate) => {
        if (selectedDate || event.type === 'dismissed') {
            setDateMarked(selectedDate);

            setShowTimeMarkedPicker(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            }
        }
    };

    useFocusEffect(
        React.useCallback(() => {

            (async () => {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            })();

            (async () => {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(status === 'granted');
            })();
        }, [])
    );


    const takePicture = async () => {
        // console.log("cameraRef: ", camRef);
        if (camRef) {
            let photo = await camRef.current.takePictureAsync();
            setImage(photo.uri);
            setShowCamera(false);
        }
    }


    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const closeCamera = () => {
        setShowCamera(false);
    }

    function cameraView() {
        return (
            <View style={entryTemplatestyle.cameraContainer} >
                <Camera style={entryTemplatestyle.camera} type={type} ref={camRef} >
                    <TouchableOpacity style={entryTemplatestyle.cancelContainer} onPress={closeCamera}>
                        <Text style={entryTemplatestyle.cancelButton}>X</Text>
                    </TouchableOpacity>
                    <View style={entryTemplatestyle.cameraButtonContainer}>
                        <IconButton
                            icon="camera-flip"
                            size={40}
                            onPress={toggleCameraType}
                            style={newEntrystyle.iconButton}
                            iconColor={theme.colors.CAPTURE}
                        />
                        <IconButton
                            icon="circle"
                            size={40}
                            onPress={takePicture}
                            style={newEntrystyle.iconButton}
                            iconColor={theme.colors.CAPTURE}
                        />
                    </View>
                </Camera>
            </View>
        );
    }


    const chooseLocation = () => {

    }


    const saveEntry = async () => {
        let folder;
        if (screen === 'memory') {
            folder = 'Memories';
        }
        else if (screen === 'journal') {
            folder = 'JournalEntries';

        }
        else {
            Alert.alert('Error saving data');
            return;
        }
        const url = image ? await writePicsToFirebase(image, folder) : '';
        const geopoint = new GeoPoint(coordinates.latitude, coordinates.longitude);
        const address = await displayAddress(coordinates);
        console.log("addr: ", address);
        const uid = user.uid;
        const newData = { DateCreated: dateCreated, DateMarked: dateMarked, Location: geopoint, Address: address, Title: title, Text: text, Images: url, uid: uid, id: data.id };

        // console.log(dateMarked);
        const notificationPreference = await getNotificationPreference();
        if (notificationPreference === 'enabled') {
            const content = {
                title: 'Look back',
                body: title,
            };
            const trigger = new Date(dateMarked);
            await schedulePushNotification(content, trigger);

            const oneYearAgo = new Date(dateCreated);
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() + 1);

            const contentOneYearAgo = {
                title: 'On This Day One Year Ago',
                body: title,
            };

            await schedulePushNotification(contentOneYearAgo, oneYearAgo);
        }

        writeToFirebase(newData);

        let homeScreen;
        if (screen === 'memory') {
            homeScreen = 'Memories';
        }
        else if (screen === 'journal') {
            homeScreen = 'Journal';

        }
        else {
            Alert.alert('Error with navigation');
            return;
        }
        handleExitView();
        navigation.navigate('NavBar');
    }

    // const formattedTime = entryTime.toLocaleTimeString('en-US', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    // });


    const formatCustomDateTime = (dateTime) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const day = days[dateTime.getDay()];
        const month = months[dateTime.getMonth()];
        const date = dateTime.getDate();
        const year = dateTime.getFullYear();

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        return `${day} ${month} ${date} ${year} ${formattedTime}`;
    }

    const formatGeoPoint = (geopoint) => {
        const lat = geopoint.latitude.toString();
        const lng = geopoint.longitude.toString();

        const formattedLocation = "[" + lat + ", " + lng + "]";
        return formattedLocation;
    }

    const handleSearch = async () => {
        try {
            let location = await Location.geocodeAsync(searchText);

            if (location && location.length > 0) {
                setSearchResults(prevResults => [...prevResults, ...location]);
                // console.log('Search results:', location);
            } else {
                console.warn('No results found for the given address');
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error during geocoding:', error);
        }
    };

    const selectLocation = (selected) => {
        setSelectedLocation(selected.name || '');
        setCoordinates({ latitude: selected.latitude, longitude: selected.longitude });
        setSearchResults([]);
        setSearchText(`${selected.latitude}, ${selected.longitude}`);
    };

    const handleTextChange = (text) => {
        setSearchText(text);
        setSelectedLocation(null);
    }


    return (
        <SafeAreaView style={editTemplatestyle.pageContainer}>
            <View style={editTemplatestyle.toolBar}>
                <IconButton
                    icon="image-plus"
                    size={30}
                    onPress={pickImage}
                    style={editTemplatestyle.iconButton}
                    iconColor={theme.colors.TEXT}
                />
                <IconButton
                    icon="camera"
                    size={30}
                    iconColor={theme.colors.TEXT}
                    onPress={() => { setShowCamera(true) }}
                    style={editTemplatestyle.iconButton}
                />
                <TouchableOpacity
                    onPress={saveEntry}
                    style={editTemplatestyle.saveButton}>
                    <Text style={[appstyle.buttonText, editTemplatestyle.buttonText]}>SAVE</Text>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={200} style={editTemplatestyle.content}>
                <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive" nestedScrollEnabled={true}>
                    <View style={editTemplatestyle.card}>
                        <View style={editTemplatestyle.titleContainer}>
                            <Text style={editTemplatestyle.label}>Title:</Text>
                            <View style={editTemplatestyle.textBox}>
                                <TextInput
                                    placeholder='New Entry'
                                    placeholderTextColor={theme.colors.SUBHEADING}
                                    value={title}
                                    onChangeText={text => setTitle(text)}
                                    style={editTemplatestyle.textInput}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={editTemplatestyle.dateContainer}>
                                <Text style={editTemplatestyle.label}>Date Created:</Text>
                                <TouchableOpacity style={editTemplatestyle.textBox} onPress={() => { setShowDateCreatedPicker(true) && setShowTimeCreatedPicker(false) }}>
                                    <TextInput
                                        value={formatCustomDateTime(dateCreated)}
                                        style={editTemplatestyle.textInput}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            </View>
                            {showDateCreatedPicker && (
                                <View>
                                    <DateTimePicker
                                        testID='datePicker'
                                        value={dateCreated}
                                        mode='date'
                                        is24Hour={false}
                                        display='spinner'
                                        onChange={handleDateCreatedChange}
                                    />
                                </View>
                            )}
                            {showTimeCreatedPicker && (
                                <View>
                                    <DateTimePicker
                                        testID='timePicker'
                                        value={dateCreated}
                                        mode='time'
                                        is24Hour={false}
                                        display='clock'
                                        onChange={handleTimeCreatedChange}
                                    />
                                </View>
                            )}
                        </View>
                        {screen === 'memory' && (
                            <View>
                                <View style={editTemplatestyle.dateContainer}>
                                    <Text style={editTemplatestyle.label}>Notification Date:</Text>
                                    <TouchableOpacity style={editTemplatestyle.textBox} onPress={() => { setShowDateMarkedPicker(true) && setShowTimeMarkedPicker(false) }}>
                                        <TextInput
                                            value={formatCustomDateTime(dateMarked)}
                                            style={editTemplatestyle.textInput}
                                            editable={false}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {showDateMarkedPicker && (
                                    <View>
                                        <DateTimePicker
                                            testID='datePicker'
                                            value={dateMarked}
                                            mode='date'
                                            is24Hour={false}
                                            display='spinner'
                                            onChange={handleDateMarkedChange}
                                        />
                                    </View>
                                )}
                                {showTimeMarkedPicker && (
                                    <View>
                                        <DateTimePicker
                                            testID='timePicker'
                                            value={dateMarked}
                                            mode='time'
                                            is24Hour={false}
                                            display='clock'
                                            onChange={handleTimeMarkedChange}
                                        />
                                    </View>
                                )}
                            </View>
                        )}
                        <View>
                            <View style={editTemplatestyle.dateContainer}>
                                <Text style={editTemplatestyle.label}>Location:</Text>
                                <View style={editTemplatestyle.textBox}>
                                    <TextInput
                                        placeholder="Search address..."
                                        placeholderTextColor={theme.colors.SUBHEADING}
                                        value={searchText}
                                        onChangeText={handleTextChange}
                                        onSubmitEditing={handleSearch}
                                        style={editTemplatestyle.textInput}
                                    />
                                </View>
                            </View>
                            {searchResults.length > 0 && (
                                <ScrollView style={editTemplatestyle.searchResults} contentContainerStyle={{ minHeight: 10 }}>
                                    {searchResults.map((result, index) => {
                                        // console.log(`Rendering result ${index}:`, result);
                                        const infoText = `Latitude: ${result.latitude}, Longitude: ${result.longitude}`;
                                        return (
                                            <Pressable
                                                key={index}
                                                onPress={() => selectLocation(result)}
                                                style={editTemplatestyle.searchItems}
                                            >
                                                <Text>{infoText}</Text>
                                            </Pressable>
                                        );
                                    })}
                                </ScrollView>
                            )}
                        </View>
                        <View style={editTemplatestyle.entryContainer}>
                            <Text style={editTemplatestyle.label}>Entry:</Text>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={200} style={editTemplatestyle.scrollContainer}>
                                <ScrollView contentContainerStyle={editTemplatestyle.scrollView} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive" nestedScrollEnabled={true}>
                                    <View style={editTemplatestyle.entry}>
                                        <TextInput value={text} onChangeText={text => setText(text)} style={[editTemplatestyle.textInput, editTemplatestyle.entryText]} multiline editable placeholder='Start writing...' placeholderTextColor={theme.colors.SUBHEADING} />

                                        {image && <Image source={{ uri: image }} style={editTemplatestyle.image} />}
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <Modal
                style={editTemplatestyle.cameraModalContainer}
                visible={showCamera}
                onRequestClose={closeCamera}
            >
                {cameraView()}
            </Modal>

        </SafeAreaView>
    )
}