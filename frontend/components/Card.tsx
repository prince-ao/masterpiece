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
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/profilepage",
              params: { user_id: (data as any).user_id },
            });
          }}
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
            source={require("../assets/images/default_user.jpg")}
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
            {(data as any).username}
          </Text>
        </TouchableOpacity>
        <Image
          source={{ uri: (data as any).image_url }}
          style={{ width: "100%", height: 300, marginTop: 10 }}
        />
        <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            color="white"
            size={30}
            style={{ marginTop: 5, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
