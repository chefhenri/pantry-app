import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';

export default class Pantry extends Component {
  newFoodItem = () => {
    let form = JSON.stringify({
      "label": "New Food",
      "category": "Perishable or Non-Perishable",
      "quantity": "Quantity",
      "expDate": "Expiration Date"
    });

  }
}
