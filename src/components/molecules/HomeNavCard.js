import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, IconButton } from "react-native-paper";

import styles from "../../styles/home.styles";

const HomeNavCard = ({ dest, ico, bg }) => {
  const navigation = useNavigation();

  return (
    <Card style={styles.navCardContainer}>
      <Card.Content style={{ backgroundColor: bg }}>
        <IconButton
          style={styles.navCardIco}
          icon={ico}
          size={60}
        />
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {
          console.log(`${dest} card pressed`);
          navigation.navigate(dest);
        }}>
          {`go to ${dest}`}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default HomeNavCard;
