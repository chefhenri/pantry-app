import React from "react";
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN
} from "@env";

var AWS = require('aws-sdk')

AWS.config.update({
  region: "us-east-1",
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey:AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN
});
/**
 * @type {DynamoDB} creates connection to DynamoDB tables
 */
const ddb = new AWS.DynamoDB();

export const AMOUNT = {
  NONE: "none",
  OKAY: "okay",
  GOOD: "good",
};
export const AMOUNT_ICON = {
  NONE: "border-none-variant",
  OKAY: "arrow-collapse-down",
  GOOD: "arrow-collapse-up",
};

export const PantryContext = React.createContext({
  items: {},
  update: () => {
  },
});

/**
 * Get id of an item based on food label/name
 * @param label name of an item
 * @returns {string} food id
 */
export const getItemId = (label) => {
  return `item-${
    label
      .split("")
      .slice(0, 2)
      .map((char, idx) => label.charCodeAt(idx)).join("")
  }`;
};

/**
 * Get matching icon to amount inputted
 * @param amt amount
 * @returns {string} amount type
 */
export const getAmtIcon = (amt) => {
  switch (amt) {
    case "none":
      return AMOUNT_ICON.NONE;
    case "okay":
      return AMOUNT_ICON.OKAY;
    case "good":
      return AMOUNT_ICON.GOOD;
  }
};

/**
 * Adds a single food item into the Food table
 * @param id
 * @param foodName
 * @param amount
 */
export const addFoodItem = (id, foodName, amount) => {
  var params = {
    TableName: "Food",
    Item: {
      "foodID": {S: id},
      "foodLabel": {S: foodName},
      "quantity": {S: amount },
      "addDate": {S: new Date().toISOString().slice(0, 10) }
    },
  }
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Food item added to pantry");
    }
  });
}

/**
 * Adds all the items received from Transcribe function to the food table
 * @param itemsList list of items received from Transcribe
 */
export const addTranscribedItem = (itemsList) => {
  const id = `item${Math.floor(Math.random() * 100000) + 1}`;
  const today = new Date().toISOString().slice(0, 10);
  let foodName;
  var params = {
    TableName: "Food",
    Item: {
      "foodID": {S: id},
      "foodLabel": {S: foodName},
      "quantity": {S: "good"},
      "addDate": {S: today}
    },
  }
  for (let i = 0; i < itemsList.length; i++) {
    foodName = itemsList[i]
    params.Item.foodLabel = {S: foodName}
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Food items added to pantry");
      }
    });
  }
}

/**
 * Returns amount in String form based on amount inputted
 * @param amt amount of an item
 * @returns {string} value of the amount inputted
 */
export const getAmtText = (amt) => {
  switch (amt) {
    case AMOUNT.NONE:
      return "None";
    case AMOUNT.OKAY:
      return "Okay";
    case AMOUNT.GOOD:
      return "Good";
  }
};

/**
 * Updates the amount of an item in the pantry on the application
 * @param id  id of food item being updated
 * @param amt new amount of the food item
 * @param items
 * @param update
 */
export const updateItemAmt = (id, amt, items, update) => {
  let item = items[id];

  update(({
    ...items,
    [item.id]: {
      label: item.label,
      amount: amt,
    },
  }));
};

/**
 * Updates an item in the pantry if the amount is changed
 * @param id  id of a food item being updated
 * @param amt new amount/quantity of the food item
 */
export const updateFoodItem = (id, amt) => {
  var params = {
    TableName: "Food",
    Key: {
      "foodID": {S: id}
    },
    UpdateExpression: "set quantity = :a",
    ExpressionAttributeValues:{
      ":a" : amt
    }
  };

  ddb.updateItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Successfully retrieved item: ", data);
    }
  });
}

/**
 * Gets all the food items in the pantry & returns a list of all items
 */
export const getAllFoodItems = () => {
  var params = {
    TableName: "Food"
  };

  ddb.scan(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Food in Pantry: ", data.Items);
    }
    return data.Items
  })
}

/**
 * Removes an item from the Food table
 * @param item food item
 */
export const removeItem = (item) => {
  var params = {
    TableName: "Food",
    Key: {
      "foodID": { S: item.id},
      "foodLabel": {S: item.foodLabel}
    }
  }

  ddb.deleteItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Item Deleted Successfully", data);
    }
  });
}

/**
 * Adds a recipe to the Recipe table
 * @param recipeLabel name of recipe
 * @param recipeURL url of recipe
 */
export const addRecipe = (recipeLabel, recipeURL) => {
  var params = {
    TableName: "Recipe",
    Item: {
      "recipeLabel": {S: recipeLabel},
      "recipeURL": {S: recipeURL }
    }
  }

  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Recipe added to pantry");
      console.log(data);
    }
  })
}

/**
 * Removes a recipe from the Recipe table
 * @param recipe entire recipe item
 */
export const removeRecipe = (recipe) => {
  var params = {
    TableName: "Recipe",
    Key: {
      "recipeLabel": { S: recipe.label},
      "url": {S: recipe.url}
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
