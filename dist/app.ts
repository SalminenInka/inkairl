import { readFile, writeFile } from "fs/promises";
import fs = require("fs");
import express = require('express');
const router = express.Router();
import bodyParser = require("body-parser");
import { error } from "console";
import { v4 as uuidv4 } from 'uuid';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);
//check if file exists and create one if needed
const fileName = process.env.FILENAME;
const fileExists = fs.existsSync(fileName);
console.log(`${fileName} exists:`, fileExists);
if (!fileExists) {
  console.log("Creating the file")
  fs.writeFileSync(fileName, JSON.stringify({}));
}
//create new user with post()
router.post('/users', async (req,res) => {
  try {
    const contents = await readFile(fileName, 'utf-8');
    const database = JSON.parse(contents);
    database[uuidv4()] = req.body;
    const string = JSON.stringify(database)
    await writeFile(fileName, string);
    res.json({ id: Object.keys(database)[Object.keys(database).length-1]});
  } catch (err) {
    res.status(500).send('Failed to create new user.');
  }
});
//delete user data with user/id
router.delete('/users/:id', async (req, res) => {
  try {
    const contents = await readFile(fileName, 'utf-8');
    const database = JSON.parse(contents);
    const check = database.hasOwnProperty(req.params.id)
    if (check == false) {
      res.status(404).send('No such data');
    } else {
      delete database[req.params.id];
      const dataString = JSON.stringify(database)
      await writeFile(fileName, dataString);
      res.send('One entry deleted from the database.');
    }
  } catch (err) {
    res.status(500).send('Failed to delete user data.');
  }
});
//update user data with put()
router.put('/users/:id', async (req, res) => {
  try {
    const contents = await readFile(fileName, 'utf-8');
    const database = JSON.parse(contents);
    if (database.hasOwnProperty(req.params.id) == false) {
      res.status(404).send('No such data');
    } else {
      database[req.params.id] = req.body;
      const dataString = JSON.stringify(database)
      await writeFile(fileName, dataString);
      res.json({ [req.params.id]: database[req.params.id] });
    }
  } catch (err) {
    res.status(500).send('Failed to update user data.');
  }
});
//display user data for user/specific id
router.get('/users/:id', async (req, res) => {
  try {
    const contents = await readFile(fileName, 'utf-8');
    const database = JSON.parse(contents);
    if (database.hasOwnProperty(req.params.id) == false) {
      res.status(404).send('No such data');
    } else {
      res.json({...database[req.params.id]});
    }
  } catch (err) {
    res.status(500).send('Failed to retrieve user data.');
  }

})
//dispaly all user data, all users
router.get('/users', async (req, res) => {
  try {
    const contents = await readFile(fileName, 'utf-8');
    const database = JSON.parse(contents);
    if (Object.keys(database).length === 0) {
      res.status(404).send('Database seems to be empty.')
    } else {
      res.json(database);
    }
  } catch (err) {
    res.status(500).send('Failed to retrieve user data.');
  }
})

app.listen(process.env.PORT);