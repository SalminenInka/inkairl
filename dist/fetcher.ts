// totally typescript
import fs = require('fs/promises');
var express = require('express');
var app = express();

////////////////////////////////////////////////
class Person {
  Name: string;
  Age: number;
  constructor(Name: string, Age: number) {
    this.Name = Name;
    this.Age = Age;
  }
}
////////////////////////////////////////////////
const myObject = new Person('Jane Doe', 666);
const nextObject = new Person('John Deere', 999);
const typeTester = new Person('Type test', 888)

/////////////////////////////////////////////////

function writer() {
  fs.existsSync('./tryMe.json')
  if ('file is not found') {
    const content: string = '[]'
    fs.writeFileSync('./tryMe.json', content);
  }
}

/////////////////////////////////////////////////

async function addOne(data: Person) {
  let fileContents = await fs.readFile('./tryMe.json', { encoding: 'utf8' });
  let parsedContents = JSON.parse(fileContents);
  parsedContents.push(data);
  await fs.writeFile('./tryMe.json', JSON.stringify(fileContents, null, 2), { encoding: 'utf8' });
}

/////////////////////////////////////////////
writer();
addOne(myObject);
addOne(nextObject);
addOne(typeTester);

/////////////////////////////////////////////

/*
app.get('/', (req: any, res: { sendFile: (arg0: string) => void; }) => {
  res.sendFile('/Users/inkasalminen/Desktop/git/inkairl/tryMe.json');
})

app.listen(666);
*/
