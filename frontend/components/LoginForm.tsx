import axios from "axios";
import React, { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' }, 
    };
    
    const requestData = { email: email, password: password };
    
    axios.post('http://localhost:3005/api/auth/login', requestData, requestOptions)
      .then(response => {
        if (response.data) {
          storeToken(response.data.token)
          console.log('Login success');
          console.log(response.data.token);
        } else {
          console.error('Error registering:', response.data);
        }
      })
      .catch(error => {
        console.error('Request error:', error);
      });




  };

  const storeToken = async (token) => {
    try {
      await SecureStore.setItemAsync('authToken', token);
      console.log('Token stored successfully');
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/LoginImage.jpg")}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/play_store_512.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>Login to Masterpiece</Text>
          <Text style={styles.subtitle}>We're happy to see you again</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#a5a5a5"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#a5a5a5"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Text style={styles.signupLink}>Sign Up</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 36,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#a5a5a5",
    marginRight: 5,
  },
  signupLink: {
    color: "#007bff",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
});

export default LoginForm;