import React, { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import { getAmtIcon } from "../../utils/pantry.utils";

const ItemAmtDialog = ({ amt }) => {
  const [visible, setVisible] = useState(false);
  const [amtIcon, setAmtIcon] = useState(getAmtIcon(amt));

  const toggleDialog = () => setVisible(!visible);

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={toggleDialog}
        >
          <Dialog.Title>Choose item amount</Dialog.Title>
          <Dialog.Content>
            {/*TODO: Show amount options, with menu (?)*/}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleDialog}>cancel</Button>
            <Button onPress={toggleDialog}>ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        icon={amtIcon}
        mode="default"
        onPress={toggleDialog}
      >amount</Button>
    </View>
  );
};

export default ItemAmtDialog;
