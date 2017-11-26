let templates = {
    'mealId': (mealId) => {return ''},
    'name': (name) => {return `<b>${name}</b><br>`},
    'category': (category) => {return `<small>(${category})</small><br>`},
    'area': (area) => {return `${area}<br>`},
    'instructions': (instructions) => {return `<p>${instructions}</p>`},
    'ingredients': (ingredients) => {
        let tableRows = ingredients.map(ingredient => `<tr><td>${ingredient.name}</td><td>${ingredient.measure}</tr>`)
        return `<table>${tableRows.join('')}</table>`
    }
}

// "mealId": "52803",
// "name": "Beef Wellington",
// "category": "Beef",
// "area": "British",
// "instructions": "Text"

let templateService = {
    templates: templates,
    build: (dbResponse) => {
        let result = ''
        try {
            Object.keys(templates).forEach(key => {
                if(dbResponse[0]._source[key]) {
                    result += templates[key](dbResponse[0]._source[key])
                }
            })
        } catch(e) {
            result = 'error in templating'
        }
        return result
    }
}

module.exports = templateService