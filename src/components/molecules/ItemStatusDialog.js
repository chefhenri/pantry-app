import React, { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const ItemStatusDialog = () => {
  const [visible, setVisible] = useState(false);

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
            {/*TODO: show amount options*/}
            <Text>Item amount options here</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleDialog}>cancel</Button>
            <Button onPress={toggleDialog}>ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        icon="chart-bar"
        mode="default"
        onPress={toggleDialog}
      >amount</Button>
    </View>
  );
};

export default ItemStatusDialog;
