import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

var AWS = require('aws-sdk')

AWS.config.update({
  region: "us-east-1"
});

const ddb = new AWS.DynamoDB;

// gets today's date YYYY-MM-DD
let today = new Date().toISOString().slice(0, 10)

// generates unique id for each food item
const id = `food${Math.floor(Math.random() * 100000) + 1}`;

const FOOD_TABLE_NAME = "Food"
const RECIPE_TABLE_NAME = "Recipe"
const TRANSCRIPTION_TABLE_NAME = "Transcription"

const Pantry = () => {

  /*
  Food Item Functions
   */

  const addFoodItem = () => {

    var params = {
      TableName: FOOD_TABLE_NAME,
      Item: {
        "foodID": {S: id},
        "foodLabel": {S: "demo"},
        "quantity": {N: "1"},
        "addDate": {S: today }
      },
    }
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Food item added to pantry: ");
        console.log(data);
      }
    });
    return (params.Item);
  }


// Remove food from pantry, regardless of quantity
  const removeFood = () => {
    var params = {
      TableName: FOOD_TABLE_NAME,
      Key: {
        "foodLabel": { S: "demo" }
      }
    }

    ddb.deleteItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Food Delete Success", data);
      }
    });
  }

// Retrieve food item from pantry
  const getFoodItem = () => {
    var params = {
      TableName: FOOD_TABLE_NAME,
      Key: {
        "foodLabel": { S: "demo" }
      },
      ProjectionExpression: "foodLabel, foodQty"
    };

    ddb.getItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Successfully retrieved item: ", data.Item);
      }
    });
  }

  const scanFoodPantry = () => {
    var params = {
      TableName: "Food"
    };

    ddb.scan(params, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Food in Pantry: ", data);
        return data.Items;
      }
    })
  }

  /*
  Recipe Functions
   */

  const addRecipe = async () => {
    var params = {
      TableName: RECIPE_TABLE_NAME,
      Item: {
        "recipeLabel": {S: "demo recipe" },
        "recipeURL": {S: "demo url" }
      }
    }

    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Recipe added to pantry: ");
        console.log(data);
      }
    })
  }

// remove recipe from pantry, regardless of quantity
  const removeRecipe = async () => {
    var params = {
      TableName: RECIPE_TABLE_NAME,
      Key: {
        "recipeLabel": { S: "demo recipe" }
      }
    }

    ddb.deleteItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Recipe Delete Successfully", data);
      }
    });
  }


  const getRecipe = () => {
    var params = {
      TableName: RECIPE_TABLE_NAME,
      Key: {
        "recipeLabel": { S: "demo recipe" }
      },
      ProjectionExpression: "recipeLabel, recipeURL"
    };

// Call DynamoDB to read the item from the table
    ddb.getItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Successfully retrieved recipe: ", data.Item);
      }
    });
  }

  /*
  Transcription Functions
   */

  const addTranscriptFood = (transcript) => {

  }

  return (
    <View>
      <Button title="Add Food Item" onClick={addFoodItem()}/>
      <Button title="Add Recipe" onClick={addRecipe()}/>
      <Button title="Remove Recipe" onClick={removeRecipe()}/>
      <Button title="View Pantry" onClick={scanFoodPantry()}/>
    </View>
  );
}
export default Pantry;
