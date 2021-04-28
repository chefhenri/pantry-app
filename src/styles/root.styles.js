import { Dimensions, StyleSheet } from "react-native";

export const HEIGHT = Dimensions.get("screen").height;
export const WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  centerWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
