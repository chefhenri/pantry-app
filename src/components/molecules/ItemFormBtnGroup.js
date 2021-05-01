import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { View } from "react-native";

import styles from "../../styles/pantry.styles";
import { SnackContext } from "../../utils/pantry.utils";

const ItemFormBtnGroup = ({ closeModal, hasName, addItem }) => {
  const toggleSnack = useContext(SnackContext);

  return (
    <View style={styles.itemFormBtnGroup}>
      <Button
        mode="default"
        icon="undo-variant"
        onPress={() => {
          console.log("Add item cancelled");
          closeModal();
        }}
      >never mind</Button>
      <Button
        style={styles.addItemBtn}
        mode="default"
        icon="plus"
        disabled={hasName}
        onPress={() => {
          addItem();
          closeModal();
          toggleSnack["add"]();
        }}
      >add item</Button>
    </View>
  );
};

export default ItemFormBtnGroup;
