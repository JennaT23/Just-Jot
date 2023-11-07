import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType, onCameraReady } from 'expo-camera';
import { GeoPoint } from "firebase/firestore";

// Custom imports
import Text from '../appStyles/customStyle';
import useThemedStyles from '../appStyles/useThemedStyles';
import useTheme from '../appStyles/useTheme';
import { PickDate } from '../app/useful/datePicker';
import { useNavigation } from '@react-navigation/native';
import { getLocation } from '../app/location/getLocation';
import { writePicsToFirebase } from '../app/firebase/writePicsToFirebase'

// Styles
import { appstyle as app_style } from '../appStyles/appstyle';
import { newEntrystyle as newEntry_style } from '../app/screens/journal/newEntry/newEntry.style';
import { entryTemplatestyle as entryTemplate_style } from './entryTemplate.style';





export const EntryTemplate = ({ navigation, entryData, pickerDisplayDate, writeToFirebase, handleExitView }) => {
    console.log("template entry: ", entryData);

    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const newEntrystyle = useThemedStyles(newEntry_style);
    const entryTemplatestyle = useThemedStyles(entryTemplate_style);

    const [title, setTitle] = useState(entryData.Title);
    const [text, setText] = useState(entryData.Text);
    const [location, setLocation] = useState(entryData.Location);
    const [entryDate, setEntryDate] = useState(new Date(entryData.Date));
    const [entryTime, setEntryTime] = useState(entryData.Date);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [imageUrl, setImageUrl] = useState(entryData.Images);

    // camera and camera roll hooks
    const [image, setImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [type, setType] = useState(CameraType.back);


    const camRef = useRef();
    const auth = getAuth()
    const user = auth.currentUser;
    const displayDate = new Date(pickerDisplayDate).toDateString();

    const showCameraScreen = () => {
        setShowCamera(true);
    }

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setEntryDate(selectedDate);
        }
        setShowDatePicker(false);
    };

    const handleTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            setEntryTime(selectedTime);
        }
        setShowTimePicker(false);
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

    function camerView() {
        return (
            <View style={entryTemplatestyle.cameraContainer} >
                <Camera style={entryTemplatestyle.camera} type={type} ref={camRef} >
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
        // code to have user enter an address and map it to a lat/lng location
    }


    const saveEntry = async () => {
        const url = await writePicsToFirebase(image);
        const geopoint = new GeoPoint(location.latitude, location.longitude);
        const uid = user.uid;
        const entry = { Date: entryDate, Location: geopoint, Title: title, Text: text, Images: url, uid: uid, id: entryData.id };
        
        writeToFirebase(entry);

        navigation.navigate('ViewEntry', { entry, handleExitView });
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
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={entryTemplatestyle.date}>
                    <Text style={entryTemplatestyle.dateText}>Date: {entryDate.toDateString()}</Text>
                    <IconButton
                        icon='calendar-edit'
                        size={30}
                        style={entryTemplatestyle.calendarIcon}
                        iconColor={theme.colors.TEXT}
                    />
                </TouchableOpacity>
                {showDatePicker && (
                    <View>
                        <DateTimePicker
                            testID='datePicker'
                            value={entryDate}
                            mode='date'
                            is24Hour={false}
                            display='spinner'
                            onChange={handleDateChange}
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
                        
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        {hasCameraPermission && showCamera ? (camerView()) : (null)}
                        <Image style={{height: 200, width: 200}} source={{uri: imageUrl}} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

