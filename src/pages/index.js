import Head from 'next/head'
import Server from '../components/home/server'
import Navigation from '../components/navigation'
import getJSON from '../lib/utils/getJSON'
import fs from 'fs'
import styles from './index.module.scss'
import mysql from "../backend/mysql"


import { config, dom } from "@fortawesome/fontawesome-svg-core";
import { deepStrictEqual } from 'assert'
config.autoAddCss = false;


function Page({ data }) {
  return (
	<wrapper className = {styles.wrapper}>
		<Head>
			<title>Мониторинг приватных серверов</title>
			<link rel="icon" href="/favicon.ico" />
			<style>{dom.css()}</style>
		</Head>

		<Navigation></Navigation>

		{/* <h5>Топ приватных серверов по онлайну</h5> */}

		<div>
			{data.map((item, index) => <Server key={index} data={data[index]}/>)}
		</div>

	</wrapper>
  )
}

export async function getServerSideProps() {

	const servers = JSON.parse(fs.readFileSync('servers.json'))
	const data = []

	const dataRaw = await mysql.query(`SELECT * FROM servers`);

  	await Promise.all(servers.map(async item => {

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

  	data.sort((a,b) => b.players - a.players)

  	return { props: { data } }
}

export default Page