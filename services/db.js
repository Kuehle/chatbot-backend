const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
    host: 'localhost:9200'
})

function search(searchObj) {
    return new Promise((resolve, reject) => {
        client.search(searchObj).then((body) => {
            resolve(body.hits.hits)
        }, (err) => {
            console.trace(error.message)
            reject(err)
        })
    })
}

let dbService = {
    random: () => {
        return search({
            index: 'bot',
            type: 'meals',
            body: {
                "size": 1,
                "query": {
                   "function_score": {
                      "functions": [
                         {
                            "random_score": {
                               "seed": '' + Math.random()
                            }
                         }
                      ]
                   }
                }
             }
        })
    }
}

module.exports = dbService