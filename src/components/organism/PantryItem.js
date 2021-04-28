import React, { useState } from "react";
import { Colors, IconButton, List, Surface } from "react-native-paper";

import styles from "../../styles/pantry.styles";
import { getAmtIcon } from "../../utils/pantry.utils";

const PantryItem = ({ item, updateAmt }) => {
  const [starred, setStarred] = useState(false);
  const [visible, setVisible] = useState(false);
  const [amtIcon, setAmtIcon] = useState(getAmtIcon(item.amount));

  const toggleMenu = () => setVisible(!visible);
  const handleChangeAmt = (amt) => {
    // TODO: Change item amount attribute
    setAmtIcon(getAmtIcon(amt));
  };

  return (
    <Surface style={styles.pantryItemSurface}>
      <List.Item
        title={item.label}
        left={() => (<IconButton
          icon={starred ? "star" : "star-outline"}
          color={Colors.amber400}
          animated={true}
          onPress={() => {
            console.log(`Item ${item.id} ${starred ? "un-starred" : "starred"}`);
            setStarred(!starred);
          }}
        />)}
        right={() => (
          // TODO: Add amount/delete icons
          <></>
        )}
      />
    </Surface>
  );
};

export default PantryItem;
