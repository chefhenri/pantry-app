import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

const Loading = () => (
  <View>
    <ActivityIndicator animating={true} colors={Colors.blue400} />
  </View>
);

export default Loading;
