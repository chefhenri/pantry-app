import React from "react";
import {View, ActivityIndicator} from 'react-native';

const PINK = '#ff5dc8'

const Loading = () => (
  <View>
    <ActivityIndicator size={"large"} color={PINK}/>
  </View>
)

export default Loading
