import React, { useState } from "react";
import { Colors, IconButton, List, Surface } from "react-native-paper";

import ItemStatusDialog from "../molecules/ItemStatusDialog";
import styles from "../../styles/pantry.styles";

const PantryItem = ({ item }) => {
  const [starred, setStarred] = useState(false);

  return (
    // TODO: Add style to surface
    <Surface style={styles.pantryItemSurface}>
      <List.Item
        title={item.label}
        left={() => (<IconButton
          icon={starred ? "star" : "star-outline"}
          color={Colors.amber400}
          size={16}
          animated={true}
          onPress={() => {
            console.log(`Item ${item.id} ${starred ? "un-starred" : "starred"}`);
            setStarred(!starred);
          }}
        />)}
        right={() => (<ItemStatusDialog />)}
      />
    </Surface>
  );
};

export default PantryItem;
