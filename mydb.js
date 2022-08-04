
const express = require('express');
const router = express.Router();
const app = express();
const mysql = require('mysql2/promise');
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
app.use("/", router);


//display all user data, all users
router.get('/users', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host:'localhost',
      user: 'root',
      database: 'userdb',
      password: process.env.PASSWORD
    });
    const [rows] = await connection.
    execute('SELECT * FROM users');
    res.json([rows]);
  } catch (err) {
    res.status(500).send('Failed to retrieve user data.');
  }
});

//display user data for user/specific id
router.get('/users/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host:'localhost',
      user: 'root',
      database: 'userdb',
      password: process.env.PASSWORD
    });
    const [rows] = await connection.
    execute('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
    res.json([rows]);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete user data with user/id
router.delete('/users/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host:'localhost',
      user: 'root',
      database: 'userdb',
      password: process.env.PASSWORD
    });
    await connection.
    execute('DELETE FROM users WHERE user_id = ?', [req.params.id]);
    res.json('deleted user: ' + req.params.id);
  } catch (err) {
    res.status(500).send('Failed to delete user data.');
  }
});

//create new user with post() not done
router.post('/users', async (req, res) => {
  try {
    const id = uuidv4();
    const connection = await mysql.createConnection({
      host:'localhost',
      user: 'root',
      database: 'userdb',
      password: process.env.PASSWORD
    });
    await connection.
    execute('INSERT INTO users (user_id, lastname, firstname, age) VALUES (?, ?, ?, ?)',
    [id, req.body.lastname, req.body.firstname, req.body.age]);
    res.json({id});
  } catch (err) {
    res.status(500).send('Failed to create new user.');
  }
});

//update user data with put() not done
router.put('/users/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host:'localhost',
      user: 'root',
      database: 'userdb',
      password: process.env.PASSWORD
    });
    const [rows] = await connection.
    execute('SELECT FROM `users` WHERE `user_id` = ?', [req.params.id]);
    res.json([rows]);
  } catch (err) {
    res.status(500).send('Failed to update user data.');
  }
})

app.listen(process.env.PORT);
