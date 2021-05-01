import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Snackbar } from "react-native-paper";

import pantryStyles from "../../styles/pantry.styles";
import {
  getAllFoodItems,
  removeItem,
} from "../../utils/db.utils";
import {
  PantryContext,
  SnackContext,
} from "../../utils/pantry.utils";
import Empty from "../../components/atoms/Empty";
import PantryFabGroup from "../../components/molecules/PantryFabGroup";
import ItemFormModal from "../../components/organism/ItemFormModal";
import PantryItem from "../../components/organism/PantryItem";

const PantryScreen = ({ navigation }) => {
  const [pantryItems, setPantryItems] = useContext(PantryContext);
  const [itemModalVis, setItemModalVis] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [addSnackVis, setAddSnackVis] = useState(false);
  const [delSnackVis, setDelSnackVis] = useState(false);

  const toggleItemModal = () => setItemModalVis(!itemModalVis);

  const toggleAddSnackbar = () => setAddSnackVis(!addSnackVis);
  const dismissAddSnackbar = () => setAddSnackVis(false);
  const toggleDelSnackbar = () => setDelSnackVis(!delSnackVis);
  const dismissDelSnackbar = () => setDelSnackVis(!delSnackVis);

  const refreshPantry = () => {
    setRefreshing(true);
    getAllFoodItems(setPantryItems);
    setRefreshing(false);
  };

  const handleDeleteItem = (id, label) => {
    removeItem(id, label);
    refreshPantry();
  };

  useEffect(() => console.log(JSON.stringify(pantryItems)),
    [pantryItems]);

  // TODO: Display items from Storage, sync with Context
  return (
    <SnackContext.Provider value={{ add: toggleAddSnackbar, del: toggleDelSnackbar }}>
      <SafeAreaView style={pantryStyles.pantryWrapper}>
        <FlatList
          style={pantryStyles.pantryItemsWrapper}
          data={pantryItems}
          renderItem={({ item }) => (
            <PantryItem item={item} removeSelf={handleDeleteItem} />
          )}
          keyExtractor={(item) => item.foodID.S}
          refreshing={refreshing}
          onRefresh={refreshPantry}
          ListEmptyComponent={Empty}
        />
        <ItemFormModal
          visible={itemModalVis}
          toggle={toggleItemModal}
        />
        <PantryFabGroup toggleModal={toggleItemModal} />
        <Snackbar
          style={pantryStyles.snackbar}
          visible={addSnackVis}
          action={{
            label: "Undo",
            onPress: () => console.log("TODO: Undo add item pressed"),
          }}
          onDismiss={dismissAddSnackbar}
        >
          Item added to Pantry
        </Snackbar>
        <Snackbar
          style={pantryStyles.snackbar}
          visible={delSnackVis}
          action={{
            label: "Undo",
            onPress: () => console.log("TODO: Undo delete item pressed"),
          }}
          onDismiss={dismissDelSnackbar}
        >
          Item removed from Pantry
        </Snackbar>
      </SafeAreaView>
    </SnackContext.Provider>
  );
};

export default PantryScreen;
