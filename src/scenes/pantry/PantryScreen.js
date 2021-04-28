import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Caption, FAB, Modal, Portal, Provider, Text } from "react-native-paper";

import rootStyles from "../../styles/root.styles";
import pantryStyles from "../../styles/pantry.styles";
import PantryAddGroup from "../../components/molecules/PantryAddGroup";

const EMPTY_PANTRY = "Your pantry is empty";

const PantryScreen = ({ navigation }) => {
  const [pantryItems, setPantryItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const toggleModal = () => setVisible(!visible);

  return (
    <SafeAreaView style={pantryStyles.pantryWrapper}>
      {pantryItems.length === 0 && (
        <View style={rootStyles.centerWrapper}>
          <Caption style={pantryStyles.emptyPantryCaption}>{EMPTY_PANTRY}</Caption>
        </View>
      )}
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            contentContainerStyle={pantryStyles.addItemModalContainer}
            onDismiss={toggleModal}
          >
            <Text>Modal Content</Text>
          </Modal>
        </Portal>
      </Provider>
      <PantryAddGroup toggleModal={toggleModal} />
    </SafeAreaView>
  );
};

export default PantryScreen;
