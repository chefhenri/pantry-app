// import React, {Component} from 'react';

var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

function addFoodItem(){
  var table = "Food";

  var foodID = "";
  var label = "";
  let today = new Date().toISOString().slice(0, 10)

  var params = {
    TableName: table,
    Item: {
      "foodID": foodID,
      "label": label,
      "addDate": today,
      "category": "",
      "quantity": 1,
      "expDate": ""
    }
  };

  console.log("Adding new food item...")
  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add item: ", JSON.stringify(err, null, 2));
    } else {
      console.log("Food item added: ", JSON.stringify(data,null, 2) );
    }
  });
}

