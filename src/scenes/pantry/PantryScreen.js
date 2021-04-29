import React, { useContext, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";

import pantryStyles from "../../styles/pantry.styles";
import {
  PantryContext, SnackContext,
  updateItemAmt,
} from "../../utils/pantry.utils";
import Empty from "../../components/atoms/Empty";
import PantryFabGroup from "../../components/molecules/PantryFabGroup";
import ItemFormModal from "../../components/organism/ItemFormModal";
import PantryItem from "../../components/organism/PantryItem";
import { Snackbar } from "react-native-paper";

const PantryScreen = ({ navigation }) => {
  const [pantryItems, setPantryItems] = useContext(PantryContext);
  const [itemModalVis, setItemModalVis] = useState(false);
  const [snackVis, setSnackVis] = useState(false);

  // const [catModalVis, setCatModalVis] = useState(false);
  // const [remindModalVis, setRemindModalVis] = useState(false);

  const toggleItemModal = () => setItemModalVis(!itemModalVis);
  const toggleSnackbar = () => setSnackVis(!snackVis);
  const dismissSnackbar = () => setSnackVis(false);

  // const toggleCatModal = () => setCatModalVis(!catModalVis);
  // const toggleRemindModal = () => setRemindModalVis(!remindModalVis);

  const handleChangeAmt = (id, amt) => {
    updateItemAmt(id, amt, pantryItems, setPantryItems);
  };

  return (
    <SnackContext.Provider value={toggleSnackbar}>
      <SafeAreaView style={pantryStyles.pantryWrapper}>
        <FlatList
          style={pantryStyles.pantryItemsWrapper}
          data={pantryItems}
          renderItem={({ item }) => (
            <PantryItem
              item={item}
              updateAmt={handleChangeAmt}
            />)}
          keyExtractor={(item) => item.label}
          ListEmptyComponent={
            // FIXME: Empty component not showing
            <Empty />
          }
        />
        <ItemFormModal
          visible={itemModalVis}
          toggle={toggleItemModal}
        />
        <PantryFabGroup toggleModal={toggleItemModal} />
        <Snackbar
          style={pantryStyles.snackbar}
          visible={snackVis}
          action={{
            label: "Undo",
            onPress: () => console.log("Undo add item pressed"),
          }}
          onDismiss={dismissSnackbar}
        >
          Item added to pantry
        </Snackbar>
      </SafeAreaView>
    </SnackContext.Provider>
  );
};

export default PantryScreen;
