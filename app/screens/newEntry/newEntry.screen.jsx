import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import { newEntrystyle as newEntry_style } from './newEntry.style'
import useTheme from '../../../appStyles/useTheme'


export const NewEntry = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const newEntrystyle = useThemedStyles(newEntry_style);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const saveNote = () => {
        // code for saving to DB
    }

    return (
        <SafeAreaView style={newEntrystyle.container}>
            <View style={newEntrystyle.toolBar}>
                <IconButton
                    icon="image-plus"
                    size={30}
                    onPress={() => console.log('Pressed')}
                    style={newEntrystyle.iconButton}
                    iconColor={theme.colors.TEXT}
                />
                <IconButton
                    icon="camera"
                    size={30}
                    iconColor={theme.colors.TEXT}
                    onPress={() => console.log('Pressed')}
                    style={newEntrystyle.iconButton}
                />
                <TouchableOpacity
                    onPress={saveNote}
                    style={newEntrystyle.saveButton}>
                    <Text style={[appstyle.buttonText, newEntrystyle.buttonText]}>SAVE</Text>
                </TouchableOpacity>
            </View>
            
            <TextInput value={title} onChangeText={text => setTitle(text)} style={newEntrystyle.cardTitle} editable placeholder='Title' />
            <ScrollView contentContainerStyle={newEntrystyle.scrollView} style={newEntrystyle.scroll}>
                <View style={newEntrystyle.noteBodyContainer}>
                    <TextInput value={content} onChangeText={text => setContent(text)} style={newEntrystyle.noteBody} multiline editable placeholder='Start entry' /> 
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
