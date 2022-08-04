const mysli = require('mysql2');

const connection = mysli.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'userdb',
  password: 'Smörrebröd2022'
});

connection.query(
  'SELECT lastname FROM `users`',
  (err, results, fields) => {
    console.log(results); // results contains rows returned by server
  }
);

