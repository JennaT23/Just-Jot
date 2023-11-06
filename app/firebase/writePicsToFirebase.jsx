import React from 'react';
import { Alert } from 'react-native';
import { getStorage, ref, uploadBytes, getFirbase } from 'firebase/storage'
import { app } from '../../firebase'

export const writePicsToFirebase = async (image) => {
  const uri = image;
  let filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  filename = 'JournalEntries/' + filename; // save to JournalEntries folder in Firebase storage

  try {
    const response = await fetch(uploadUri);
    const blob = await response.blob(); // make image a blob
    const storage = getStorage(app)
    const storageRef = ref(storage, filename);
    uploadBytes(storageRef, blob); // store image in firebase storage
  }catch(e) {
    console.error(e);
  }
  // Alert.alert(
  //   'Photo uploaded!'
  // );
};