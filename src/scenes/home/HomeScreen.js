import React from "react";
import { View, Button } from "react-native";

import { Auth } from "aws-amplify";

// TODO [@hxl1116]: Refactor home screen design
const HomeScreen = ({ navigation }) => {
  const signOut = async () => {
    Auth.signOut({ global: true })
      .then(() => console.log("Signed out"))
      .catch((err) => console.log("Error signing out", err));
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Pantry"
        onPress={() => navigation.navigate("Pantry")}
      />
      <Button
        title="Search"
        onPress={() => navigation.navigate("Search")}
      />
      <Button
        title="Transcribe"
        onPress={() => navigation.navigate("Transcribe")}
      />
      <Button
        title="Sign Out"
        onPress={signOut}
      />
    </View>
  );
};

export default HomeScreen;
