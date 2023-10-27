import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

// Custom imports
import Text from '../appStyles/customStyle';
import useThemedStyles from '../appStyles/useThemedStyles';
import useTheme from '../appStyles/useTheme';
import { PickDate } from '../app/useful/datePicker';
import { useNavigation } from '@react-navigation/native';

// Styles
import { appstyle as app_style } from '../appStyles/appstyle';
import { newEntrystyle as newEntry_style } from '../app/screens/newEntry/newEntry.style';
import { entryTemplatestyle as entryTemplate_style } from './entryTemplate.style';





export const EntryTemplate = ({ navigation, entryData, pickerDisplayDate, writeToFirebase }) => {
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

    // camera and camera roll hooks
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [showCamera, setShowCamera] = useState(false);


    const auth = getAuth()
    const user = auth.currentUser;
    const displayDate = new Date(pickerDisplayDate).toDateString();

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
    
        console.log("Image Picker Result:", result); // to test, remove later
    
        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                setSelectedImageUri(result.assets[0].uri);
            }
        }        
    };

    useEffect(() => {
        console.log("Selected Image URI:", selectedImageUri);
    }, [selectedImageUri]);
    
    
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
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        
            console.log("Camera Result:", result); // to test, remove later
        
            if (!result.canceled) {
                if (result.assets && result.assets.length > 0) {
                    setSelectedImageUri(result.assets[0].uri);
                }
            }        
        };
        
        

    // const getLocation = () => {

    // }

    const saveEntry = () => {
        const location = "[0 N, 0 E]"; // change to get actual geolocation
        const uid = user.uid;
        const entry = { Date: entryDate, Location: location, Title: title, Text: text, uid: uid, id: entryData.id };

        console.log("hello firebase1");
        writeToFirebase(entry);
        console.log("hello firebase2");

        navigation.navigate('ViewEntry', { entry });
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

                <TextInput value={location} onChangeText={text => setLocation(text)} style={entryTemplatestyle.cardText} placeholder='Location:' />
                <ScrollView contentContainerStyle={newEntrystyle.scrollView} style={newEntrystyle.scroll}>
                    <View style={entryTemplatestyle.textInput}>
                        <TextInput value={text} onChangeText={text => setText(text)} style={newEntrystyle.noteBody} multiline editable placeholder='Start writing...' />
                            
                    </View>

                    <View> 
                        {selectedImageUri && <Image source={{ uri: selectedImageUri }} style={newEntrystyle.selectedImage} />}

                        {hasCameraPermission && showCamera ? (
                            <Camera
                                style={{ flex: 1 }}
                                type={Camera.Constants.Type.back}
                                ref={(ref) => {
                                    setCameraRef(ref);
                                }}
                            />
                        ): (
                            <Text></Text>
                        )}
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
