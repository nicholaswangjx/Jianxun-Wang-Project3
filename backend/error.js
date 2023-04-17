const errHandler = (status, msg) => {
  const error = new Error()
  error.status = status
  error.message = msg
  return error
}

module.exports = errHandler
