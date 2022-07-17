const fs = require("fs")
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

////////////////////////////////////////////////

class Person {
constructor(name, age) {
  this.name = name;
  this.age = age;
  }
}
////////////////////////////////////////////////

const myObject = new Person('Jane Doe', 666);
const nextObject = new Person('John Deere', 999);
const typeTester = new Person('Type test', 888);
const typeFester = new Person('Type fest', 889)

/////////////////////////////////////////////////
const fileName = './tryMe.json';
const fileExists = fs.existsSync(fileName);
console.log(`${fileName} exists:`, fileExists);
if (!fileExists) {
  console.log("Creating the file")
  fs.writeFileSync(fileName, JSON.stringify([]));
}
/////////////////////////////////////////////////

addOne(myObject);
addOne(nextObject);


async function addOne(data) {
  const arr = fs.readFileSync(fileName);
  const file = JSON.parse(arr);
  console.log(typeof(file));
  file.push(data);
  const string = JSON.stringify(file)
  fs.writeFileSync(fileName, string );
}
/////////////////////////////////////////////
