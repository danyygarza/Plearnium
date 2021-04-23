const sql = require('mssql')

const config = {
    user: 'terny',
    password: 'Fempower2021',
    database: 'bdplearnium',
    server: 'plearnium.database.windows.net',
    options: {
    trustedConnection: true
  }
} 
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}