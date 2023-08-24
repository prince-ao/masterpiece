import { View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function login() {
  const [pickedImage, setPickedImage] = useState<string | undefined>();

  async function takeAPicture() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    setPickedImage(result.assets![0].uri);
    const img = await fetchImageFromUri(result.assets![0].uri);
  }

  async function uploadImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setPickedImage(result.assets![0].uri);
    const img = await fetchImageFromUri(result.assets![0].uri);
  }

  async function fetchImageFromUri(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "#0085CA",
          borderRadius: 5,
          height: 30,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 20,
        }}
        onPress={uploadImage}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          upload image
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#0085CA",
          borderRadius: 5,
          height: 30,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 20,
        }}
        onPress={takeAPicture}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          take a picture
        </Text>
      </TouchableOpacity>
      <Image source={{ uri: pickedImage }} style={{ width: 50, height: 50 }} />
    </View>
  );
}
