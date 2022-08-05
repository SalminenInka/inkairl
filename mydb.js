const express = require('express');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const app = express();

app.use("/", router);
app.use(express.json());
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: +process.env.DB_POOL_SIZE,
  queueLimit: 0
});

//display all user data, all users
router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool
    .execute('SELECT * FROM users');
    res.json([rows]);
  } catch (err) {
    res.status(500).json('Failed to retrieve user data.');
  }
});

//display user data for user/specific id
router.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await pool.
    execute('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
    res.json([rows]);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete user data with user/id
router.delete('/users/:id', async (req, res) => {
  try {
    await pool.
    execute('DELETE FROM users WHERE user_id = ?', [req.params.id]);
    res.json('deleted user: ' + req.params.id);
  } catch (err) {
    res.status(500).json('Failed to delete user data.');
  }
});

//create new user with post() not done
router.post('/users', async (req, res) => {
  try {
    const id = uuidv4();
    console.log(id);
    console.log(req)
    const { lastname, firstname, age } = req.body;
    await pool.execute('INSERT INTO users (user_id, lastname, firstname, age) VALUES (?, ?, ?, ?)',
    [id, lastname, firstname, age]);
    res.json({id});
  } catch (err) {
    res.status(500).json(err);
  }
});

//update user data with put() not done
router.put('/users/:id', async (req, res) => {
  try {
    const { lastname, firstname, age } = req.body;
    const [rows] = await pool.
    execute('UPDATE users SET lastname ?, firstname = ?, age ? WHERE `user_id` = ?', [lastname, firstname, age, req.params.id]);
    res.json([rows]);
  } catch (err) {
    res.status(500).json('Failed to update user data.');
  }
})

app.listen(process.env.PORT);
