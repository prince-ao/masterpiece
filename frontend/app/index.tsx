import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from "react-native";
import { Stack, router } from "expo-router";
import Button from "../components/Button";
import { getToken, removeToken } from "../lib/store";

import { COLORS, SIZES } from "../constants";

export default function Page() {
  const onPress = () => {
    router.push("/home");
  };

  useEffect(() => {
    (async () => {
      const token = await getToken();

      if (token === null) {
        router.push("/limbo");
      } else {
        router.push("/home");
      }
    })();
  }, []);

  return <></>;
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamilt: "DMsans",
    fontSize: 40,
  },
});
