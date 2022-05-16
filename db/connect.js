const { Pool } = require("pg");
const pool = new Pool();

module.exports = {
  async query(text, params) {
    // invocation timestamp for the query method
    const start = Date.now();
    try {
      const res = await pool.query(text, params);
      // time elapsed since invocation to execution
      const duration = Date.now() - start;
      console.log("executed query", { text, duration, rows: res.rowCount });
      return res;
    } catch (error) {
      console.log("error in query", { text });
      throw error;
    }
  },
};


// text will be something like 'SELECT * FROM $1'
// params something like this array: ['users'] i.e. the table name
// $1 => replaced by users in final query

module.exports = pool;
