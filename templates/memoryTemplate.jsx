import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType, onCameraReady } from 'expo-camera';
import { GeoPoint } from "firebase/firestore";
import * as Location from 'expo-location';

// Custom imports
import Text from '../appStyles/customStyle';
import useThemedStyles from '../appStyles/useThemedStyles';
import useTheme from '../appStyles/useTheme';
import { schedulePushNotification } from '../App';
import { writePicsToFirebase } from '../app/firebase/writePicsToFirebase'
import { getNotificationPreference } from '../app/notifications/notificationPreferences';

// Styles
import { appstyle as app_style } from '../appStyles/appstyle';
import { newEntrystyle as newEntry_style } from '../app/screens/journal/newEntry/newEntry.style';
import { entryTemplatestyle as entryTemplate_style } from './entryTemplate.style';



export const MemoryTemplate = ({ navigation, memory, writeToFirebase, handleExitView }) => {

    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const newEntrystyle = useThemedStyles(newEntry_style);
    const entryTemplatestyle = useThemedStyles(entryTemplate_style);

    const [title, setTitle] = useState(memory.Title);
    const [text, setText] = useState(memory.Text);
    const [coordinates, setCoordinates] = useState(memory.Location);
    const [searchText, setSearchText] = useState(memory.Location);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [dateCreated, setDateCreated] = useState(new Date(memory.DateCreated));
    const [dateMarked, setDateMarked] = useState(new Date(memory.DateMarked));
    const [showDateCreatedPicker, setShowDateCreatedPicker] = useState(false);
    const [showTimeCreatedPicker, setShowTimeCreatedPicker] = useState(false);
    const [showDateMarkedPicker, setShowDateMarkedPicker] = useState(false);
    const [showTimeMarkedPicker, setShowTimeMarkedPicker] = useState(false);

    // camera and camera roll hooks
    const [image, setImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [imageUrl, setImageUrl] = useState(memory.Images);

    const camRef = useRef();
    const auth = getAuth()
    const user = auth.currentUser;

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

    // ask user for access to use camera roll
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    // ask user for access to their camera
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);


    const takePicture = async () => {
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

    function camerView() {
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
        const url = image ? await writePicsToFirebase(image, 'JournalEntries') : '';
        const geopoint = new GeoPoint(coordinates.latitude, coordinates.longitude);
        const uid = user.uid;
        const newMemory = { DateCreated: dateCreated, DateMarked: dateMarked, Location: geopoint, Title: title, Text: text, Images: url, uid: uid, id: memory.id };

        console.log(dateMarked);
        const notificationPreference = await getNotificationPreference();
        if (notificationPreference === 'enabled') {
            const content = {
                title: 'Look back',
                body: title,
            };
            const trigger = new Date(dateMarked);
            await schedulePushNotification(content, trigger);
        }

        writeToFirebase(newMemory);
        navigation.navigate('ViewMemory', { newMemory, handleExitView });
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
                console.log('Search results:', location);
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
        <SafeAreaView style={[newEntrystyle.container, newEntrystyle.entryContainer]}>
            <View style={newEntrystyle.toolBar}>
                <IconButton
                    icon="image-plus"
                    size={30}
                    onPress={pickImage}
                    style={newEntrystyle.iconButton}
                    iconColor={theme.colors.TEXT}
                />
                <IconButton
                    icon="camera"
                    size={30}
                    iconColor={theme.colors.TEXT}
                    onPress={showCameraScreen}
                    style={newEntrystyle.iconButton}
                />
                <TouchableOpacity
                    onPress={saveEntry}
                    style={newEntrystyle.saveButton}>
                    <Text style={[appstyle.buttonText, newEntrystyle.buttonText]}>SAVE</Text>
                </TouchableOpacity>
            </View>
            <View style={newEntrystyle.container}>
                <TextInput value={title} onChangeText={text => setTitle(text)} style={newEntrystyle.cardTitle} editable placeholder='Add Title' />
                <View style={entryTemplatestyle.date}>
                    <Text style={entryTemplatestyle.dateText}>Created: {formatCustomDateTime(dateCreated)}</Text>
                    <TouchableOpacity onPress={() => { setShowDateCreatedPicker(true) && setShowTimeCreatedPicker(false) }}>
                        <IconButton
                            icon='calendar-edit'
                            size={30}
                            style={entryTemplatestyle.calendarIcon}
                            iconColor={theme.colors.TEXT}
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

                <View style={entryTemplatestyle.date}>
                    <Text style={entryTemplatestyle.dateText}>Marked: {formatCustomDateTime(dateMarked)}</Text>
                    <TouchableOpacity onPress={() => { setShowDateMarkedPicker(true) && setShowTimeMarkedPicker(false) }}>
                        <IconButton
                            icon='calendar-edit'
                            size={30}
                            style={entryTemplatestyle.calendarIcon}
                            iconColor={theme.colors.TEXT}
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

                {/* <TouchableOpacity style={entryTemplatestyle.date} onPress={() => chooseLocation()}>
                    <Text style={entryTemplatestyle.dateText}>Location: {formatGeoPoint(location)}</Text>
                    <IconButton
                        icon='map-marker-outline'
                        size={30}
                        iconColor={theme.colors.TEXT}
                    />
                </TouchableOpacity> */}

                <View>
                    <View style={entryTemplatestyle.date}>
                        <TextInput
                            placeholder="Search address..."
                            value={searchText}
                            onChangeText={handleTextChange}
                            style={entryTemplatestyle.dateText}
                        />
                        <IconButton
                            icon='map-search-outline'
                            size={30}
                            iconColor={theme.colors.TEXT}
                            style={entryTemplatestyle.search}
                            onPress={handleSearch}
                        />
                    </View>
                    {searchResults.length > 0 && (
                        <ScrollView style={entryTemplatestyle.searchResults} contentContainerStyle={{ minHeight: 10 }}>
                            {searchResults.map((result, index) => {
                                console.log(`Rendering result ${index}:`, result);
                                const infoText = `Latitude: ${result.latitude}, Longitude: ${result.longitude}`;
                                return (
                                    <Pressable
                                        key={index}
                                        onPress={() => selectLocation(result)}
                                        style={entryTemplatestyle.searchItems}
                                    >
                                        <Text>{infoText}</Text>
                                    </Pressable>
                                );
                            })}
                        </ScrollView>
                    )}
                </View>

                <ScrollView contentContainerStyle={newEntrystyle.scrollView} style={newEntrystyle.scroll}>
                    <View style={entryTemplatestyle.textInput}>
                        <TextInput value={text} onChangeText={text => setText(text)} style={newEntrystyle.noteBody} multiline editable placeholder='Start writing...' />

                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        {imageUrl && <Image style={{ height: 200, width: 200 }} source={{ uri: imageUrl }} />}
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}