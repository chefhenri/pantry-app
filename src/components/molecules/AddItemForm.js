import React, { useState } from "react";
import { View } from "react-native";
import { Divider, TextInput } from "react-native-paper";

import styles from "../../styles/pantry.styles";
import AddItemFormGroup from "./AddItemFormGroup";
import AddItemButtonGroup from "./AddItemButtonGroup";

const AddItemForm = ({ closeModal }) => {
  const [itemName, setItemName] = useState("");

  return (
    <View style={styles.addItemFormContainer}>
      <TextInput
        style={styles.addItemFormInput}
        label="Name"
        value={itemName}
        mode="outlined"
        onChangeText={(text) => setItemName(text)}
      />
      <AddItemFormGroup />
      <Divider style={styles.separator} />
      <AddItemButtonGroup closeModal={closeModal} hasName={itemName === ""} />
    </View>
  );
};

export default AddItemForm;
