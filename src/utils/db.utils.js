import AWS from "aws-sdk";
import { access } from "./aws.utils";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: access.accessKeyId,
  secretAccessKey: access.secretAccessKey,
  sessionToken: access.sessionToken,
});

/**
 * @type {DynamoDB} creates connection to DynamoDB tables
 */
const DDB = new AWS.DynamoDB();

/**
 * Adds a single food item into the Food table
 * @param id - the pantry item id
 * @param label - the pantry item name
 * @param amt - the pantry item quantity
 */
export const addFoodItem = (id, label, amt) => {
  const params = {
    TableName: "Food",
    Item: {
      "foodID": { S: id },
      "foodLabel": { S: label },
      "quantity": { S: amt },
      "addDate": { S: new Date().toISOString().slice(0, 10) },
    },
  };

  DDB.putItem(params, (err, data) =>
    console.log(err ? `Error: ${err}` : "Food item added to pantry"));
};

/**
 * Gets all the food items in the pantry & returns a list of all items
 */
export const getAllFoodItems = (callback) => {
  const params = {
    TableName: "Food",
  };

  DDB.scan(params, (err, data) => {
    console.log(err ? `Error: ${err}` : `Food in Pantry: ${JSON.stringify(data.Items)}`);
    callback(data.Items);
  });
};

/**
 * Updates an item in the pantry if the amount is changed
 * @param id  id of a food item being updated
 * @param amt new amount/quantity of the food item
 */
// FIXME: Produces the following error when executed:
//  ValidationException: The provided key element does not match the schema null
export const updateFoodAmt = (id, amt) => {
  const params = {
    TableName: "Food",
    Key: {
      foodID: { S: id },
    },
    UpdateExpression: "set quantity = :a",
    ExpressionAttributeValues: {
      ":a": { S: amt },
    },
  };

  DDB.updateItem(params, (err, data) =>
    console.log(err ? `Error: ${err}` : "Successfully retrieved item", data));
};

/**
 * Removes an item from the Food table
 * @param id - the pantry item id
 * @param label - the pantry item name
 */
export const removeItem = (id, label) => {
  const params = {
    TableName: "Food",
    Key: {
      "foodID": { S: id },
      "foodLabel": { S: label },
    },
  };

  DDB.deleteItem(params, (err) =>
    console.log(err ? `Error: ${err}` : "Item deleted successfully"));
};

/**
 * Adds all the items received from Transcribe function to the food table
 * @param itemsList list of items received from Transcribe
 */
export const addTranscribedItem = (itemsList) => {
  let foodName;
  const id = `item${Math.floor(Math.random() * 100000) + 1}`;
  const today = new Date().toISOString().slice(0, 10);

  const params = {
    TableName: "Food",
    Item: {
      "foodID": { S: id },
      "foodLabel": { S: foodName },
      "quantity": { S: "good" },
      "addDate": { S: today },
    },
  };

  for (let i = 0; i < itemsList.length; i++) {
    foodName = itemsList[i];
    params.Item.foodLabel = { S: foodName };
    DDB.putItem(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Food items added to pantry");
      }
    });
  }
};

/**
 * Adds a recipe to the Recipe table
 * @param recipeLabel name of recipe
 * @param recipeURL url of recipe
 */
// FIXME: AttributeValue empty, must contain supported datatypes
export const addRecipe = (recipeLabel, recipeURL) => {
  const params = {
    TableName: "Recipe",
    Item: {
      "recipeLabel": { S: recipeLabel },
      "recipeURL": { S: recipeURL },
    },
  };

  DDB.putItem(params, (err, data) =>
    console.log(err ? `Error: ${err}` : "Recipe added to Pantry", data));
};

/**
 * Removes a recipe from the Recipe table
 * @param recipe entire recipe item
 */
export const removeRecipe = (recipe) => {
  const params = {
    TableName: "Recipe",
    Key: {
      "recipeLabel": { S: recipe.label },
      "url": { S: recipe.url },
    },
  };

  DDB.deleteItem(params, (err, data) =>
    console.log(err ? `Error: ${err}` : "Recipe deleted successfully", data));
};

export const addTranscript = (fileID, transcript) => {
  const params = {
    TableName: "Transcription",
    Item: {
      "fileID": { S: fileID },
      "transcript": { S: transcript },
    },
  };

  DDB.putItem(params, (err, data) =>
    console.log(err ? `Error: ${err}` : "Transcript added: ", data));
};
