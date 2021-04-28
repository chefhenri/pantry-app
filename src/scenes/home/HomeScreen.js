import React from "react";
import { View, Text, Button } from "react-native";

import { Auth } from "aws-amplify";

// TODO [@hxl1116]: Refactor home screen design
const HomeScreen = ({ navigation }) => {
  const signOut = async () => {
    Auth.signOut({global: true})
      .then(() => console.log('Signed out'))
      .catch((err) => console.log('Error signing out', err))
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello Home!</Text>
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate("Search")}
      />
      <Button
        title="Go to Transcribe"
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
