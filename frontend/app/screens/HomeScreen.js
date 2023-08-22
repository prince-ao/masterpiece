import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Animated,
  Touchable,
  TouchableOpacity,
} from "react-native";
import LoginPopup from "./LoginPopup";


const HomeScreen = () => {
  const [animationValue] = useState(new Animated.Value(0));
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const openLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const ButtonStyle = {
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [200, 0],
        }),
      },
    ],
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/WelcomeBackground.jpg")}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={openLoginPopup}>
        <Animated.View style={[styles.loginButton, ButtonStyle]}>
          <Text style={styles.buttonText}>Login</Text>
        </Animated.View>
        <LoginPopup isVisible={showLoginPopup} onClose={closeLoginPopup} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Animated.View style={[styles.registerButton, ButtonStyle]}>
          <Text style={styles.buttonText}>Register</Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Animated.View style={[styles.Cont, ButtonStyle]}>
          <Text style={styles.buttonText}>Continue without login</Text>
        </Animated.View>
      </TouchableOpacity>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    
  },
  loginButton: {
    width: "80%",
    height: 70,
    backgroundColor: "#fc5c65",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 15,
  },
  registerButton: {
    width: "80%",
    height: 70,
    backgroundColor: "#4ecdc4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  Cont: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
