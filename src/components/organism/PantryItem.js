import React, { useContext, useState } from "react";
import { Colors, IconButton, List, Surface } from "react-native-paper";

import styles from "../../styles/pantry.styles";
import { getAmtIcon, SnackContext } from "../../utils/pantry.utils";
import ItemOptsDialog from "../molecules/ItemOptsDialog";
import { View } from "react-native";

const PantryItem = ({ item, removeSelf }) => {
  const toggleSnack = useContext(SnackContext);
  const [starred, setStarred] = useState(false);
  const [visible, setVisible] = useState(false);
  const [amtIcon, setAmtIcon] = useState(getAmtIcon(item.quantity.S));

  const toggleDialog = () => setVisible(!visible);

  return (
    <Surface style={styles.pantryItemSurface}>
      <List.Item
        title={item.foodLabel.S}
        left={() => (
          <IconButton
            icon={starred ? "star" : "star-outline"}
            color={Colors.amber400}
            animated={true}
            onPress={() => {
              console.log(`Item ${item.id} ${starred ? "un-starred" : "starred"}`);
              setStarred(!starred);
            }}
          />
        )}
        right={() => (
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon={amtIcon}
              animated={true}
              onPress={toggleDialog}
            />
            <IconButton
              icon="delete"
              onPress={() => {
                removeSelf(item.foodID.S, item.foodLabel.S);
                toggleSnack["del"]();
              }}
            />
          </View>
        )}
      />
      <ItemOptsDialog
        id={item.foodID.S}
        visible={visible}
        toggle={toggleDialog}
        setIcon={setAmtIcon}
      />
    </Surface>
  );
};

export default PantryItem;
