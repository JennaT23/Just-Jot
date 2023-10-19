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
import { writeJournalEntryToFirebase } from '../../firebase/writeJournalEntriesToFirebase'


export const EditEntry = ({ navigation, route }) => {

    const [title, setTitle] = useState(route.params.entry.Title);
    const [text, setText] = useState(route.params.entry.Text);

}