'use strict'
require('dotenv').config()

const db = require('./db')
const expect = require('chai').expect

const sampleCategoryRequest = JSON.parse('{"_text":"i search for a beef recipe","entities":{"category":[{"confidence":0.98531419324623,"value":"beef","type":"value"}],"intent":[{"confidence":0.99747320632025,"value":"category"}]},"msg_id":"06WXOToUeSlVsAvH3"}')
const sampleQuantityRequest = JSON.parse('{"_text":"can you show me three recipes","entities":{"number":[{"confidence":1,"value":3,"type":"value"}],"intent":[{"confidence":0.98831868650642,"value":"random"}]},"msg_id":"0rTnidnEXj38Exnss"}')
const sampleSearchRequest = JSON.parse('{"_text":"give me a recipe for fish tacos","entities":{"search_query":[{"suggested":true,"confidence":0.937685,"value":"fish taco","type":"value"}],"intent":[{"confidence":0.99871821327788,"value":"random"}]},"msg_id":"0rtrIDOenIO43dMJn"}')
const sampleWithoutRequest = JSON.parse('{"_text":"give me a meal without mushrooms","entities":{"with_without":[{"confidence":0.97038290101664,"value":"without","type":"value"}],"search_query":[{"suggested":true,"confidence":0.93793,"value":"mushrooms","type":"value"}],"intent":[{"confidence":0.99900756388508,"value":"random"}]},"msg_id":"01mQMFMzJLmYd2U27"}')

describe('DataBase Service', () => {
  describe('"random"', () => {
    it('should export a function', () => {
      expect(db.random).to.be.a('function')
    }),
    it('should return a promise', () => {
      expect(db.random(sampleCategoryRequest)).to.be.a('Promise')
    }),
    it('should return exactly one document if nothing other is specified', async () => {
      let dbResponse = await db.random(sampleCategoryRequest)
      expect(dbResponse.length).to.equal(1)
    }),
    it('should be a meal', async () => {
      let dbResponse = await db.random(sampleCategoryRequest)
      expect(dbResponse[0]._source).to.have.property('mealId')
    }),
    it('should respond with more than 1 document if a quantity greater than 1 is requested', async () => {
      let dbResponse = await db.random(sampleQuantityRequest)
      expect(dbResponse.length).to.be.greaterThan(1)
    }),
    it('should respond with a fitting document for freetext search query', async () => {
      let dbResponse = await db.random(sampleSearchRequest)
      expect(dbResponse[0]._source.name.match(/fish/i)).to.be.not.equal(null)
    })
  })

  describe('"categoryList"', () => {
    it('should export a function', () => {
      expect(db.categoryList).to.be.a('function')
    }),
    it('should return a promise', () => {
      expect(db.categoryList()).to.be.a('Promise')
    }),
    it('should resolve to an array', async () => {
      let categories = await db.categoryList()
      expect(categories).to.be.an('Array')
      expect(categories.length).to.be.greaterThan(0)
    })
  })

  describe('"entitiesToQuery"', () => {
    it('should return valid result', () => {
      expect(db.entitiesToQuery(sampleCategoryRequest).bool.must).to.deep.include({match: {"category": "beef"}})
    })
  })

  describe('"getSize"', () => {
    it('should return a Number when a quantity is in the request', () => {
      expect(db.getSize(sampleQuantityRequest)).to.be.a('Number')
    })
    it('should return a undefined when there is none', () => {
      expect(db.getSize(sampleCategoryRequest)).to.be.an('undefined')
    })
  })

  describe('"freeText"', () => {
    it('should return valid result', () => {
      expect(db.freeText(sampleSearchRequest)).to.have.property('query', 'fish taco')
    })
  })
})