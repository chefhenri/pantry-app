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

export const getItemId = (label) => {
  return `item-${
    label
      .split("")
      .slice(0, 2)
      .map((char, idx) => label.charCodeAt(idx)).join("")
  }`;
};

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

// adds a single item to pantry
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

// adds list of items from transcribe to pantry
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

// update food item in database when amt is changed
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

// get all food items in pantry
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

// add recipe to recipes table
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

// remove recipes from recipe table [not tested]
export const removeRecipe = (item) => {
  var params = {
    TableName: "Recipe",
    Key: {
      "recipeLabel": { S: item.label},
      "url": {S: this.item.url}
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
