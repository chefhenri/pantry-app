import React from "react";
import { Modal, Portal, Provider, Text } from "react-native-paper";

import pantryStyles from "../../styles/pantry.styles";
import AddItemForm from "../molecules/AddItemForm";

const AddItemModal = ({ visible, toggle }) => {
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={pantryStyles.addItemModalContainer}
          onDismiss={toggle}
        >
          <AddItemForm closeModal={toggle} />
        </Modal>
      </Portal>
    </Provider>
  );
};

export default AddItemModal;
