import React, { useState } from "react";
import { Card, Checkbox } from "react-native-paper";
import { View } from "react-native";

import styles from "../../styles/transcribe.styles";

const TranscribeResult = ({ transcript }) => {
  const [checked, setChecked] = useState(true);

  return (
    <View style={styles.resultContainer}>
      <Card>
        <Card.Title
          title={transcript}
          right={() => (
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(!checked)}
            />
          )}
        />
      </Card>
    </View>
  );
};

export default TranscribeResult;
