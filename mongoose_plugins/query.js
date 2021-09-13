const mongoSanitize = require('express-mongo-sanitize')
const me = require('mongo-escape').escape
module.exports = function queryPlugin(schema, options) {
  console.log(options)
  schema.statics.queryPaginate = function (
    query = {},
    options = {},
    blackList = []
  ) {
    const selectFields = options.select.trim() || '' // '' equivale a seleccionar todos los campos
    let fieldsToSelect

    if (selectFields) {
      fieldsToSelect = selectFields
        .split(' ')
        .filter((field) => !blackList.includes(field))
        .join(' ')
    } else {
      fieldsToSelect = blackList.length ? ` -${blackList.join(' -')}` : ''
    }

    const paginateOptions = {
      sort: { _id: -1 },
      ...options,
      select: fieldsToSelect,
    }
    console.log('run query')
    return this.paginate(query, paginateOptions)
  }
}
