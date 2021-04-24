import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Hello Home!</Text>
    <Button
      title="Go to Search"
      onPress={() => navigation.navigate("Search")}
    />
  </View>
);

export default HomeScreen;
