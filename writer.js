const { readFile, writeFile } = require("fs/promises")
const fs = require("fs")
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const { error } = require("console");
const { v4: uuidv4 } = require('uuid');
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
  try {
    const contents = await readFile(fileName);
    const database = JSON.parse(contents);
    database[uuidv4()] = req.body;
    const string = JSON.stringify(database)
    await writeFile(fileName, string);
    res.send('New user data created.');
  } catch (err) {
    res.status(500).send('Failed to create new user.');
  }
});
//////////////////////////////////////////////////

router.delete('/users/delete/:id', async (req, res) => {
  try {
    const contents = await readFile(fileName);
    const database = JSON.parse(contents);
    const check = database.hasOwnProperty(req.params.id)
    if (check === false) {
      res.send('No such data');
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
////////////////////////////////////////////////
router.put('/users/update/:id', async (req, res) => {
  try {
    const contents = await readFile(fileName);
    const database = JSON.parse(contents);
    const check = database.hasOwnProperty(req.params.id);
    if (check === false) {
      res.send('No such data');
    } else {
      database[req.params.id] = req.body;
      const dataString = JSON.stringify(database)
      await writeFile(fileName, dataString);
      res.send('User updated.');
    }
  } catch (err) {
    res.status(500).send('Failed to update user data.');
  }
});
////////////////////////////////////////////////
router.get('/users/:id', async (req, res) => {
  try {
    const contents = await readFile(fileName);
    const database = JSON.parse(contents);
    const check = database.hasOwnProperty(req.params.id);
    if (check === false) {
      res.send('No such data');
    } else {
      res.send({...database[req.params.id]});
    }
  } catch (err) {
    res.status(500).send('Failed to retrieve user data.');
  }

})

router.get('/users', async (req, res) => {
  try {
    const contents = await readFile(fileName);
    const database = JSON.parse(contents);
    if (contents === {}) {
      res.status(404).send('Database seems to be empty.')
    } else {
      res.send({...database});
    }
  } catch (err) {
    res.status(500).send('Failed to retrieve user data.');
  }
})

////////////////////////////////////////////////
app.listen(666);