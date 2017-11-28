const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
    host: 'localhost:9200'
})

function entitiesToQuery(aiResponse) {
    var queryObject = {match:{}}
    try {
        Object.keys(aiResponse.entities).filter(key => key != 'intent').forEach(entityKey => {
            queryObject.match[entityKey] = aiResponse.entities[entityKey][0].value
        })
        console.log("queryObject", queryObject)
        return queryObject
    } catch(e) {
        console.log(e)
        return
    }
   
}

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

function aggregate(searchObj) {
    return new Promise((resolve, reject) => {
        client.search(searchObj).then((body) => {
            resolve(body.aggregations.hits.buckets)      
        }, (err) => {
            console.trace(error.message)
            reject(err)
        })
    })
}

let dbService = {
    entitiesToQuery: entitiesToQuery,
    random: (aiResponse) => {
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
                      ],
                      "query": entitiesToQuery(aiResponse)
                   }
                }
             }
        })
    },
    categoryList: () => {
        return aggregate({
            "body": {
                "query": {
                    "match_all": {}	
                },
                "size": 0,
                "aggs" : {
                    "hits" : {
                        "terms" : { "field" : "category.keyword" }
                    }
                }
            }
        })
    },
    areaList: () => {
        return aggregate({
            "body": {
                "query": {
                    "match_all": {}	
                },
                "size": 0,
                "aggs" : {
                    "hits" : {
                        "terms" : { "field" : "area.keyword" }
                    }
                }
            }
        })
    }
}

module.exports = dbService