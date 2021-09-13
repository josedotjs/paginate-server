const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('./libs/mongoose')
mongoose.plugin(require('mongoose-paginate-v2'))
const queryPlugin = require('./mongoose_plugins/query')
mongoose.plugin(queryPlugin)
const ProductModel = require('./models/product')
const PeopleModel = require('./models/people')
const queryPaginatorParser = require('./middlewares/queryPaginatorParser')
mongoose.set('debug', { shell: true })
app.use(cors())
app.use(express.json())

app.get('/paginator', queryPaginatorParser, async (req, res) => {
  console.log('req.paginatorOptions', req.paginatorOptions)
  const people = await PeopleModel.queryPaginate(
    req.paginatorOptions.query,
    req.paginatorOptions.options
  )
  // console.log(products)
  res.status(200).json(people)
})

app.listen(3005, () => console.log(`App running at localhost:3005`))
