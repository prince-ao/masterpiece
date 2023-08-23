import RegisterForm from "../components/RegisterForm";
import { useRouter } from 'expo-router';
export default function register() {
    const router = useRouter();
    return (
        <RegisterForm/>
    )
}