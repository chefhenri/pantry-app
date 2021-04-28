import React from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { Button, Colors } from "react-native-paper";

import { Auth } from "aws-amplify";

import styles from "../../styles/home.styles";
import HomeNavCard from "../../components/molecules/HomeNavCard";

const destinations = [
  { name: "Pantry", color: Colors.amber400, icon: "food" },
  { name: "Search", color: Colors.blue400, icon: "feature-search" },
  { name: "Transcribe", color: Colors.red400, icon: "microphone" },
];

// TODO [@hxl1116]: Refactor home screen design
const HomeScreen = ({ navigation }) => {
  const signOut = async () => {
    Auth.signOut({ global: true })
      .then(() => console.log("Signed out"))
      .catch((err) => console.log("Error signing out", err));
  };

  return (
    <SafeAreaView style={styles.homeWrapper}>
      <FlatList
        contentContainerStyle={styles.navCardsWrapper}
        data={destinations}
        renderItem={({item}) => (
          <HomeNavCard
            dest={item.name}
            ico={item.icon}
            bg={item.color}
            nav={navigation}
          />
        )}
        keyExtractor={(dest) => `${dest.name.toLowerCase()}-dest`}
      />
      <Button
        style={styles.signOutBtn}
        icon="logout"
        mode="outlined"
        onPress={signOut}
      >sign out</Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
