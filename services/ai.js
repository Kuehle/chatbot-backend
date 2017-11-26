const axios = require('axios')

const bearer = `Bearer ${process.env.WIT}`
const apiUrl = 'https://api.wit.ai/message?v=25.11.2017&q='

let aiService = {
    message: (msg) => {
        return new Promise((resolve, reject) => {
            axios.get(apiUrl + encodeURI(msg), {headers: {'Authorization': bearer}})
                .then((data) => resolve(data.data), (err) => reject(err))
        })
    } 
}

module.exports = aiService