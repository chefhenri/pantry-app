import React from "react";
import { View, Text, Button } from "react-native";

const SearchScreen = ({ navigation }) => (
  <View>
    <Text>Hello Search!</Text>
    <Button
      title="Go Home"
      onPress={() => navigation.navigate("Home")}
    />
  </View>
);

export default SearchScreen;
