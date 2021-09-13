const mongoose = require('./libs/mongoose')
const PeopleModel = require('./models/people')
const faker = require('faker')

let people = []

for (let i = 0; i < 10000; i++) {
  people.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: faker.date.past(50),
    accountBalance: faker.datatype.number(1000000),
    pets: [faker.animal.dog(), faker.animal.cat(), faker.animal.snake()],
    active: Math.random() > 0.5,
  })
}

PeopleModel.insertMany(people)
  .then(() => console.log('insertados'))
  .catch((e) => console.error(e))
  .finally(() => process.exit(0))
