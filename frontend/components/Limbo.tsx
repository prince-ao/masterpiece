import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Button,
} from "react-native";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const HomeScreen = () => {
  const [animationValue] = useState(new Animated.Value(0));
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleLoginPress = () => {
    setShowLoginForm(true);
  };

  const handleRegisterPress = () => {
    setShowRegisterForm(true);
  };

  const handleContinuePress = () => {
    // Implement continue without login logic
  };

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
      source={require("../assets/images/WelcomeBackground.jpg")}
    >
      {!showLoginForm && !showRegisterForm ? (
        <View>
          <TouchableOpacity activeOpacity={0.7} onPress={handleLoginPress}>
            <Animated.View style={[styles.loginButton, ButtonStyle]}>
              <Text style={styles.buttonText}>Login</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={handleRegisterPress}>
            <Animated.View style={[styles.registerButton, ButtonStyle]}>
              <Text style={styles.buttonText}>Register</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      ) : showLoginForm ? (
        <LoginForm />
      ) : (
        <RegisterForm />
      )}
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
    marginBottom: 40,
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
