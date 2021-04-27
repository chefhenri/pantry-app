/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider as PaperProvider } from "react-native-paper";

import App from "./src/App";
import { GQL_URL } from "@env";
import { name as appName } from "./app.json";

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

AppRegistry.registerComponent(appName, () => AppRoot);
