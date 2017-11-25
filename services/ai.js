const axios = require('axios')

const header = `Authorization: Bearer ${process.env.WIT}`
const apiUrl = 'https://api.wit.ai/message?v=25.11.2017&q='

let aiService = {
    message: (msg) => {
        return new Promise((resolve, reject) => {
            axios.get(apiUrl + encodeURI(msg), {headers: {header}})
                .then((data) => resolve(data.data), (err) => reject(err))
        })
    } 
}

module.exports = aiService