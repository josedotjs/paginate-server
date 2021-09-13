const mongoose = require('./libs/mongoose')
const ProductModel = require('./models/product')
const faker = require('faker')

let products = []

for (let i = 0; i < 1000; i++) {
  products.push({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  })
}

ProductModel.insertMany(products)
  .then(() => console.log('insertados'))
  .catch((e) => console.error(e))
  .finally(() => process.exit(0))
