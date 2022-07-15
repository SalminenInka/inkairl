const fs = require("fs")
var express = require('express');
var app = express();

////////////////////////////////////////////////
class Person {

constructor(Name, Age) {
  this.Name = Name;
  this.Age = Age;
  }
}
////////////////////////////////////////////////
const myObject = new Person('Jane Doe', 666);
const nextObject = new Person('John Deere', 999);
const typeTester = new Person('Type test', 888)

/////////////////////////////////////////////////

let fileExists = fs.existsSync('./tryMe.json');
console.log("tryMe.json exists:", fileExists);
if (!fileExists) {
  console.log("Creating the file")
  let content = '[]'
  fs.writeFileSync('./tryMe.json', content);
}

/////////////////////////////////////////////////

addOne(myObject);
addOne(nextObject);
addOne(typeTester);

async function addOne(data) {
  let arr = fs.readFileSync('./tryMe.json');
  let file = JSON.parse(arr);
  file.push(data);
  let string = JSON.stringify(file)
  fs.writeFileSync('./tryMe.json', string );
}


/////////////////////////////////////////////

/////////////////////////////////////////////
