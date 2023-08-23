import { useState } from 'react'
import { StyleSheet, View,ScrollView, SafeAreaView , Text } from 'react-native';
import { Stack , useRouter } from 'expo-router';
import { Tabs } from 'expo-router/tabs'
import Button from '../components/Button';

import { COLORS,SIZES } from '../constants';



export default function Page() {

  const goHome = () => { router.push('/home') }
  const router = useRouter();
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: 'My home',
          headerStyle: { backgroundColor: '#f4511e' },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
        <Button title=" Home"onPress={goHome} >  </Button>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamilt: 'DMsans',
    fontSize: 40, 
  }
});