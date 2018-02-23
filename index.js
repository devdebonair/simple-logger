const fs = require("fs")
const p = require("path")

class Logger {
    constructor() {
        this.logs = []
    }

    log(text) {
        this.logs.push(text)
    }

    save({ path, fileName = Date.now().toString() } = {}) {
        return new Promise((resolve, reject) => {
            if(!path) return reject(new Error("Must supply a path."))
            const textToWrite = this.logs.join("\n\n")
            const filePath = p.join(path, fileName)
            if(!fs.existsSync(path)) {
                fs.mkdirSync(path)
            }
            fs.writeFile(filePath, textToWrite, (err) => {
                if(err) reject(err)
                else resolve()
            })
            this.logs = []
        })
    }
}

module.exports = Logger