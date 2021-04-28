import React from "react";
import { Caption } from "react-native-paper";
import { View } from "react-native";

import rootStyles from "../../styles/root.styles";
import pantryStyles from "../../styles/pantry.styles";

const EMPTY_PANTRY = "Your pantry is empty";

const Empty = () => {
  return (
    <View style={rootStyles.centerWrapper}>
      <Caption style={pantryStyles.emptyPantryCaption}>
        {EMPTY_PANTRY}
      </Caption>
    </View>
  );
};

export default Empty;
