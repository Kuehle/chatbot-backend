var template = require('./template')
var db = require('./db')

let handlers = {
    'launch': (aiResponse) => {
        return `Hello there, how may I help you? I know a lot of recipes.`
    },
    'hello': (aiResponse) => {
        return `Hello there. You can also ask for help if you don't know what to ask.`
    },
    'random': async (aiResponse) => {
        return template.build(await db.random(aiResponse))
    },
    // 'category': async (aiResponse) => {
    //     return template.build(await db.category(aiResponse))
    // },
    'listCategories': async (aiResponse) => {
        return template.build(await db.categoryList())
    },
    'listAreas': async (aiResponse) => {
        return template.build(await db.areaList())
    },
    'help': (aiResponse) => {
        return `If you just want to get started, you could ask for a random recipe. Or ask me like a meal in a category like Chicken or Vegetarian. If you have certain ingredients and want to know what recipes you could use them in ask me 'What recepies use garlic and beef'.`
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