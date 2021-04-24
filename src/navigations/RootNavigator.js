import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../scenes/home/HomeScreen";
import SearchScreen from "../components/SearchScreen";

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "PantryApp",
      }}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
    />
  </Stack.Navigator>
);

export default RootStack;
