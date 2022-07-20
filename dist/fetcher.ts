import { readFile, writeFile } from "fs/promises";
import fs = require("fs");
import express = require('express');
const router = express.Router();
import bodyParser = require("body-parser");
import { error } from "console";
import { v4 as uuidv4 } from 'uuid';
const app = express();
////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);
/////////////////////////////////////////////////
const fileName = './db.json';
const fileExists = fs.existsSync(fileName);
console.log(`${fileName} exists:`, fileExists);
if (!fileExists) {
  console.log("Creating the file")
  fs.writeFileSync(fileName, JSON.stringify({}));
}
/////////////////////////////////////////////////
router.post('/users/new', async (req,res) => {
  //code to execute
  try {
    console.log(req.body);
    const contents = await readFile(fileName);
    const string = JSON.stringify(contents)
    const database = JSON.parse(string);
    const newUser = database[req.body];
    await writeFile(fileName, newUser);
    res.send('New entry added to the database.');
  } catch (err) {
    res.status(500).send('Failed to add new entry.');
    console.log('Failed to add new entry.');
  }
});
//////////////////////////////////////////////////

router.delete('/users/delete/:id', async (req, res) => {
  try {
    const contents = await readFile(fileName);
    const database = JSON.parse(contents);
    delete database[req.params.id];
    const dataString = JSON.stringify(database)
    await writeFile(fileName, dataString);
    res.send('One entry deleted from the database.');
  } catch (err) {
    res.status(500).end();
    console.log('Failed to delete an entry.');
  }
});
////////////////////////////////////////////////
router.put('/users/update/:id', async (req, res) => {
  try {
    const contents = await readFile(fileName);
    const database = JSON.parse(contents);
    database[req.body.id] = req.body
  } catch (err) {
    res.status(500).end();
    console.log('Failed to update an entry.');
  }
});
////////////////////////////////////////////////
router.get('/users/:id', async (req, res) => {
  try {
    
  } catch (err) {
    res.status(500).end();
    console.log('Failed to retrieve user data.');
  }

})

router.get('/users', async (req, res) => {
  try {
    
  } catch (err) {
    res.status(500).end();
    console.log('Failed to retrieve data.');
  }
})

////////////////////////////////////////////////
app.listen(666);