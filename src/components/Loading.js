import React from "react";
import {View, ActivityIndicator} from 'react-native';

const BLACK = '#000'

const Loading = () => (
  <View>
    <ActivityIndicator size={"large"} color={BLACK}/>
  </View>
)

export default Loading
