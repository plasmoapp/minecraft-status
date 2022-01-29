import "./setupConfig"

import * as http from 'http'
import next, { NextApiHandler } from "next"
import express from "express"
import schedule from "node-schedule"
import * as socketio from 'socket.io'

import pingServers from "./pingServers"
import getServers from "./getServers"
import initializeTables from "./initializeTables"

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

        app.get('/hello', async (_, res) => {
            res.send('Hello World')
        })

        io.on('connection', (socket) => {
            // console.log('connection')
            // socket.emit('status', 'Hello from Socket.io')
            socket.on('disconnect', () => {
                // console.log('client disconnected')
            })
        })

        app.use('/', middleware)

        app.all('*', (req: any, res: any) => nextHandler(req, res))

        server.listen(port, (err?: any) => {
            if (err) throw err
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
        })

        await initializeTables()

        if (!dev) {
            try {
                schedule.scheduleJob('*/10 * * * *', async function(){
                    console.log(`Pinging servers...`)

                    await pingServers(dev)
                    serversData = await getServers()
                    
                    io.sockets.emit('update', serversData)
                })
                console.log('Scheduler initialized')
            } catch (e) {
                console.log(`Scheduler is not initialized: ${e}`)
            }
        } else {
            console.log('Scheduler is not initialized: dev server')
        }

    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})