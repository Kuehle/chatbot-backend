const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
    host: 'localhost:9200'
})

function entitiesToQuery(aiResponse) {
    var queryObject = {bool: {must: []}}
    let excludedEntities = {'intent': true, 'number': true}
    try {
        Object.keys(aiResponse.entities).filter(key => !excludedEntities[key] ).forEach(entityKey => {
            let newMatchQuery = {match: {}}
            newMatchQuery.match[entityKey] = aiResponse.entities[entityKey][0].value
            queryObject.bool.must.push(newMatchQuery)
        })
        return queryObject.bool.must.length > 0 ? queryObject : undefined
    } catch(e) {
        console.log(e)
        return
    }
}

function getSize(aiResponse) {
    try{
        return aiResponse.entities.number[0].value
    } catch(e) {
        return undefined
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
    getSize: getSize,
    random: (aiResponse) => {
        return search({
            index: 'bot',
            type: 'meals',
            body: {
                "size": getSize(aiResponse) || 1,
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