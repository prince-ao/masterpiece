import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ContentLoader from "react-native-easy-content-loader";
import { getToken } from "../../lib/store";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

interface Profile {
  username: string;
  bio: string;
  followers_count: number;
  following_count: number;
  painting_count: number;
  profile_image: string;
}

const profile = () => {
  // send a request for users profile
  const origin = "http://192.168.0.48:3005";
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  function wait(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function handleAddImage() {
    router.push("/addImage");
  }

  const galleryImages = [
    require("../../assets/images/icon.png"),
    require("../../assets/images/icon.png"),
    require("../../assets/images/icon.png"),
    require("../../assets/images/icon.png"),
    require("../../assets/images/icon.png"),
    require("../../assets/images/icon.png"),
    require("../../assets/images/icon.png"),
  ];

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: Profile } = await axios.get(
          `${origin}/api/profile`,
          {
            headers: {
              Authentication: `Bearer ${await getToken()}`,
            },
          }
        );

        setProfile(data);

        await wait(1000);

        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <SafeAreaView>
      <ContentLoader
        active
        avatar
        loading={loading}
        containerStyles={{ backgroundColor: "black" }}
      >
        {profile === undefined ? (
          <></>
        ) : (
          <View style={{ backgroundColor: "black" }}>
            <Text style={{ color: "white", fontSize: 18, margin: 10 }}>
              {profile.username}
            </Text>
            <View
              style={{
                backgroundColor: "black",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                borderBottomWidth: 1,
                borderColor: "white",
                paddingBottom: 30,
              }}
            >
              <Image
                source={require("../../assets/images/default_user.jpg")}
                style={{ width: 80, height: 80, borderRadius: 50 }}
              />
              <View>
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 14 }}
                >
                  <View>
                    <Text style={{ color: "white" }}>paintings</Text>
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {profile.painting_count}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "white" }}>followers</Text>
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {profile.followers_count}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "white" }}>following</Text>
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {profile.following_count}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#0085CA",
                    borderRadius: 5,
                    height: 30,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                  onPress={handleAddImage}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    add image
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={{ height: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                {galleryImages.map((image, index) => (
                  <Image
                    source={image}
                    key={index}
                    style={{
                      width: 120,
                      height: 120,
                      marginBottom: 10,
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </ContentLoader>
    </SafeAreaView>
  );
};

export default profile;
