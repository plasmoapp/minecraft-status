import fs from 'fs'
import mysql from "./mysql"

export default async function getServers() {
    const servers = JSON.parse(fs.readFileSync('servers.json'))
	const data = []

	const dataRaw = await mysql.query(`SELECT * FROM servers`);

  	await Promise.all(servers.map(item => {

		const dataFiltered = dataRaw.filter(
			ite => ite.id == item.id
		)[0]

		if (dataFiltered && fs.existsSync(`public/server-icons/${item.id}.png`)) {
			dataFiltered.graph = JSON.parse(dataFiltered.graph)
			data.push({
				...dataFiltered,
				...item
			})
		}
  	}))

  	return data.sort((a,b) => b.players - a.players)
}