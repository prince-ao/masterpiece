import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import ContentLoader from "react-native-easy-content-loader";
import { getToken } from "../../lib/store";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import ProfilePage from "../../components/ProfilePage";
import { RefreshControl } from "react-native-gesture-handler";

export interface Profile {
  username: string;
  bio: string;
  followers_count: number;
  following_count: number;
  painting_count: number;
  profile_image: string;
}

const profile = () => {
  // send a request for users profile
  const origin = "http://3.128.192.247:3005";
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [galleryImages, setGalleryImages] = useState<string[] | undefined>();
  const [refreshing, setRefreshing] = useState(false);

  function wait(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function getProfile() {
    try {
      const { data }: { data: Profile } = await axios.get(
        `${origin}/api/profile`,
        {
          headers: {
            Authentication: `Bearer ${await getToken()}`,
          },
        }
      );

      setProfile(data);

      setLoading(false);

      const response = await axios.get(`${origin}/api/paintings`, {
        headers: {
          Authentication: `Bearer ${await getToken()}`,
        },
      });

      setGalleryImages(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {profile ? (
        <ProfilePage
          loading={loading}
          profile={profile}
          hasAddImage
          galleryImages={galleryImages!}
          user_id={undefined}
          update={getProfile}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default profile;
