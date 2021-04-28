import React from "react";
import { Button } from "react-native-paper";
import { View } from "react-native";

import styles from "../../styles/pantry.styles";

const AddItemButtonGroup = ({ closeModal, hasName }) => {
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
        }}
      >add item</Button>
    </View>
  );
};

export default AddItemButtonGroup;
