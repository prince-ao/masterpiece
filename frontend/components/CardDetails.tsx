import React from "react";
import { useState } from 'react';
import { StyleSheet, Image, Text, View, ScrollView, SafeAreaView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import FullScreenImageModal from "./FullImage";

import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Add this import for the comment icon

const Detail = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="camera" color="#000" size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="paper-plane-o" color="#000" size={25} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
          <Image
            source={require("../assets/images/scooter.png")}
            style={styles.img}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.cont3}>
          <Text style={styles.title}>Maxx Scooter</Text>
          <Text style={styles.subtitle}>Model S1</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectutur adipsing elit, sed do eiusmod
            tempor inciduent ut labore et dolore magna
          </Text>
          <View style={styles.cont1}>
            <TouchableOpacity
              style={styles.likeBtn}
              onPress={handleLikePress}
            >
              <FontAwesome
                name={isLiked ? "heart" : "heart-o"}
                color={isLiked ? "#E2443B" : "#000"}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentIcon}>
              <MaterialIcons name="comment" color="#000" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commentsContainer}>
            <Text style={styles.commentText}>View all 42 comments</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 20,
    color: "#474747",
    marginTop: 10,
    fontFamily: "Montserrat_400Regular",
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 18,
    paddingRight: 80,
    lineHeight: 25,
  },
  btn: {
    backgroundColor: "#E2443B",
    paddingHorizontal: 60,
    paddingVertical: 12,
    borderRadius: 30,
  },
  btnText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    color: "#FFF",
  },
  cont1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  cont3: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  
  logo: {
    width: 120, // Adjust the size as needed
    height: 30, // Adjust the size as needed
  },
  
  imageContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  
  likeBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
  },
  
  modal: {
    backgroundColor: "black",
  },
  commentIcon: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  
  commentsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  
  commentText: {
    color: "#666",
  },
});






