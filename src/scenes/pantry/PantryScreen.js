import React, { useContext, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";

import pantryStyles from "../../styles/pantry.styles";
import {
  PantryContext,
  updateItemAmt,
} from "../../utils/pantry.utils";
import Empty from "../../components/atoms/Empty";
import PantryFabGroup from "../../components/molecules/PantryFabGroup";
import ItemFormModal from "../../components/organism/ItemFormModal";
import PantryItem from "../../components/organism/PantryItem";

const PantryScreen = ({ navigation }) => {
  const [pantryItems, setPantryItems] = useContext(PantryContext);
  const [itemModalVis, setItemModalVis] = useState(false);

  // const [catModalVis, setCatModalVis] = useState(false);
  // const [remindModalVis, setRemindModalVis] = useState(false);

  const toggleItemModal = () => setItemModalVis(!itemModalVis);

  // const toggleCatModal = () => setCatModalVis(!catModalVis);
  // const toggleRemindModal = () => setRemindModalVis(!remindModalVis);

  const handleChangeAmt = (id, amt) => {
    updateItemAmt(id, amt, pantryItems, setPantryItems);
  };

  return (
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
