import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootStack from "./navigations/RootNavigator";

const App = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);

export default App;
