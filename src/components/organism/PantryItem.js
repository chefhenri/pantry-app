import React, { useState } from "react";
import { Button, Colors, IconButton, List, Menu, Provider, Surface } from "react-native-paper";
import { View } from "react-native";

import styles from "../../styles/pantry.styles";
import {
  AMOUNT,
  AMOUNT_ICON,
  getAmtIcon,
} from "../../utils/pantry.utils";

const PantryItem = ({ item, updateAmt }) => {
  const [starred, setStarred] = useState(false);
  const [visible, setVisible] = useState(false);
  const [amtIcon, setAmtIcon] = useState(getAmtIcon(item.amount));

  const toggleMenu = () => setVisible(!visible);
  const handleChangeAmt = (amt) => setAmtIcon(getAmtIcon(amt))

  return (
    // TODO: Show item amount
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
        right={() => (
          <Provider>
            <View>
              <Menu
                visible={visible}
                onDismiss={toggleMenu}
                anchor={(
                  <Button
                    icon={amtIcon}
                    mode="default"
                    onPress={toggleMenu}
                  >amount</Button>
                )}
              >
                <Menu.Item
                  icon={AMOUNT_ICON.GOOD}
                  title="Good"
                  onPress={() => {
                    console.log("Item amount set to \"good\"");
                    handleChangeAmt(AMOUNT.GOOD)
                    toggleMenu();
                  }}
                />
                <Menu.Item
                  icon={AMOUNT_ICON.OKAY}
                  title="Okay"
                  onPress={() => {
                    console.log("Item amount set to \"okay\"");
                    handleChangeAmt(AMOUNT.OKAY)
                    toggleMenu();
                  }}
                />
                <Menu.Item
                  icon={AMOUNT_ICON.NONE}
                  title="None"
                  onPress={() => {
                    console.log("Item amount set to \"none\"");
                    handleChangeAmt(AMOUNT.NONE)
                    toggleMenu();
                  }}
                />
              </Menu>
            </View>
          </Provider>
        )}
      />
    </Surface>
  );
};

export default PantryItem;
