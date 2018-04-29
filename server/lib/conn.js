import mysql from 'mysql'
import config from 'config'

var connection = mysql.createConnection({
    host : config.get('db.hostname'),
    user : config.get('db.user'),
    password : config.get('db.password'),
    database : config.get('db.database')
})

connection.connect()

export default connection
