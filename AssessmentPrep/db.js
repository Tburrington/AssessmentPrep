const { Pool } = require('pg');

const uri = 'postgres://lheyyvnw:3YJEyC7ItLao6BUdB6HfNWos6hwxctuz@raja.db.elephantsql.com:5432/lheyyvnw'

const pool = new Pool({
    connectionString: uri
});
// make queries to create tables
// need to store: item description, created at, and status

pool.query(`CREATE TABLE IF NOT EXISTS "toDoApp"(
    id serial PRIMARY KEY,
    item_description VARCHAR NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR NOT NULL DEFAULT 'in progress'
)
`)

module.exports = {
    query: (data)=>{ return pool.query(data)}
};