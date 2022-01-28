import "./setupConfig"

import next from "next"
import express from "express"
import schedule from "node-schedule"

import pingServers from "./pingServers"
import initializeTables from "./initializeTables"

const dev = process.env.NODE_ENV !== "production"

const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3215;

(async () => {
    try {
        await app.prepare()
        const server = express()

        server.all("*", (req, res) => {
            return handle(req, res)
        })
        
        server.listen(port, (err?: any) => {
            if (err) throw err
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
        })

        await initializeTables()

        // pingServers()

        if (!dev) {
            try {
                schedule.scheduleJob('*/10 * * * *', function(){
                    console.log(`Pinging servers...`)
                    pingServers()
                })
                console.log('Scheduler initialized')
            } catch (e) {
                console.log(`Scheduler is not initialized: ${e}`)
            }
        } else {
            console.log('Not launching scheduler because dev server')
        }

    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})()