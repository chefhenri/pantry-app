import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { View } from "react-native";

import styles from "../../styles/pantry.styles";

const ItemFormBtnGroup = ({ closeModal, hasName, addItem }) => {
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
          // TODO: Trigger snackbar
          console.log("Add item pressed");
          addItem();
          closeModal();
        }}
      >add item</Button>
    </View>
  );
};

export default ItemFormBtnGroup;
