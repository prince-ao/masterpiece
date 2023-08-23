
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import LoginForm from '../components/LoginForm';
export default function login() {
    const router = useRouter();
    return (
        <LoginForm/>
    )

}