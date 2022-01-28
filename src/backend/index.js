import mysql from './mysql'

async function initializeTables() {
    await mysql.query(`
        CREATE TABLE IF NOT EXISTS server_stat (
            id INT NOT NULL,
            date BIGINT NOT NULL,
            online INT NOT NULL,
            INDEX(id, date)
        )
    `)
    await mysql.query(`
        CREATE TABLE IF NOT EXISTS servers (
            id INT NOT NULL PRIMARY KEY,
            online TINYINT(1),
            players INT,
            max INT,
            graph BLOB
        )
`)
}

export default initializeTables