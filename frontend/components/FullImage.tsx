import React from "react";
import { Modal, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface FullScreenImageModalProps {
  visible: boolean;
  onClose: () => void;
  imageUrl: number;
}

const FullScreenImageModal: React.FC<FullScreenImageModalProps> = ({ visible, onClose, imageUrl }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather name="x" color="#FFF" size={30} />
        </TouchableOpacity>
        <Image source={imageUrl} style={styles.fullScreenImage} resizeMode="contain" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default FullScreenImageModal;