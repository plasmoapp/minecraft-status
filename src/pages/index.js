import Head from 'next/head'
import Server from '../components/Server/server'
import Navigation from '../components/Navigation/navigation'
import styles from './index.module.scss'
import useSocket from '../lib/useSocket'

import { config, dom } from "@fortawesome/fontawesome-svg-core";
import { useState } from 'react'

config.autoAddCss = false;

export default function Page(props) {

	const [data, setData] = useState(props.data)

	const socket = useSocket('update', (serversData) => {
		console.log(`Updating...`)
		setData(serversData)
	})	

  	return (
		<wrapper className = {styles.wrapper}>
			<Head>
				<title>Мониторинг приватных серверов</title>
				<link rel="icon" href="/favicon.ico" />
				<style>{dom.css()}</style>
			</Head>

			<Navigation></Navigation>

			<div>
				{data.map((item, index) => <Server key={index} data={item}/>)}
			</div>

		</wrapper>
  )
}

// export default class Page extends Component {
// 	render() {
// 		return (
// 				<wrapper className = {styles.wrapper}>
// 				<Head>
// 					<title>Мониторинг приватных серверов</title>
// 					<link rel="icon" href="/favicon.ico" />
// 					<style>{dom.css()}</style>
// 				</Head>
			
// 				<Navigation></Navigation>
			
// 				<div>
// 					{this.data.map((item, index) => <Server key={index} data={this.data[index]}/>)}
// 				</div>
			
// 			</wrapper>
// 		)
// 	}
// }

export async function getServerSideProps(ctx) {
 	return { props: { data: await ctx.req.serversData } }
}