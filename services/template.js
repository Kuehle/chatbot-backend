let detailTemplates = {
    'mealId': (mealId) => {return ''},
    'name': (name) => {return `<b>${name}</b><br>`},
    'category': (category) => {return `<small>(${category})</small><br>`},
    'area': (area) => {return `${area}<br>`},
    'instructions': (instructions) => {return `<p>${instructions}</p>`},
    'ingredients': (ingredients) => {
        let tableRows = ingredients.map(ingredient => `<tr><td>${ingredient.name}</td><td>${ingredient.measure}</tr>`)
        return `<table>${tableRows.join('')}</table>`
    },
    'srcUrl': (srcUrl) => {return `Source: <a href="${srcUrl}" target="_blank">${srcUrl.split('/')[2]}</a>`}
}

let listTemplates = {
    'list': (dbResponse) => {
        let result = 'Here is a list of results:<br>'
        for(let doc of dbResponse) {
            result += doc._source.name + ' ' 
        }
        return result
    }
}

let noneTemplates = {
    'none': () => {
        return "I haven't found any results"
    }
}
// "mealId": "52803",
// "name": "Beef Wellington",
// "category": "Beef",
// "area": "British",
// "instructions": "Text"

let templateService = {
    templates: {
        detail: detailTemplates,
        list: listTemplates,
        none: noneTemplates
    },
    build: (dbResponse) => {
        if(dbResponse.length == 1) {
            return templateService.buildSingle(dbResponse)
        } else if(dbResponse.length > 1) {
            return listTemplates.list(dbResponse)
        } else {
            return noneTemplates.none()
        }
    },
    buildSingle: (dbResponse) => {
        let result = ''
        try {
            Object.keys(detailTemplates).forEach(key => {
                if(dbResponse[0]._source[key]) {
                    result += detailTemplates[key](dbResponse[0]._source[key])
                }
            })
        } catch(e) {
            result = 'error in single templating'
        }
        return result
    }
}

module.exports = templateService