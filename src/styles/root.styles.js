import { Dimensions, StyleSheet } from "react-native";

export const HEIGHT = Dimensions.get("window").height;
export const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  centerWrapper: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT * 0.75,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
