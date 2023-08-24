import ProfilePage from "../components/ProfilePage";
import { useRouter } from 'expo-router';
export default function profilepage() {
  const router = useRouter();
  return (
    <ProfilePage />
  )
}
