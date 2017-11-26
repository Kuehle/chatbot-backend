'use strict'
require('dotenv').config()

const db = require('./db')
const expect = require('chai').expect

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
})