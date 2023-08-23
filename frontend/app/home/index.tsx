import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View, 
    FlatList,
    Dimensions
  } from "react-native";
  import { Stack } from 'expo-router';
import { useState } from 'react'
import { HomeHeader, Card, FocusStatusBar } from '../../components'
import Colors from "../../constants/Colors";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Masterpiece',
          headerStyle: { backgroundColor: '#000' },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 30 }),
          paddingHorizontal: 0,
        }}>
        <View style={styles.container}>
          <View  style={styles.container}>
            <FlatList 
            //dummy data for now
            data={[1,2,3,4,5,6,7,8,9]}
            renderItem={(item) => <Card data={item}/>}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader/>}
             />
          </View>
          <View style={{position:"absolute",
                        top:0,
                        bottom:0,
                        right:0,
                        left:0,
                        zIndex:-1}}> 
                        <View style={{height:0,backgroundColor:"#000"}}/>
                        <View style={{flex:1,backgroundColor:"#000"}}/>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#000",
      padding:0,
      margin:0,
      width: Dimensions.get('window').width,
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

export default home