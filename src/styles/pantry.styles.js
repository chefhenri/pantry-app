import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "./root.styles";

const styles = StyleSheet.create({
  pantryWrapper: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT * 0.75,
    justifyContent: "space-between",
  },
  pantryItemsWrapper: {
    marginTop: 10
  },
  pantryItemSurface: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  emptyPantryCaption: {
    width: "auto",
    height: "auto",
    fontSize: 20,
  },
  itemFormContainer: {
    justifyContent: "space-around",
  },
  itemFormModalContainer: {
    width: "90%",
    padding: 20,
    alignSelf: "center",
    backgroundColor: "white",
  },
  addItemFormInput: {
    marginBottom: 10,
  },
  addItemFormAmtGroup: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemFormBtnGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelItemBtn: {
    flex: 1,
  },
  addItemBtn: {
    flex: 1,
  },
  itemAmtCaption: {
    fontSize: 18,
  },
  itemAmtBtn: {
    alignSelf: "flex-end"
  },
  separator: {
    marginTop: 15,
    marginBottom: 5,
  },
});

export default styles;
