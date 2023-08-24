import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfilePage = () => {
  const galleryImages = [
    require('../assets/images/icon.png'),
    require('../assets/images/icon.png'),
    require('../assets/images/icon.png'),
    require('../assets/images/icon.png'),
    require('../assets/images/icon.png'),
    require('../assets/images/icon.png'),
    require('../assets/images/icon.png'),
  ];

  const followersCount = 1500;
  const postsCount = 350;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/scooter.png')}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.bio}>Artist</Text>
          <View style={styles.counts}>
            <Text style={styles.countText}>{followersCount} Followers</Text>
            <Text style={styles.countText}>{postsCount} Posts</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.gallery}>
          {galleryImages.map((image, index) => (
            <Image source={image} key={index} style={styles.galleryImage} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: '#888',
  },
  counts: {
    flexDirection: 'row',
    marginTop: 10,
  },
  countText: {
    marginHorizontal: 10,
    color: '#888',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  galleryImage: {
    width: '31%',
    height: 120,
    marginBottom: 10,
  },
});

export default ProfilePage;






