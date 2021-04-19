import React, { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity, View } from "react-native";

// TODO: Refactor to use Relay
const Search = ({ title }): Node => {
  const [text, setText] = useState("");
  const [data, setData] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      <TextInput style={styles.input}
                 placeholder={"Enter food"}
                 onChangeText={text => setText(text)} />
      <TouchableOpacity>
        <Text style={styles.buttonText} onPress={}>Search</Text>
      </TouchableOpacity>
      <Text>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  input: {
    fontSize: 18,
    fontWeight: "400",
    height: 40,
    width: 250,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 24,
  },
});

export default Search;
