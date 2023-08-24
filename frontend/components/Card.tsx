import { View, Image, Text, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { HomepageData } from "../app/(tabs)/home";
import { Ionicons } from "@expo/vector-icons";

const Card = ({ data }: { data: HomepageData }) => {
  const router = useRouter();
  const params = useLocalSearchParams();

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
          <Image
            source={{ uri: "https://picsum.photos/100/100" }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
              color: "white",
            }}
          >
            Art Title Goes here
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
