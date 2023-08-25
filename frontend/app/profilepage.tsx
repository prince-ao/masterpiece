import ProfilePage from "../components/ProfilePage";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { usePathname, useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Profile } from "./(tabs)/profile";
import axios from "axios";
import { getToken } from "../lib/store";

export default function profilepage(body: any) {
  const params = useGlobalSearchParams();
  const origin = "http://3.128.192.247:3005";
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [galleryImages, setGalleryImages] = useState<string[] | undefined>();

  async function update() {
    try {
      const { data }: { data: Profile } = await axios.get(
        `${origin}/api/user/${params.user_id}`
      );

      setProfile(data);

      setLoading(false);

      const response = await axios.get(
        `${origin}/api/paintings/user/${params.user_id}`
      );

      setGalleryImages(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    update();
  }, []);

  return (
    <>
      {profile ? (
        <View style={{ marginTop: 50 }}>
          <ProfilePage
            loading={loading}
            profile={profile}
            hasAddImage={false}
            galleryImages={galleryImages!}
            user_id={params.user_id as string}
            update={update}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
