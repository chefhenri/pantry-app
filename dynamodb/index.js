var AWS = require('aws-sdk')
var uuid = require('node-uuid')

// gets today's date YYYY-MM-DD
let today = new Date().toISOString().slice(0, 10)
// generates unique id for each food item
const id = uuid();

const FOOD_TABLE_NAME = "Food"
const RECIPE_TABLE_NAME = "Recipe"
const PANTRY_TABLE_NAME = "Pantry"

const docClient = new AWS.DynamoDB.DocumentClient();

var foodTableParams = {
  TableName: FOOD_TABLE_NAME,
  Item: {
    "foodID": id,
    "foodLabel": "",
    "addDate": today,
  }
};

docClient.put(foodTableParams, function(err, data) {
  if (err){
    console.log(err)
  } else {
    console.log(data)
  }
})

// function to create a food item to track items added
async function createFoodItem(foodData) {
  var params = {
    TableName: FOOD_TABLE_NAME,
    Item: foodData,
  }
  try {
    await docClient.put(params)
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const { data } = event.body
    await createFoodItem(data)
    return { body: 'Food item successfully created' }
  } catch (err) {
    return { error: err }
  }
}

var pantryTableParams = {
  TableName: PANTRY_TABLE_NAME,
  Item: {
    "foodLabel": "",
  }
}

docClient.put(pantryTableParams, function(err, data) {
  if (err){
    console.log(err)
  } else {
    console.log(data)
  }
})

// function to add food item into pantry
async function pantryAddFood(foodItem){
  var params = {
    TableName: PANTRY_TABLE_NAME,
    Item: foodItem,
  }
  try {
    await docClient.put(params)
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const { data } = event.body
    await pantryAddFood(data)
    return { body: 'Food item added to Pantry' }
  } catch (err) {
    return { error: err }
  }
}

// Scan Pantry table and returns all the data in table
console.log("Scanning Pantry...");
docClient.scan(pantryTableParams, scanPantry);

function scanPantry(err, data){
  if (err) {
    console.error("Unable to scan Pantry table")
  } else {
    console.log("Pantry: ");
    data.Item.forEach(function(foodItem) {
      console.log(
        foodItem.foodID,  ": ", foodItem.foodLabel);
    });
  }
}
