import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Snackbar } from "react-native-paper";

import pantryStyles from "../../styles/pantry.styles";
import {
  getAllFoodItems,
  removeItem
} from "../../utils/db.utils";
import {
  PantryContext,
  SnackContext
} from "../../utils/pantry.utils";
import Empty from "../../components/atoms/Empty";
import PantryFabGroup from "../../components/molecules/PantryFabGroup";
import ItemFormModal from "../../components/organism/ItemFormModal";
import PantryItem from "../../components/organism/PantryItem";

const PantryScreen = ({ navigation }) => {
  const [pantryItems, setPantryItems] = useContext(PantryContext);
  const [itemModalVis, setItemModalVis] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [snackVis, setSnackVis] = useState(false);

  const toggleItemModal = () => setItemModalVis(!itemModalVis);
  const toggleSnackbar = () => setSnackVis(!snackVis);
  const dismissSnackbar = () => setSnackVis(false);

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
    <SnackContext.Provider value={toggleSnackbar}>
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
