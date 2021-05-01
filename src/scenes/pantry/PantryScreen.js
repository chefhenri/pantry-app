import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";

import pantryStyles from "../../styles/pantry.styles";
import { PantryContext } from "../../utils/pantry.utils";
import Empty from "../../components/atoms/Empty";
import PantryFabGroup from "../../components/molecules/PantryFabGroup";
import ItemFormModal from "../../components/organism/ItemFormModal";
import PantryItem from "../../components/organism/PantryItem";
import { getAllFoodItems, removeItem } from "../../utils/db.utils";

const PantryScreen = ({ navigation }) => {
  const [pantryItems, setPantryItems] = useContext(PantryContext);
  const [itemModalVis, setItemModalVis] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const toggleItemModal = () => setItemModalVis(!itemModalVis);

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
    </SafeAreaView>
  );
};

export default PantryScreen;
