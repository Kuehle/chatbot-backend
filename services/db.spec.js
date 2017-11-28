'use strict'
require('dotenv').config()

const db = require('./db')
const expect = require('chai').expect

const sampleCategoryRequest = JSON.parse('{"_text":"i search for a beef recipe","entities":{"category":[{"confidence":0.98531419324623,"value":"beef","type":"value"}],"intent":[{"confidence":0.99747320632025,"value":"category"}]},"msg_id":"06WXOToUeSlVsAvH3"}')

describe('DataBase Service', () => {
  describe('"random"', () => {
    it('should export a function', () => {
      expect(db.random).to.be.a('function')
    }),
    it('should return a promise', () => {
      expect(db.random()).to.be.a('Promise')
    }),
    it('should return exactly one document', async () => {
      let dbResponse = await db.random()
      expect(dbResponse.length).to.equal(1)
    }),
    it('should be a meal', async () => {
      let dbResponse = await db.random()
      expect(dbResponse[0]._source).to.have.property('mealId')
    })
  })

  describe('"category"', () => {
    it('should export a function', () => {
      expect(db.category).to.be.a('function')
    }),
    it('should return a promise', () => {
      expect(db.category(sampleCategoryRequest)).to.be.a('Promise')
    }),
    it('should be a meal', async () => {
      let dbResponse = await db.category(sampleCategoryRequest)
      expect(dbResponse[0]._source).to.have.property('mealId')
    }),
    it('should have field category matching search category', async () => {
      let dbResponse = await db.category(sampleCategoryRequest)
      expect(dbResponse[0]._source).to.have.property('category', 'Beef')
    })
    // ,it('should not break with a malformed request', async() => {
    //   let dbResponse = await db.category({})
    //   expect(dbResponse[0]._source).to.have.property('category', 'Beef')
    // })
  })
})