const { readFile, writeFile } = require("fs/promises")
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const { error } = require("console");
const { v4: uuidv4 } = require('uuid');
const app = express();
////////////////////////////////////////////////
/////////////////////////////////////////////////
const fs = require("fs")

const fileName = './tryMe.json';
const fileExists = fs.existsSync(fileName);
console.log(`${fileName} exists:`, fileExists);
if (!fileExists) {
  console.log("Creating the file")
  fs.writeFileSync(fileName, JSON.stringify([]));
}
let fellow = {
  "name": "Jane Doe"
}

const contents = readFile(fileName);
const database = JSON.parse(contents);
const newUser = database[fellow];
const dataString = JSON.stringify(database)
writeFile(fileName, dataString);
