const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PeopleSchema = new Schema(
  {
    firstName: {
      type: String,
      index: true,
    },
    lastName: String,
    birthDate: {
      type: Date,
      index: true,
    },
    accountBalance: Number,
    active: Boolean,
    pets: [String],
  },
  { collation: { locale: 'es', strength: 2 } }
)

module.exports = mongoose.model('people', PeopleSchema)
