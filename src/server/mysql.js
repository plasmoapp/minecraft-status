import mysql, {PoolConnection} from "mysql"
import fs from "fs"
import config from "../../config"

class MySQL {
    pool

    constructor(host, port, user, password, db) {
        this.pool = mysql.createPool({
            connectionLimit: 25,
            host: host,
            port: port,
            user: user,
            password: password,
            database: db,
            connectTimeout: 100_000,
            acquireTimeout: 100_000,
            timeout: 100_000
        })
    }

    async getConnection() {
        return new Promise(((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if (err) {
                    reject(err)
                }

                resolve(conn)
            })
        }))
    }

    async query(q, values) {
        let conn
        try {
            conn = await this.getConnection()
            q = mysql.format(q, values)
            return await this._query(q, conn)
        } catch (e) {
            throw e
        } finally {
            if (conn && conn.release) {
                conn.release()
            }
        }
    }

    async _query(q, conn) {
        return new Promise(((resolve, reject) => {
            conn.query(q, ((err, results) => {
                if (err) {
                    reject(err)
                }

                resolve(results)
            }))
        }))
    }
}

const pool = new MySQL(config.mysql.host, config.mysql.port, config.mysql.user, config.mysql.password, config.mysql.db)

export default pool

