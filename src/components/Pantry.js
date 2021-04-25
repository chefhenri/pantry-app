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

const docClient = new AWS.DynamoDB.DocumentClient();

export default class Pantry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "Select Action",
      pantry: []
    }
  }

  addFoodItem = (foodName, quantity, expDate) => {
    var params = {
      TableName: FOOD_TABLE_NAME,
      Item: {
        "foodID": id.toString(),
        "label": foodName.toString(),
        "quantity": quantity.toInteger(),
        "addDate": today,
        "expDate": expDate.toString()
      },
    }

    docClient.put(params, function(err, data) {
      console.log(data);
      if (err){
        console.log(err)
      } else {
        console.log(data)
        this.state.pantry.push(data)
      }
    })
  }

  scanPantry = () => {
    var pantry = this.state.pantry;
    var params = {
      TableName: FOOD_TABLE_NAME
    };

    console.log("Scanning Pantry...");
    docClient.scan(params, scanTable);

    function scanTable(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Scan successful.");
        data.Items.forEach(function(item) {
          pantry.push(item.label + ":" + item.quantity);
          console.log(item.label + ":" + item.quantity);
        });
      }
    }

    return (
      <div>
        {pantry.map(function (name, qty){
          return(<li key={name}> {name} + " " + {qty} </li>);
        })}
      </div>
    )

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
          <input type="text" id="foodLabel">Food Name</input>
          <input type="text" pattern="[0-9]*" id="quantity">Quantity</input>
          <input></input>
          <Button onClick={this.addFoodItem()}/>
        </form>;
    } else if (this.state.action === "Add Recipe"){
      form =
        <form id="addRecipeForm">

        </form>;
    } else {
      form = "";
    }
    return (
      <View>
        <h1>My Pantry</h1>
        <select value={this.state.action} onChange={this.myChangeHandler}>
          <option value="Select Action">Select Option</option>
          {/*<option value="View Pantry">View Pantry</option>*/}
          <option value="Add Food Item">Add Food Item</option>
          <option value="Add Recipe">Add Recipe</option>
        </select>
        {form}
        <Button onClick={this.scanPantry()}>View Pantry</Button>
      </View>
    );
  }

}
