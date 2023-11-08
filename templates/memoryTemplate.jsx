import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { GeoPoint } from "firebase/firestore";

// Custom imports
import Text from '../appStyles/customStyle';
import useThemedStyles from '../appStyles/useThemedStyles';
import useTheme from '../appStyles/useTheme';
import { PickDate } from '../app/useful/datePicker';
import { useNavigation } from '@react-navigation/native';
import { getLocation } from '../app/location/getLocation';
import { schedulePushNotification } from '../App';

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
    const [location, setLocation] = useState(memory.Location);
    const [dateCreated, setDateCreated] = useState(new Date(memory.DateCreated));
    const [dateMarked, setDateMarked] = useState(new Date(memory.DateMarked));
    const [timeCreated, setTimeCreated] = useState(memory.DateCreated);
    const [timeMarked, setTimeMarked] = useState(memory.DateMarked);
    const [showDateCreatedPicker, setShowDateCreatedPicker] = useState(false);
    const [showTimeCreatedPicker, setShowTimeCreatedPicker] = useState(false);
    const [showDateMarkedPicker, setShowDateMarkedPicker] = useState(false);
    const [showTimeMarkedPicker, setShowTimeMarkedPicker] = useState(false);

    // camera and camera roll hooks
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [showCamera, setShowCamera] = useState(false);

    const auth = getAuth()
    const user = auth.currentUser;

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
                setSelectedImageUri(result.assets[0].uri);
            }
        }
    };

    // useEffect(() => {
    //     console.log("Selected Image URI:", selectedImageUri);
    // }, [selectedImageUri]);


    // supposed to ask user for access to use camera roll
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    // supposed to ask user for access to their camera
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        setShowCamera(true);
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
            setSelectedImageUri(photo.uri);
        }
    };

    const chooseLocation = () => {
        // code to have user enter an address and map it to a lat/lng location
    }


    const saveEntry = async () => {
        const geopoint = new GeoPoint(location.latitude, location.longitude);

        const uid = user.uid;
        const newMemory = { DateCreated: dateCreated, DateMarked: dateMarked, Location: geopoint, Title: title, Text: text, uid: uid, id: memory.id };

        console.log(dateMarked);
        await schedulePushNotification({ title: 'Look back', body: { title } }, new Date(dateMarked));

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
                    onPress={takePicture}
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
                        //onChange='dismissed'
                        //onBlur={handleDateCreatedOnBlur}
                        />
                    </View>
                )}
                {/* {showTimeCreatedPicker && (
                    <View>
                        <DateTimePicker
                            testID='timePicker'
                            value={dateCreated}
                            mode='time'
                            is24Hour={false}
                            display='clock'
                            // onChange={handleTimeCreatedChange}
                            onChange='dismissed'
                        //onBlur={handleTimeCreatedOnBlur}
                        />
                    </View>
                )} */}

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
                        //onBlur={handleDateMarkedOnBlur}
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
                        // onBlur={handleTimeMarkedOnBlur}
                        />
                    </View>
                )}

                <TouchableOpacity style={entryTemplatestyle.date} onPress={() => chooseLocation()}>
                    <Text style={entryTemplatestyle.dateText}>Location: {formatGeoPoint(location)}</Text>
                    <IconButton
                        icon='map-marker-outline'
                        size={30}
                        iconColor={theme.colors.TEXT}
                    />
                </TouchableOpacity>

                <ScrollView contentContainerStyle={newEntrystyle.scrollView} style={newEntrystyle.scroll}>
                    <View style={entryTemplatestyle.textInput}>
                        <TextInput value={text} onChangeText={text => setText(text)} style={newEntrystyle.noteBody} multiline editable placeholder='Start writing...' />

                        {selectedImageUri && <Image source={{ uri: selectedImageUri }} style={newEntrystyle.selectedImage} />}

                        {hasCameraPermission && showCamera && (
                            <Camera
                                style={{ flex: 1 }}
                                type={Camera.Constants.Type.back}
                                ref={(ref) => {
                                    setCameraRef(ref);
                                }}
                            />
                        )}
                    </View>


                </ScrollView>
            </View>
        </SafeAreaView>
    );
}