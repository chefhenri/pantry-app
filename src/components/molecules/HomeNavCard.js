import React from "react";
import { Button, Card, IconButton } from "react-native-paper";

import styles from "../../styles/home.styles";

const HomeNavCard = ({ dest, ico, bg, nav }) => {
  return (
    <Card style={styles.navCardContainer}>
      <Card.Content style={{ backgroundColor: bg }}>
        <IconButton
          style={styles.navCardIco}
          icon={ico}
          size={60}
        />
      </Card.Content>
      {/*<Card.Cover source={{ uri: src }} />*/}
      <Card.Actions>
        <Button onPress={() => {
          console.log(`${dest} card pressed`);
          // FIXME: nav.navigate() undefined
          // nav.navigate(dest);
        }}>
          {`go to ${dest}`}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default HomeNavCard;
