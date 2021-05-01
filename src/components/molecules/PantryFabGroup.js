import React, { useState } from "react";
import { FAB, Portal, Provider } from "react-native-paper";

const PantryFabGroup = ({ toggleModal }) => {
  const [open, setOpen] = useState(false);
  const handleFabChange = ({ open }) => setOpen(open);

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={"plus"}
          actions={[
            {
              icon: "plus",
              label: "Item",
              onPress: () => {
                console.log("Pressed add");
                toggleModal();
              },
            },
            {
              icon: "bell",
              label: "Remind",
              onPress: () => {
                console.log("Pressed remind");
                toggleModal();
              },
            },
            {
              icon: "group",
              label: "Category",
              onPress: () => {
                console.log("Pressed category");
                toggleModal();
              },
            },
          ]}
          onStateChange={handleFabChange}
        />
      </Portal>
    </Provider>
  );
};

export default PantryFabGroup;
