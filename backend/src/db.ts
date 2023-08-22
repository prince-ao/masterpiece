const Pool = require('pg').Pool
require('dotenv').config()


const pool = new Pool({
    user: 'alanmackiewicz',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'masterpiece'
})

export default pool