import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginPopup = ({ isVisible, onClose }) => {
  return (
    <Modal transparent visible={isVisible} animationType="slide">
          <View style={styles.modalBackground}>
          
          <View style={styles.popupContainer}>
            <Text>Email:</Text>
            <TextInput placeholder="Enter your email" style={styles.input} />
            <Text>Password:</Text>
            <TextInput placeholder="Enter your password" style={styles.input} secureTextEntry />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: windowWidth * 0.9, 
      height: windowHeight * 0.5,
    borderRadius:'10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: 'white',
    
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default LoginPopup;