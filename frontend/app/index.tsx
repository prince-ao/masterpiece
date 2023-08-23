import { useState } from 'react'
import { StyleSheet, View,ScrollView, SafeAreaView , Text } from 'react-native';
import { Stack , useRouter } from 'expo-router';
import Button from '../components/Button';

import { COLORS,SIZES } from '../constants';



export default function Page() {

  const onPress = () => { router.push('/home') }
  const router = useRouter();
  return (
    <SafeAreaView>
        <Button title=" Home"onPress={onPress} >  </Button>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamilt: 'DMsans',
    fontSize: 40, 
  }
});