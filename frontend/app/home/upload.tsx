import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

	const options = {
		method: "POST",
		//baseURl
		// url: `http://localhost:8081/api/paintings`,
		//headers here
		headers: {
			Authorization: "dasdasjdasjdasjd"
		},
		content_type: "multipart/form-data",
	  };

    console.log(result);

    if (!result.canceled) {
      	
		//   let localUri = result.assets[0].uri;
		//   let filename = localUri.split('/').pop();
		//   let match = /\.(\w+)$/.exec(filename);
        // let type = match ? `image/${match[1]}` : `image`;
	  	let formData = new FormData();
    	formData.append('image', result.assets[0].uri);
		formData.append('caption', 'something')
		formData.append('name', 'lorday')
		const response = await axios.post('http://localhost:3005/api/painting', formData, options)


		
    }

	
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
	  
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
