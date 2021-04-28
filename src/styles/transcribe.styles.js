import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  transcribeWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultsWrapper: {
    width: "100%",
    height: "80%",
    paddingTop: 10,
  },
  playbackWrapper: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    flexGrow: 1,
  },
  resultContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  playbackIcon: {
    alignSelf: "flex-end",
  },
  addItemsButton: {
    marginHorizontal: 10,
  }
});

export default styles;
