import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { View } from "react-native";

import styles from "../../styles/pantry.styles";

const ItemFormBtnGroup = ({ closeModal, hasName, addItem }) => {
  return (
    <View style={styles.addItemButtonGroup}>
      <Button
        mode="default"
        icon="undo-variant"
        onPress={() => {
          console.log("Add item cancelled");
          closeModal();
        }}
      >never mind</Button>
      <Button
        style={styles.addItemButton}
        mode="default"
        icon="plus"
        disabled={hasName}
        onPress={() => {
          // TODO: Add item to pantry
          console.log("Add item pressed");
          addItem();
          closeModal();
        }}
      >add item</Button>
    </View>
  );
};

export default ItemFormBtnGroup;
