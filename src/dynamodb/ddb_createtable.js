// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set the region
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB;

const createFoodTable = () => {

  var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'foodID',
        AttributeType: 'S'
      },
      {
        AttributeName: 'foodLabel',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'foodID',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'foodLabel',
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: 'Food',
    StreamSpecification: {
      StreamEnabled: false
    }
  };

  ddb.createTable(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Food Table Created", data);
    }
  });
}

const createRecipeTable = () => {

  var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'recipeLabel',
        AttributeType: 'S'
      },
      {
        AttributeName: 'recipeURL',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'recipeLabel',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'recipeURL',
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: 'Recipe',
    StreamSpecification: {
      StreamEnabled: false
    }
  };

  ddb.createTable(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Recipe Table Created", data);
    }
  });
}

const createTranscriptionTable = () => {

  var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'fileID',
        AttributeType: 'S'
      },
      {
        AttributeName: 'transcript',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'fileID',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'transcript',
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: 'Transcription',
    StreamSpecification: {
      StreamEnabled: false
    }
  };

  ddb.createTable(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Transcription Table Created", data);
    }
  });
}

createFoodTable();
createRecipeTable();
createTranscriptionTable();
