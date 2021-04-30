import React from "react";
import { View } from "react-native";
import { Button, Card } from "react-native-paper";

import styles from "../../styles/search.styles";
import { addRecipe } from "../../utils/db.utils";

const SearchResult = ({ recipe }) => {
  return (
    <View>
      <Card style={styles.resultContainer}>
        <Card.Title
          title={recipe.hasOwnProperty("label") && recipe.label}
          subtitle={
            `Serves ${recipe.yield}, 
              Calories: ${recipe.calories}`
          }
        />
        <Card.Cover source={{ uri: recipe.image }} />
        <Card.Actions>
          <Button onPress={() => {
            // TODO: Show recipe in browser
            console.log("TODO: Show recipe in browser");
          }}>View Recipe</Button>
          <Button onPress={() => addRecipe(recipe.label, recipe.url)}>
            Save
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default SearchResult;
