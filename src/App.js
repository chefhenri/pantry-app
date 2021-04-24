import React from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { NavigationContainer } from "@react-navigation/native";

import Amplify from "aws-amplify";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";

import config from "../aws-exports";

import RootNavigator from "./navigations/RootNavigator";

// global.Buffer = global.Buffer || require("buffer").Buffer;

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

Amplify.addPluggable(new AmazonAIPredictionsProvider());

const App = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

export default withAuthenticator(App);
