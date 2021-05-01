import React, { useEffect, useState } from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./navigations/RootNavigator";
import { PantryContext } from "./utils/pantry.utils";
import { getAllFoodItems } from "./utils/db.utils";

const App = () => {
  // TODO: Refactor to include categories
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => getAllFoodItems(setPantryItems), []);

  return (
    <PantryContext.Provider value={[pantryItems, setPantryItems]}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PantryContext.Provider>
  );
};

export default withAuthenticator(App);
