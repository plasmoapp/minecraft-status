import fs from "fs"

if (!fs.existsSync('config.js')) {

    const example = fs.readFileSync('config.js.example')
    fs.writeFileSync('config.js', example)

    console.log('Created a config.js file from example. Please setup the config before continuing.')
    process.exit(0)
}