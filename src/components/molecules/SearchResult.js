import React from "react";
import { View } from "react-native";
import { Button, Card, List } from "react-native-paper";

const SearchResult = ({ recipe }) => {
  return (
    <View>
      <Card>
        <Card.Title
          title={recipe.hasOwnProperty("label") && recipe.label}
          subtitle={
            `Serves ${recipe.yield}, 
              Calories: ${recipe.calories}`
          }
        />
        <Card.Cover source={{ uri: recipe.image }} />
        <Card.Actions>
          <Button>View Recipe</Button>
          <Button>Save</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default SearchResult;
