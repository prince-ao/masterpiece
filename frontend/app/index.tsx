import { useState } from 'react'
import { View,ScrollView, SafeAreaView , Text} from 'react-native';
import { Stack , useRouter } from 'expo-router';

import { COLORS,SIZES } from '../constants';



export default function Page() {
  const router = useRouter();
  return (
    <SafeAreaView>
        <Text > Hi aashil this is our homepage man </Text>
    </SafeAreaView>
    );
}