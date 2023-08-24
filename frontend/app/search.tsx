import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import useFetch from '../hooks/useFetch';


const Search: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any[]>([]);
  const [masterDataSource, setMasterDataSource] = useState<any[]>([]);
  useEffect(() => {
        const { data, isLoading, error, refetch } = useFetch('anime/img');
        if (data) {
            setMasterDataSource(data);
        }
    
  }, []);

  const searchFilterFunction = (text: string) => {
    const searchText = text.toUpperCase();
    const newData = masterDataSource.filter(item =>
      item.title.toUpperCase().includes(searchText)
    );
    setFilteredDataSource(newData);
    setSearch(text);
  };

  const ItemView: React.FC<{ item: any }> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle} onPress={() => getItem(item)}>
        {item.title}
      </Text>
    </View>
  );

  const ItemSeparatorView: React.FC = () => (
    <View style={styles.separator} />
  );

  const getItem = (item: any) => {
    alert(`Id: ${item.id}\nTitle: ${item.title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={searchFilterFunction}
        onClear={() => searchFilterFunction('')}
        placeholder="Search..."
        value={search}
      />
      <FlatList
        data={filteredDataSource}
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
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
});

export default Search;