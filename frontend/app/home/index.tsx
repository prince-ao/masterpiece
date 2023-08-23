import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View, 
    FlatList
  } from "react-native";
import { useState } from 'react'
import { HomeHeader, Card, FocusStatusBar } from '../../components'
import Colors from "../../constants/Colors";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 30 }),
          paddingHorizontal: 10,
        }}>
        <View style={styles.container}>
          <View >
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
                        <View style={{height:300,backgroundColor:"#f6f6f8"}}/>
                        <View style={{flex:1,backgroundColor:"#f6f6f8"}}/>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  });

export default home