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
const fileName = './tryMe.json';
const fileExists = fs.existsSync(fileName);
console.log(`${fileName} exists:`, fileExists);
if (!fileExists) {
  console.log("Creating the file")
  fs.writeFileSync(fileName, JSON.stringify([]));
}
/////////////////////////////////////////////////
router.post('/db/new', async (req,res) => {
  //code to execute
  try {
    const contents = fs.readFileSync(fileName);
    const parsed = JSON.parse(contents);
    req.body.id = uuidv4();
    parsed.push(req.body);
    console.log(req.body.name);
    const string = JSON.stringify(parsed)
    fs.writeFileSync(fileName, string);
    res.send(`${req.body.name} added to the database.`)
    } catch (err) {
    res.status(500).end();
    console.log('An error occured.');
  }
});
//////////////////////////////////////////////////

router.delete(`/db/delete/:id`, async (req, res) => {
  try {
    const contents = fs.readFileSync(fileName);
    const parsed = JSON.parse(contents);
    const idIndex = parsed.findIndex(p => p.id == req.params.id);
    parsed.splice(idIndex, 1);
    const string = JSON.stringify(parsed)
    fs.writeFileSync(fileName, string);
    res.send(`One entry deleted from the database.`);
  } catch (err) {
    res.status(500).end();
    console.log('An error occured.');
  }
});

////////////////////////////////////////////////
app.listen(666);