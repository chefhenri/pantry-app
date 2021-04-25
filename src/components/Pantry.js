import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';

var AWS = require('aws-sdk')
var uuid = require('node-uuid')

AWS.config.update({
  region: "us-east-1"
});

// gets today's date YYYY-MM-DD
let today = new Date().toISOString().slice(0, 10)

// generates unique id for each food item
const id = uuid();

const FOOD_TABLE_NAME = "Food"
const RECIPE_TABLE_NAME = "Recipe"
const ING_TABLE_NAME = "Ingredients"

const docClient = new AWS.DynamoDB.DocumentClient();

export default class Pantry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "Select Action",
      pantry: [{"foodName":"", "quantity":0}]
    }
  }

  addFoodItem = () => {
    let currPantry = this.state.pantry;
    const foodName = document.getElementById("foodName");
    const quantity = document.getElementById("quantity");
    const expDate = document.getElementById("expDate");

    var params = {
      TableName: FOOD_TABLE_NAME,
      Key: {
        "foodID": id.toString(),
        "label": foodName,
        "quantity": quantity,
        "addDate": today,
        "expDate": expDate,
      },
    }

    console.log("Adding item to pantry...");
    docClient.put(params, function(err, data) {
      if (err){
        console.log(err);
      } else {
        console.log("Food item added to pantry: ");
        console.log(data);
        //updates state pantry
        currPantry.push({ "foodName": foodName, "quantity": quantity });
      }
    })
  }

  addRecipe = () => {
    const recipeName = document.getElementById("recipeName")
    const url = document.getElementById("url")

    var params = {
      TableName: RECIPE_TABLE_NAME,
      Key: {
        "label": recipeName,
        "url": url
      }
    }

    console.log("Adding a new recipe...")
    docClient.put(params, function(err, data){
      if (err){
        console.log(err);
      } else {
        console.log("Food item added to pantry: ");
        console.log(data);
      }
    })
  }

  scanPantry = () => {
    var currPantry = this.state.pantry;
    var params = {
      TableName: FOOD_TABLE_NAME
    };

    console.log("Scanning Pantry...");
    docClient.scan(params, scanTable);

    function scanTable(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Scan completed:");
        data.Items.forEach(function(item) {
          console.log(item);
        });
      }
    }

    //formats state pantry into a list of food items & qty to return
    const pantryList = currPantry.map((food) => <li key={food.foodName}>{food.foodName} + ": " + {food.quantity}</li>)
    return (
      <div>
        {pantryList}
      </div>
    )
  }

  searchPantry = () => {
    //TODO
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  render() {
    let form;
    if (this.state.action === "Add Food Item"){
      form =
        <form id="addFoodItemForm">
          <input type="text" id="foodName">Food Name</input>
          <input type="text" pattern="[0-9]*" id="quantity">Quantity</input>
          <input type="text" id="expDate">Expiration Date</input>
          <Button onClick={this.addFoodItem()} title="Add Item"/>
        </form>;
    } else if (this.state.action === "Add Recipe"){
      form =
        <form id="addRecipeForm">
          <input type="text" id="recipeName">Recipe Name</input>
          <input type="text" id="url">Original URL</input>
          <Button onClick={this.addRecipe()} title="Add Recipe"/>
        </form>;
    } else if (this.state.action === "Search Pantry"){
      form =
        <form id="searchForm">
          <input type="text" id="filter">Search For: </input>
          <Button onClick={this.searchPantry} title="Search"/>
        </form>
    } else {
      form = "";
    }

    return (
      <View>
        <h1>Pantry</h1>
        <select value={this.state.action} onChange={this.myChangeHandler}>
          <option value="Select Action">Select Option</option>
          <option value="Add Food Item">Add Food Item</option>
          <option value="Add Recipe">Add Recipe</option>
          <option value="Search Pantry">Search Pantry</option>
        </select>
        {form}
        <Button onClick={this.scanPantry()}>View Pantry</Button>
      </View>
    );
  }

}
