
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import Detail from '../components/CardDetails';
export default function login() {
    const router = useRouter();
    return (
        <Detail/>
    )

}