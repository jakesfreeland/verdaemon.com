require('dotenv').config();
const mariadb = require(`mariadb`);

let pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5
});

module.exports = {
  insertData: async function insertData(database, table, columns, data) {
    if (Array.isArray(columns) && Array.isArray(data)) {
      columns = columns.join(", ");

      for (var i=0; i<data.length; ++i) {
        data[i] = pool.escape(data[i]);
      }
      data = data.join(", ");
    } else {
      data = pool.escape(data);
    }

    try {
      var conn = await pool.getConnection();
      return await conn.query(`INSERT INTO ${database}.${table} (${columns}) VALUES (${data})`);
    } finally {
      if (conn) conn.close();
    }
  },

  replaceData: async function replaceData(database, table, columns, data) {
    if (Array.isArray(columns) && Array.isArray(data)) {
      columns = columns.join(", ");

      for (var i=0; i<data.length; ++i) {
        data[i] = pool.escape(data[i]);
      }
      data = data.join(", ");
    } else {
      data = pool.escape(data);
    }

    try {
      var conn = await pool.getConnection();
      return await conn.query(`REPLACE INTO ${database}.${table} (${columns}) VALUES (${data})`);
    } finally {
      if (conn) conn.close();
    }
  },

  getData: async function getData(database, table) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`SELECT * FROM ${database}.${table}`);
    } finally {
      if (conn) conn.close();
    }
  },

  getColumnData: async function getColumnData(database, table, column) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`SELECT ${column} FROM ${database}.${table}`);
    } finally {
      if (conn) conn.close();
    }
  },

  getValueData: async function getValueData(database, table, column, value) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`SELECT * FROM ${database}.${table} WHERE ${column}=?`, [value]);
    } finally {
      if (conn) conn.close();
    }
  },

  dropValueData: async function dropValueData(database, table, column, value) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`DELETE FROM ${database}.${table} WHERE ${column}=?`, [value]);
    } finally {
      if (conn) conn.close();
    }
  },

  getOrderedData: async function getOrderedData(database, table, column, order) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`SELECT * FROM ${database}.${table} ORDER BY ${column} ${order}`);
    } finally {
      if (conn) conn.close();
    }
  },

  getOrderedLimitData: async function getOrderedLimitData(database, table, column, order, limit) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`SELECT * FROM ${database}.${table} ORDER BY ${column} ${order} LIMIT ${limit}`);
    } finally {
      if (conn) conn.close();
    }
  },

  createTable: async function createTable(database, table, column, datatype) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`CREATE TABLE IF NOT EXISTS ${database}.${table} (${column} ${datatype})`);
    } finally {
      if (conn) conn.close();
    }
  },

  showTables: async function showTables(database) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`SHOW TABLES FROM ${database}`);
    } finally {
      if (conn) conn.close();
    }
  },

  getTableCount: async function getTableCount(database, table) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`SELECT COUNT(*) FROM ${database}.${table}`);
    } finally {
      if (conn) conn.close();
    }
  },

  dropTable: async function dropTable(database, table) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`DROP TABLE ${database}.${table}`);
    } finally {
      if (conn) conn.close();
    }
  },

  updatePost: async function updatePost(database, table, columns, data) {
    try {
      var conn = await pool.getConnection();
      return await conn.query(`INSERT INTO ${database}.${table}
                              (${columns[0], columns[1], columns[2], columns[3], columns[4], columns[5]}) VALUES (:title, :body, :edit_date, :tags, :pid, :banner) ON DUPLICATE KEY UPDATE ${columns[0]}=:title, ${columns[1]}=:body, ${columns[2]}=:edit_date, ${columns[3]}=:tags ${columns[4]}=:pid, ${columns[5]}=:banner`,
                              {title: data[0], body: data[1], edit_date: data[2], tags: data[3],
                               pid: data[4], banner: data[5]});
    } finally {
      if (conn) conn.close();
    }
  }
}
