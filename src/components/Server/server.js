import React from "react";
import Image from "next/image";
import styles from "./server.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVk, faDiscord, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function serverChart(graph) {
  return {
      credits: undefined,
      exporting: {
          enabled: false
      },
      chart: {
          //styledMode: true,
          backgroundColor: "var(--BG_0)",
          spacing: [20,0,0,0],
          height: 126
      },
      title: {
          style: {
              "display": "none"
          }
      },
      xAxis: {
          type: "datetime",
          labels: {
              enabled: false
          },
          visible: false,
          minPadding: 0,
          maxPadding: 0
      },
      yAxis: {
          gridLineWidth: 0,
          minPadding: 0,
          maxPadding: 0,
          title: {
              style: {
                  "display": "none"
              }
          },
          visible: false,
          labels: {
              enabled: false
          }
      },
      legend: {
          enabled: false
      },
      time: {
          useUTC: false
      },
      plotOptions: {
          area: {
              fillColor: "var(--YEL)",
              fillOpacity: 0.57,
              states: {
                  hover: {
                      lineWidthPlus: 0,
                      halo: {
                          size: 0
                      }
                  }
              },
              marker: {
                  radius: 6,
                  lineWidth: 4,
                  lineColor: "var(--YEL)",
                  fillColor: "var(--FG_0)",
                  states: {
                      hover: {
                          lineWidthPlus: 0,
                          radiusPlus: 0
                      },
                      select: {
                          enabled: false
                      }
                  }
              },
              lineWidth: 4,
              lineColor: "var(--YEL)",
              threshold: null
          }
      },
      tooltip: {
          borderRadius: 8,
          borderWidth: 0,
          padding: 12,
          hideDelay: 0,
          headerFormat: "<span class='chart__point_header'>{point.key}</span><br>",
          pointFormat: "<span class='chart__point_value'>Игроки: {point.y}</span>",
          shadow: false,
          backgroundColor: "var(--BG_9)",
          style: {
          }
      },

      series: [{
          type: 'area',
          data: graph
      }]
  }
}

function Server({ data }) {

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
          {/* <div className={styles.icons}>
            {socials.map(item => {
              const url = `https://${item.url}${data[item.name]}`
              return data[item.name] && <a title={url} href={url} target="_blank"><FontAwesomeIcon icon={item.icon}/></a>
            })}
          </div> */}
        </div>
      </div>
      <div className={styles.icons}>
        {socials.map(item => {
          const url = `https://${item.url}${data[item.name]}`
          return data[item.name] && <a title={url} href={url} target="_blank"><FontAwesomeIcon icon={item.icon}/></a>
        })}
        </div>
      <div className={styles.chart}>
        <HighchartsReact
          highcharts={Highcharts}
          options={serverChart(
            data.graph.map(item => {
              return [
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

const socials = [
  {
    name: "site",
    url: "",
    icon: faLink
  },
  {
    name: "discord",
    url: "discord.gg/",
    icon: faDiscord
  },
  {
    name: "vk",
    url: "vk.com/",
    icon: faVk
  },
  {
    name: "tiktok",
    url: "tiktok.com/@",
    icon: faTiktok
  }
]

export default Server;
