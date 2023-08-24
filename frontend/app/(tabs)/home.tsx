import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { HomeHeader, Card, FocusStatusBar } from "../../components";
import Colors from "../../constants/Colors";
import axios from "axios";
import { router } from 'expo-router';

export interface HomepageData {
  image_url: string;
  name: string;
  user_id: string;
  username: string;
  profile_image_url: string;
  caption: string;
  price: number;
  ai_price: number;
  likes: number;
}

export interface HomepageResponse {
  hasNext: boolean;
  data: HomepageData[];
}

const home = () => {
  const origin = "http://localhost:3005";
  let page = 1;

  const [home, setHome] = useState<HomepageResponse>();

  useEffect(() => {
    (async () => {
      const data = await getHomepage();

      console.log(data);

      setHome(data);
    })();
  }, []);
  const handleProfilePage = (userId: string) => {
    router.replace(`/profilepage?userId=${userId}`);
  };
  async function getHomepage() {
    // const response = await axios.get(`${origin}/api/homepage?page=${page}`);

    // return response.data as HomepageResponse;

    return {
      hasNext: false,
      data: [
        {
          image_url: "nothing",
          name: "the crying lady",
          user_id: "123123412312",
          username: "gay lord",
          profile_image_url: "nothing",
          caption: "hello world",
          price: 100,
          ai_price: 100,
          likes: 10,
        },
        {
          image_url: "nothing",
          name: "the crying lady",
          user_id: "123123412312",
          username: "gay lord",
          profile_image_url: "nothing",
          caption: "hello world",
          price: 100,
          ai_price: 100,
          likes: 10,
        },
        {
          image_url: "nothing",
          name: "the crying lady",
          user_id: "123123412312",
          username: "gay lord",
          profile_image_url: "nothing",
          caption: "hello world",
          price: 100,
          ai_price: 100,
          likes: 10,
        },
        {
          image_url: "nothing",
          name: "the crying lady",
          user_id: "123123412312",
          username: "gay lord",
          profile_image_url: "nothing",
          caption: "hello world",
          price: 100,
          ai_price: 100,
          likes: 10,
        },
        {
          image_url: "nothing",
          name: "the crying lady",
          user_id: "123123412312",
          username: "gay lord",
          profile_image_url: "nothing",
          caption: "hello world",
          price: 100,
          ai_price: 100,
          likes: 10,
        },
        {
          image_url: "nothing",
          name: "the crying lady",
          user_id: "123123412312",
          username: "gay lord",
          profile_image_url: "nothing",
          caption: "hello world",
          price: 100,
          ai_price: 100,
          likes: 10,
        },
        {
          image_url: "nothing",
          name: "the crying lady",
          user_id: "123123412312",
          username: "gay lord",
          profile_image_url: "nothing",
          caption: "hello world",
          price: 100,
          ai_price: 100,
          likes: 10,
        },
      ],
    } as HomepageResponse;
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={{
        paddingTop: Platform.select({ android: 30 }),
        paddingHorizontal: 0,
      }}
    >
      <View style={styles.container}>
        <View style={styles.container}>
          {home ? (
            <FlatList
              data={home.data}
              renderItem={({ item }) => (
                <Card data={item} onPressProfile={() => handleProfilePage(item.user_id)} />
              )}
              keyExtractor={(item) => item.user_id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 0,
    margin: 0,
    width: Dimensions.get("window").width,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "00%",
  },
});

export default home;
