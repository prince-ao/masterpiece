import { View, Image, Text,Dimensions } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const Card = ({data}:any) => {
    const router = useRouter();
    const params = useLocalSearchParams();
  return (
    <View style={{
        backgroundColor: 'black',
        borderRadius: 1,
        marginBottom: 10,
        margin: 10,
    }}>
        <View style={{width:'100%',height:250 ,alignItems: "center"}}>
        <Image source={{uri: 'https://picsum.photos/200/300'}} style={{width: Dimensions.get('window').width, height: "100%"}} />
        <Text style={{fontSize: 16,
        fontWeight: "600"}}> $9999</Text>
        </View>
    </View>
  )
}

export default Card