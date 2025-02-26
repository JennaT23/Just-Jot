import React from 'react';
import { Alert } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '../../firebase'

export const writePicsToFirebase = async (image, folder) => {
    let imgUrl = null;
    const uri = image;
    let filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    filename = folder + '/' + filename; // save to JournalEntries folder in Firebase storage

    try {
        const response = await fetch(uploadUri);
        const blob = await response.blob(); // make image a blob
        const storage = getStorage(app)
        const storageRef = ref(storage, filename);

        await uploadBytes(storageRef, blob); // store image in firebase storage
        imgUrl = await getDownloadURL(storageRef);
        imgUrl = imgUrl.toString();
    } catch (e) {
        console.error("couldn't save image", e);
    }
    // Alert.alert(
    //   'Photo uploaded!'
    // );

    return imgUrl;
};