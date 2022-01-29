// TODO Fix year instead of time

export default function serverChart(graph) {
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