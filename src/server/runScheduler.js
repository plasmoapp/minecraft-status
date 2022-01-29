import schedule from "node-schedule"

import pingServers from "./pingServers"
import getServers from "./getServers"

export default function runScheduler(dev, io) {
    if (!dev) {
        try {
            schedule.scheduleJob('*/10 * * * *', async function(){
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
}