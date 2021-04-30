/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

/**
 * @see https://github.com/facebook/react-native/issues/14796
 */
import { Buffer } from "buffer";
global.Buffer = Buffer;

/**
 * @see https://github.com/facebook/react-native/issues/16434
 */
import { setupURLPolyfill } from "react-native-url-polyfill";
setupURLPolyfill();

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Amplify from "aws-amplify";
import { GQL_URL } from "@env";

import { name as appName } from "./app.json";
import config from "./aws-exports";
import App from "./src/App";

const apolloClient = new ApolloClient({
  uri: GQL_URL,
  cache: new InMemoryCache(),
});

const AppRoot = () => (
  <ApolloProvider client={apolloClient}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </ApolloProvider>
);

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

AppRegistry.registerComponent(appName, () => AppRoot);
