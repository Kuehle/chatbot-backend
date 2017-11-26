'use strict'
require('dotenv').config()

const db = require('./db')
const expect = require('chai').expect

describe('DataBase Service', () => {
  describe('"random"', () => {
    it('should export a function', () => {
      expect(db.random).to.be.a('function')
    }),
    it('should return a document', () => {
      expect(db.random()).to.have.property('mealId')
    })
  })
})