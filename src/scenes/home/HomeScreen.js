import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";

import styles from "../../styles/home.styles";
import { DESTINATIONS, signOut } from "../../utils/home.utils";
import HomeNavCard from "../../components/molecules/HomeNavCard";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.homeWrapper}>
      <FlatList
        contentContainerStyle={styles.navCardsWrapper}
        data={DESTINATIONS}
        renderItem={({ item }) => (
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
