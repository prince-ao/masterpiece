import { View, Image, Text } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const Card = ({data}:any) => {
    const router = useRouter();
    const params = useLocalSearchParams();
  return (
    <View style={{
        backgroundColor: 'gray',
        borderRadius: 10,
        marginBottom: 10,
        margin: 10,
    }}>
        <View style={{width:'100%',height:250 ,alignItems: "center"}}>
            <Text style={{fontSize: 16,
        fontWeight: "600"}}> Art Title Goes here</Text>
        <Image source={{uri: 'https://picsum.photos/200/300'}} style={{width: 200, height: 200}} />
        <Text style={{fontSize: 16,
        fontWeight: "600"}}> Price Goes here</Text>
        </View>
    </View>
  )
}

export default Card