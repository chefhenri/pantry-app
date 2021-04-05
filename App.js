import React from 'react';
import { StyleSheet, View } from 'react-native';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import Home from './Home';
import Transcribe from './Transcribe';
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  return (
    <View style={styles.container}>
      <Home />
      <Transcribe />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default withAuthenticator(App);