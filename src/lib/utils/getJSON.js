export default async function getJSON(url) {

    const res = await fetch(url)

    const data = await res.json()

    return data
}