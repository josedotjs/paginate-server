const queryParser = require('mongodb-query-parser')
module.exports = function (req, res, next) {
  // console.log('query parser', Object.keys(req.query)[0])
  const { query, ...options } = JSON.parse(req.query.q)
  console.log('parsed', req.query.q, query)
  const sanitizedQuery = cleanEmpty(query)

  req.paginatorOptions = {
    query: sanitizedQuery,
    options,
  }
  next()
}

const cleanEmpty = (obj) => {
  if (Array.isArray(obj)) {
    return obj
      .map((v) => (v && typeof v === 'object' ? cleanEmpty(v) : v))
      .filter((v) => !(v == null))
  } else {
    return Object.entries(obj)
      .map(([k, v]) => [k, v && typeof v === 'object' ? cleanEmpty(v) : v])
      .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})
  }
}
