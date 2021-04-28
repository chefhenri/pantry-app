import React from "react";
import { Modal, Portal, Provider, Text } from "react-native-paper";

import pantryStyles from "../../styles/pantry.styles";
import ItemForm from "../molecules/ItemForm";

const ItemFormModal = ({ visible, toggle }) => {
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={pantryStyles.itemFormModalContainer}
          onDismiss={toggle}
        >
          <ItemForm closeModal={toggle} />
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ItemFormModal;
