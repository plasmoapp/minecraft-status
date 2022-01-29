import { getStatus } from "mc-server-status"

import fs from "fs"

import { Base64 } from "js-base64"

import mysql from "./mysql"
import getGraph from "./getGraph"
import { deepStrictEqual } from "assert"
import { type } from "os"

export default async function pingServers(dev) {
    const servers = JSON.parse(fs.readFileSync("servers.json"));

    await Promise.all(
        servers.map(async (item) => {
            let get

            try {
                get = await getStatus(item.ip);
                console.log(`Pinged ${item.name}`);
            } catch (e) {
                console.error(`Failed to ping ${item.name}: ${e}`);
                mysql.query(`
                    INSERT INTO servers
                        (id, online, players) VALUES (?, 0, 0) 
                    ON DUPLICATE KEY UPDATE
                        online=0, players=0
                `, [item.id]);
            }

            if (get) try {

                const now = Date.now();

                // Log online for statistic graph

                !dev && await mysql.query(`
                    INSERT INTO server_stat
                    (id, date, online) VALUES (${item.id}, ${now}, ${get.players.online})
                 `)

                // Update current server status

                // TODO move graphLength and graphStep into the config file

                const graphLength = 24 * 60 * 60 * 1000 // in ms
                const graphStep = 10 * 60 * 1000

                const graph = JSON.stringify(await getGraph(item, graphLength, graphStep))

                mysql.query(`
                    INSERT INTO servers
                        (id, online, players, max, graph) VALUES (?, 1, ?, ?, ?) 
                    ON DUPLICATE KEY UPDATE
                        online=1, players=VALUES(players), max=VALUES(max), graph=VALUES(graph)
                `, [item.id, get.players.online, get.players.max, graph])

                // Convert base64 server-icon into local .png files

                fs.writeFileSync(
                    `public/server-icons/${item.id}.png`,
                    Buffer.from(
                        get.favicon.replace(/^data:image\/\w+;base64,/, ""),
                        "base64"
                    )
                )

            } catch (e) {
                console.error(e)
            }
        })
    );
}