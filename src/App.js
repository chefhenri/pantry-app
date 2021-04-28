import React, { useState } from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { NavigationContainer } from "@react-navigation/native";

import Amplify from "aws-amplify";

import config from "../aws-exports";

import RootNavigator from "./navigations/RootNavigator";
import { PantryContext } from "./utils/pantry.utils";

global.Buffer = global.Buffer || require("buffer").Buffer;

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  const [pantryItems, setPantryItems] = useState([]);

  return (
    <PantryContext.Provider value={{
      items: pantryItems,
      update: setPantryItems,
    }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PantryContext.Provider>
  );
};

export default withAuthenticator(App);
