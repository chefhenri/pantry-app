const AWS = require("aws-sdk");

const createFoodTable = (db) => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "foodID",
        AttributeType: "S",
      },
      {
        AttributeName: "foodLabel",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "foodID",
        KeyType: "HASH",
      },
      {
        AttributeName: "foodLabel",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    TableName: "Food",
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  db.createTable(params, (err, data) =>
    console.log(err ? `Error: ${err}` : `Food table created\n${data}`));
};

const createRecipeTable = (db) => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "recipeLabel",
        AttributeType: "S",
      },
      {
        AttributeName: "recipeURL",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "recipeLabel",
        KeyType: "HASH",
      },
      {
        AttributeName: "recipeURL",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    TableName: "Recipe",
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  db.createTable(params, (err, data) =>
    console.log(err ? `Error: ${err}` : `Recipe table created\n${data}`));
};

const createTranscriptTable = (db) => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "fileID",
        AttributeType: "S",
      },
      {
        AttributeName: "transcript",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "fileID",
        KeyType: "HASH",
      },
      {
        AttributeName: "transcript",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    TableName: "Transcription",
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  db.createTable(params, (err, data) =>
    console.log(err ? `Error: ${err}` : `Transcript table created\n${data}`));
};

(() => {
  // Set AWS region
  AWS.config.update({region: 'us-east-1'});

  // DynamoDB Service object
  const DDB = new AWS.DynamoDB;

  // Create tables for import into Amplify Storage
  createFoodTable(DDB);
  createRecipeTable(DDB);
  createTranscriptTable(DDB);
})();
