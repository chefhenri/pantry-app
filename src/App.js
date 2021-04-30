import React, { useState } from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./navigations/RootNavigator";
import { PantryContext } from "./utils/pantry.utils";

const App = () => {
  // TODO: Refactor to include categories
  const pantryHook = useState([]);

  return (
    <PantryContext.Provider value={pantryHook}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PantryContext.Provider>
  );
};

export default withAuthenticator(App);
