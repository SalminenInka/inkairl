const fs = require("fs")
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const { error } = require("console");
const app = express();

////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/////////////////////////////////////////////////

const fileName = './tryMe.json';
const fileExists = fs.existsSync(fileName);
console.log(`${fileName} exists:`, fileExists);
if (!fileExists) {
  console.log("Creating the file")
  fs.writeFileSync(fileName, JSON.stringify([]));
}

/////////////////////////////////////////////////

router.post('/handle', async (req,res) => {
  //code to execute
  try {
    function adder() {
      console.log('check-box 1');
      const cont = fs.readFileSync(fileName);
      const parsed = JSON.parse(cont);
      parsed.push(req.body);
      console.log(req.body);
      const string = JSON.stringify(parsed)
      fs.writeFileSync(fileName, string);
    }
    adder();
    } catch (err) {
    res.status(500).end();
    console.log('An error occured.');
  }
});

app.use("/", router);

////////////////////////////////////////////////

app.listen(666);