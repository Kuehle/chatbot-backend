let handlers = {
    'hello': (aiResponse) => {
        return `Hello there, how may I help you? I know a lot of recipes.`
    },
    'unknown': (aiResponse) => {
        return `I'm not sure how I can help you with that`
    }
}

let intentService = {
    handle: (aiResponse) => {
        try {
            return handlers[aiResponse.entities.intent[0].value](aiResponse)
        } catch (error) {
            return handlers.unknown()   
        }
    }
}


module.exports = intentService