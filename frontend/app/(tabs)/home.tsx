import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Stack, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { HomeHeader, Card, FocusStatusBar } from "../../components";
import Colors from "../../constants/Colors";
import axios, { AxiosError } from "axios";
import { Button } from "react-native-elements/dist/buttons/Button";
import { getToken, removeToken } from "../../lib/store";
import { RefreshControl } from "react-native-gesture-handler";

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
  const origin = "http://3.128.192.247:3005";
  let page = 1;

  const [home, setHome] = useState<HomepageResponse>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getHomepage();

      setHome(data);
    })();
  }, []);

  async function getHomepage() {
    try {
      const { data } = await axios.get(`${origin}/api/homepage?page=${page}`, {
        headers: {
          Authentication: `Bearer ${await getToken()}`,
        },
      });
      return data as HomepageResponse;
    } catch (e) {
      console.log((e as AxiosError).toJSON());
    }

    return {
      hasNext: false,
      data: [],
    } as HomepageResponse;
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const data = await getHomepage();
    setHome(data);
    setRefreshing(false);
  }, []);

  function shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.container}>
          {home ? (
            <FlatList
              refreshing={refreshing}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={home.data}
              renderItem={({ item }) => <Card data={item} />}
              keyExtractor={(item) => item.image_url}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
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
    display: "flex",
    flexDirection: "column",
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
