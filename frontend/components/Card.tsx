import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { HomepageData } from "../app/(tabs)/home";
import { Ionicons } from "@expo/vector-icons";

interface CardProps {
  data: HomepageData;
  onPressProfile: () => void;
}

const Card: React.FC<CardProps> = ({ data, onPressProfile }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        marginBottom: 10,
        width: "100%",
      }}
    >
      <View style={{ width: "100%", height: 400 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
            marginTop: 10,
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={onPressProfile}>
            <Image
              source={{ uri: "https://picsum.photos/100/100" }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
              color: "white",
            }}
          >
            {data.name}
          </Text>
        </View>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={{ width: "100%", height: 300, marginTop: 10 }}
        />
        <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            color="white"
            size={30}
            style={{ marginTop: 5, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;