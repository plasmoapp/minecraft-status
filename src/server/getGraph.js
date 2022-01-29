import mysql from './mysql'

function div(val, by){
    return (val - val % by) / by
}

export default async function getGraph(item, graphLength, graphStep) {

    const now = Date.now()

    let dataRaw = await mysql.query(`
        SELECT * FROM server_stat
        WHERE id= ? AND date >= ?
    `, [item.id, now - graphLength]);

    // convert to how long ago relative to now

    let dataFormatted = dataRaw.map((ite) => {
        return [
            now - ite.date,
            ite.online
        ]
    })

    let data = []

    for (let i = 0; i <= graphLength - graphStep; i += graphStep) {
        const dataFiltered = dataFormatted.filter(
            (ite) => ite[0] <= i + graphStep/2 && ite[0] >= i - graphStep/2
        )

        if (dataFiltered[0]) {
            data.push([
                div(now - i, graphStep),
                dataFiltered[0][1],
            ]);
        } else {
            data.push([
                div(now - i, graphStep),
                0,
            ]);
        }
    }

    return data
}