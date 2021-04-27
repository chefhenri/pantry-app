import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import styles from '../../styles/root.styles'

const Loading = () => (
  <View style={styles.centerWrapper}>
    <ActivityIndicator animating={true} size="large" colors={Colors.blue400} />
  </View>
);

export default Loading;
