import React from "react";
import { View } from "react-native";
import { Menu, Provider } from "react-native-paper";

import {
  AMOUNT,
  AMOUNT_ICON,
  getAmtText,
} from "../../utils/pantry.utils";

const ItemAmtMenu = ({ visible, toggle, setAmt, anchor }) => {
  return (
    <Provider>
      <View>
        <Menu
          visible={visible}
          onDismiss={toggle}
          anchor={anchor}
        >
          <Menu.Item
            icon={AMOUNT_ICON.GOOD}
            title="Good"
            onPress={() => {
              console.log("Item amount set to \"good\"");
              setAmt(AMOUNT.GOOD);
              toggle();
            }}
          />
          <Menu.Item
            icon={AMOUNT_ICON.OKAY}
            title={getAmtText(AMOUNT.OKAY)}
            onPress={() => {
              console.log("Item amount set to \"okay\"");
              setAmt(AMOUNT.OKAY);
              toggle();
            }}
          />
          <Menu.Item
            icon={AMOUNT_ICON.NONE}
            title="None"
            onPress={() => {
              console.log("Item amount set to \"none\"");
              setAmt(AMOUNT.NONE);
              toggle();
            }}
          />
        </Menu>
      </View>
    </Provider>
  );
};

export default ItemAmtMenu;
