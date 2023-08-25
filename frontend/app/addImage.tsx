import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { router } from "expo-router";
import { decode } from "base-64";
import base64js from "base64-js";
import { getToken } from "../lib/store";

export default function login() {
  const [pickedImage, setPickedImage] = useState<string | undefined>();
  const [img, setImg] = useState<string | undefined>();
  const [caption, setCaption] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();

  const origin = "http://3.128.192.247:3005";

  async function takeAPicture() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    setPickedImage(result.assets![0].uri);
    if (result.assets![0].base64) {
      setImg(result.assets![0].base64);
    } else {
      const img = await fetchImageFromUri(result.assets![0].uri);

      setImg(img);
    }
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

    setImg(img);
  }

  async function upload() {
    try {
      await axios.post(
        `${origin}/api/paintings`,
        {
          image: img,
          caption,
          name,
          price: Number(price),
        },
        {
          headers: {
            Authentication: `Bearer ${await getToken()}`,
          },
        }
      );
      setImg("");
      setPrice("");
      setName("");
      setCaption("");
      router.back();
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchImageFromUri(uri: string) {
    const base64Data = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64Data;
  }
  return (
    <SafeAreaView style={{ backgroundColor: "black", height: "100%" }}>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          marginTop: 40,
          marginLeft: 20,
        }}
      >
        Add image
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#0085CA",
            borderRadius: 5,
            height: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 20,
            padding: 5,
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
            padding: 5,
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
      </View>
      <Image source={{ uri: pickedImage }} style={{ width: 50, height: 50 }} />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <TextInput
          style={{ backgroundColor: "white", width: "70%", borderRadius: 4 }}
          placeholder="Name"
          placeholderTextColor="#a5a5a5"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={{ backgroundColor: "white", width: "70%", borderRadius: 4 }}
          placeholder="Caption"
          placeholderTextColor="#a5a5a5"
          value={caption}
          onChangeText={setCaption}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={{ backgroundColor: "white", width: "70%", borderRadius: 4 }}
          placeholder="Price"
          placeholderTextColor="#a5a5a5"
          value={price}
          onChangeText={setPrice}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={{ width: "70%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#0085CA",
              borderRadius: 5,
              height: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 5,
            }}
            onPress={upload}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              upload
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
