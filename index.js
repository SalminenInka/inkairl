const { readFile, writeFile } = require("fs/promises")
const fs = require("fs")
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const { error } = require("console");
const { v4: uuidv4 } = require('uuid');
const app = express();
const mysql = require('mysql2/promise');

async function main(command) {
  const connection = await mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'userdb',
    password: process.env.PASSWORD
  });
  const [rows, fields] = await connection.
  execute(command);
  return rows;
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

//dispaly all user data, all users
router.get('/users', async (req, res) => {
  try {
    const contents = await main('SELECT * FROM `users`');
    res.json(contents);
  } catch (err) {
    res.status(500).send('Failed to retrieve user data.');
  }
});

//display user data for user/specific id
router.get('/users/:id', async (req, res) => {
  try {
    const contents = await main("SELECT * FROM `users` WHERE `user_id` = `?`", [req.params.id])
    res.json(contents);
  } catch (err) {
    res.status(500).send(err);
  }
});

//create new user with post()
router.post('/users', async (req,res) => {
  try {
    const contents = await main('INSERT INTO `users` VALUES (`?`)');
    res.json(contents);
  } catch (err) {
    res.status(500).send('Failed to create new user.');
  }
});

//delete user data with user/id
router.delete('/users/:id', async (req, res) => {
  try {
    const contents = await main('DELETE FROM users WHERE user_id = ?', [req.params.id])
    res.json(contents);
  } catch (err) {
    res.status(500).send('Failed to delete user data.');
  }
});
/*
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
    const contents = await readFile(fileName);
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
    const contents = await readFile(fileName);
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
    const contents = await readFile(fileName);
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
    const contents = await readFile(fileName);
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

//display all user data, all users
router.post('/users', async (req,res) => {
  try {
    const contents = await readFile(fileName);
    const database = JSON.parse(contents);
    database[uuidv4()] = req.body;
    const string = JSON.stringify(database)
    await writeFile(fileName, string);
    res.json({ id: Object.keys(database)[Object.keys(database).length-1]});
  } catch (err) {
    res.status(500).send('Failed to create new user.');
  }
});
*/
app.listen(process.env.PORT);