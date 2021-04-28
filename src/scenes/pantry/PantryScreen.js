import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native";

import pantryStyles from "../../styles/pantry.styles";
import { PantryContext } from "../../utils/pantry.utils";
import Empty from "../../components/atoms/Empty";
import PantryFabGroup from "../../components/molecules/PantryFabGroup";
import AddItemModal from "../../components/organism/AddItemModal";

const PantryScreen = ({ navigation }) => {
  const { items, update } = useContext(PantryContext);
  const [itemModalVis, setItemModalVis] = useState(false);
  const [catModalVis, setCatModalVis] = useState(false);
  const [remindModalVis, setRemindModalVis] = useState(false);

  const toggleItemModal = () => setItemModalVis(!itemModalVis);
  const toggleCatModal = () => setCatModalVis(!catModalVis);
  const toggleRemindModal = () => setRemindModalVis(!remindModalVis);

  return (
    <SafeAreaView style={pantryStyles.pantryWrapper}>
      {items.length === 0 && (<Empty />)}
      <AddItemModal
        visible={itemModalVis}
        toggle={toggleItemModal}
      />
      <PantryFabGroup toggleModal={toggleItemModal} />
    </SafeAreaView>
  );
};

export default PantryScreen;
