const dbConfig = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'Mydb',
    port: 3306 || process.env.DB_PORT,
}

module.exports = dbConfig;
