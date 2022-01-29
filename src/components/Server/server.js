import React from "react";
import Image from "next/image";
import styles from "./server.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import socials from "./socials"
import serverChart from "./serverChart"

export default function Server({ data }) {

  return data.online && (

    <div className={styles.server}>
      <div className={styles.info}>

        <Image src={`/server-icons/${data.id}.png`} width="64" height="64" />

        <div className={styles.text}>
          <p className={`text_16_sbold ${styles.name}`}>{data.name}</p>
          <p className={`text_14_medium ${styles.ip}`}>{data.ip}</p>
        </div>

        <div className={styles.online}>
          <p className='text_14_medium'>{data.players}/{data.max}</p>
        </div>

      </div>

      <div className={styles.icons}>
        {socials.map(item => {
          const url = `https://${item.url}${data[item.name]}`
          return data[item.name] && <a title={url} href={url} target="_blank" key={item.name}><FontAwesomeIcon icon={item.icon}/></a>
        })}
      </div>

      <div className={styles.chart}>
        <HighchartsReact
          highcharts={Highcharts}
          options={serverChart(
            data.graph.map(item => {
              return [

                // TODO Use graphStep from the config

                item[0]*10*60*1000,
                item[1]
              ]  
            })            
          )}
        />
      </div>

    </div>
  );
}