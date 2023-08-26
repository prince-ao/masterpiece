import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { Profile } from "../app/(tabs)/profile";
import axios, { AxiosError } from "axios";
import { RefreshControl } from "react-native-gesture-handler";
import { getToken, removeToken } from "../lib/store";
import { Ionicons } from "@expo/vector-icons";

const ProfilePage = ({
  loading,
  profile,
  hasAddImage = false,
  galleryImages,
  user_id,
  update,
}: {
  loading: boolean;
  profile: Profile;
  hasAddImage: boolean;
  galleryImages: string[];
  user_id: string | undefined;
  update: () => any;
}) => {
  const origin = "http://3.128.192.247:3005";
  const [followColor, setFollowColor] = useState("#0085CA");
  const [textColor, setTextColor] = useState("white");
  const [refreshing, setRefreshing] = useState(false);

  function handleAddImage() {
    router.push("/addImage");
  }

  async function handleFollow() {
    try {
      await axios.post(
        `${origin}/api/follow/${user_id}`,
        {},
        {
          headers: {
            Authentication: `Bearer ${await getToken()}`,
          },
        }
      );
    } catch (e: any) {
      console.log((e as AxiosError).response!.data);
    }

    setFollowColor("white");
    setTextColor("black");
  }

  function wait(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await update();
    await wait(500);
    setRefreshing(false);
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        height: Dimensions.get("screen").height,
      }}
    >
      <ContentLoader
        active
        avatar
        loading={loading}
        containerStyles={{
          backgroundColor: "black",
          height: Dimensions.get("screen").height,
        }}
      >
        {profile === undefined ? (
          <></>
        ) : (
          <View style={{ backgroundColor: "black", height: "100%" }}>
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
              <View style={{}}>
                <Image
                  source={require("../assets/images/default_user.jpg")}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    marginTop: 35,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    margin: 10,
                  }}
                >
                  {profile.username}
                </Text>
              </View>
              <View style={{ display: "flex" }}>
                {hasAddImage ? (
                  <TouchableOpacity
                    onPress={async () => {
                      await removeToken();
                      router.replace("/limbo");
                    }}
                  >
                    <Ionicons
                      name="log-out-outline"
                      color="white"
                      style={{ fontSize: 30, alignSelf: "flex-end" }}
                    />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 14 }}
                >
                  <View>
                    <Text style={{ color: "white" }}>Paintings</Text>
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {profile.painting_count}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "white" }}>Followers</Text>
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {profile.followers_count}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "white" }}>Following</Text>
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {profile.following_count}
                    </Text>
                  </View>
                </View>
                {hasAddImage ? (
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
                      Add Painting
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: followColor,
                      borderRadius: 5,
                      height: 30,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                    onPress={handleFollow}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: textColor,
                        textAlign: "center",
                      }}
                    >
                      {followColor === "white" ? "unfollow" : "follow"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <ScrollView style={{ height: 800 }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: 10,
                  gap: 15,
                }}
              >
                {galleryImages === undefined ? (
                  <></>
                ) : (
                  galleryImages!.map((image, index) => {
                    console.log(image);
                    return (
                      <Image
                        source={{ uri: image }}
                        key={index}
                        style={{
                          width: 120,
                          height: 120,
                          marginBottom: 10,
                        }}
                      />
                    );
                  })
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </ContentLoader>
    </ScrollView>
  );
};

export default ProfilePage;
