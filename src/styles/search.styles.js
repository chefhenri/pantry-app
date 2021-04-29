import { StyleSheet } from "react-native";

import { HEIGHT, WIDTH } from "./root.styles";

const styles = StyleSheet.create({
  searchWrapper: {
    position: "relative",
  },
  resultsWrapper: {
    marginTop: 60,
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
