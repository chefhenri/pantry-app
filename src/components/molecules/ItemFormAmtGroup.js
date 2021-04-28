import React from "react";
import { View } from "react-native";
import { Caption, ToggleButton } from "react-native-paper";

import styles from "../../styles/pantry.styles";

const ItemFormAmtGroup = ({ amt, setAmt }) => {
  return (
    <View style={styles.addItemFormAmtGroup}>
      <Caption style={styles.itemAmtCaption}>Item Amount: </Caption>
      <ToggleButton.Row
        value={amt}
        onValueChange={(value) => setAmt(value)}
      >
        <ToggleButton
          icon="arrow-collapse-up"
          value="good"
        />
        <ToggleButton
          icon="arrow-collapse-down"
          value="okay"
        />
        <ToggleButton
          icon="border-none-variant"
          value="none"
        />
      </ToggleButton.Row>
    </View>
  );
};

export default ItemFormAmtGroup;
