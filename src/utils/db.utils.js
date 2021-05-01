import AWS from "aws-sdk";
import { access } from "./aws.utils";
import { AMOUNT, getItemId } from "./pantry.utils";

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
 * Adds all the items received from Transcribe function to the Food table
 * @param items - list of transcribed items
 */
export const addTranscribedItems = (items) => {
  const today = new Date().toISOString().slice(0, 10);

  for (let item of items) {
    let params = {
      TableName: "Food",
      Item: {
        "foodID": { S: getItemId(item) },
        "foodLabel": { S: item.charAt(0).toUpperCase() + item.slice(1) },
        "quantity": { S: AMOUNT.NONE },
        "addDate": { S: today },
      },
    };

    DDB.putItem(params, (err, data) =>
      console.log(err ? `Error: ${err}` : "Transcribed items added to the Pantry", data));
  }
};

/**
 * Adds a recipe to the Recipe table
 * @param label - name of recipe
 * @param url - url of recipe
 */
// FIXME: AttributeValue empty, must contain supported data types
export const addRecipe = (label, url) => {
  const params = {
    TableName: "Recipe",
    Item: {
      "recipeLabel": { S: label },
      "recipeURL": { S: url },
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

/**
 * Adds the transcript to the Transcription table
 * @param fileID - transcript file id
 * @param transcript - transcribed text
 */
export const addTranscript = (fileID, transcript) => {
  const params = {
    TableName: "Transcription",
    Item: {
      "fileID": { S: fileID },
      "transcript": { S: transcript },
    },
  };

  DDB.putItem(params, (err) =>
    console.log(err ? `Error: ${err}` : "Transcript added"));
};
