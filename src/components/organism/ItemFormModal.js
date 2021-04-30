import React from "react";
import { Modal, Portal, Provider} from "react-native-paper";

import pantryStyles from "../../styles/pantry.styles";
import ItemForm from "../molecules/ItemForm";

const ItemFormModal = ({ visible, toggle }) => {
  // TODO: Convert to dialog
  return (
    <Provider>
      <Portal>
        <Modal
          contentContainerStyle={pantryStyles.itemFormModalContainer}
          visible={visible}
          onDismiss={toggle}
        >
          <ItemForm closeModal={toggle} />
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ItemFormModal;
