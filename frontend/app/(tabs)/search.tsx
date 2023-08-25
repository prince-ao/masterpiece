import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { getToken } from "../../lib/store";
import { router } from "expo-router";

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<
    { username: string; user_id: number }[]
  >([]);

  useEffect(
    () => () => {
      setSearch("");
      setSearchResult([]);
    },
    []
  );

  const ItemView: React.FC<{ item: any }> = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          router.push({
            pathname: "/profilepage",
            params: { user_id: item.user_id },
          });
        }}
      >
        <Text style={styles.itemTitle} onPress={() => getItem(item)}>
          {item.username}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView: React.FC = () => <View style={styles.separator} />;
  const origin = "http://3.128.192.247:3005";

  const getItem = (item: any) => {
    alert(`Id: ${item.id}\nTitle: ${item.title}`);
  };

  async function handleSearch() {
    const { data } = await axios.get(`${origin}/api/search?s=${search}`, {
      headers: {
        Authentication: `Bearer ${await getToken()}`,
      },
    });

    setSearchResult(data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
        placeholder="Search..."
        onSubmitEditing={handleSearch}
        value={search}
      />
      <FlatList
        data={searchResult}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  itemContainer: {
    padding: 15,
    backgroundColor: "white",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
  },
});

export default Search;
