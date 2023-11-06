import React from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage'

export const uploadImage = async (image) => {
  const { uri } = image;
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  // setUploading(true);
  // setTransferred(0);
  try {
    const storage = getStorage();
    const imageRef = ref(storage, filename);
    uploadBytes(imageRef, uploadUri);

    Alert.alert(
      'Photo uploaded!'
    );
  }catch(e) {
    console.error(e);
  }
  // const task = storage()
    // .ref(filename)
    // .putFile(uploadUri);
  // set progress state
  // task.on('state_changed', snapshot => {
  //   setTransferred(
  //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  //   );
  // });
  // try {
  //   await task;
  // } catch (e) {
  //   console.error(e);
  // }
  // setUploading(false);
  // Alert.alert(
  //   'Photo uploaded!'
  // );
  // setImage(null);
};