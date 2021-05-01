import React from "react";
import { View } from "react-native";
import { Dialog, Menu, Portal } from "react-native-paper";

import {
  AMOUNT,
  getAmtIcon,
  getAmtText,
} from "../../utils/pantry.utils";
import { updateFoodAmt } from "../../utils/db.utils";

const ItemOptsDialog = ({ id, visible, toggle, setIcon }) => {

  // TODO: Trigger amount change snackbar
  const handlePress = (amt) => {
    // updateFoodAmt(id, amt)
    setIcon(getAmtIcon(amt));
    toggle();
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
        >
          <Dialog.Title>Change Item Amount</Dialog.Title>
          <Dialog.Content>
            {/*Change item amount to good item*/}
            <Menu.Item
              icon={getAmtIcon(AMOUNT.GOOD)}
              title={getAmtText(AMOUNT.GOOD)}
              onPress={() => {
                console.log(`Item ${id} amount changed to ${AMOUNT.GOOD}`);
                handlePress(AMOUNT.GOOD);
              }}
            />

            {/*Change item amount to okay item*/}
            <Menu.Item
              icon={getAmtIcon(AMOUNT.OKAY)}
              title={getAmtText(AMOUNT.OKAY)}
              onPress={() => {
                console.log(`Item ${id} amount changed to ${AMOUNT.OKAY}`);
                handlePress(AMOUNT.OKAY);
              }}
            />

            {/*Change item amount to none item*/}
            <Menu.Item
              icon={getAmtIcon(AMOUNT.NONE)}
              title={getAmtText(AMOUNT.NONE)}
              onPress={() => {
                console.log(`Item ${id} amount changed to ${AMOUNT.NONE}`);
                handlePress(AMOUNT.NONE);
              }}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ItemOptsDialog;
