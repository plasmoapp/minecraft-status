import "./setupConfig"

import next, { NextApiHandler } from "next"
import express from "express"
import * as http from 'http'
import * as socketio from 'socket.io'
import schedule from "node-schedule"

import pingServers from "./pingServers"
import getServers from "./getServers"
import initializeTables from "./initializeTables"
import config from "../../config"

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const nextHandler: NextApiHandler = nextApp.getRequestHandler()
const port = process.env.PORT || 3215;

let serversData:object

const middleware: any = (req: { serversData: object }, _res:any, next: () => void) => {
    req.serversData = serversData
    next()
}

nextApp.prepare().then(async () => {
    try {
        serversData = await getServers()

        const app = express()
        const server = http.createServer(app)
        const io = new socketio.Server(server);

        app.use('/', middleware)

        app.all('*', (req: any, res: any) => nextHandler(req, res))

        server.listen(port, (err?: any) => {
            if (err) throw err
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
        })

        await initializeTables()

        if (!dev) {
            try {
                schedule.scheduleJob(`*/${config.graph.step} * * * *`, async function(){
                    console.log(`Pinging servers...`)
    
                    await pingServers(dev)
                    serversData = await getServers()
                    
                    io.sockets.emit('update', serversData)
                })
                console.log('> Scheduler initialized')
            } catch (e) {
                console.log(`> Scheduler is not initialized: ${e}`)
            }
        } else {
            console.log('> Scheduler is not initialized: dev server')
        }

    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})