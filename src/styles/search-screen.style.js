import { Dimensions, StyleSheet } from "react-native";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  searchWrapper: {
    position: "relative",
  },
  resultsWrapper: {
    // marginVertical: 25,
    marginTop: 50,
    padding: 0,
  },
  resultContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 0,
  },
  searchbar: {
    position: "absolute",
    top: 0,
    zIndex: 2,
  },
  searchButton: {
    position: "absolute",
    top: HEIGHT * 0.4,
    left: WIDTH * 0.35,
  },
});

export default styles;
