'use strict'
require('dotenv').config()

const ai = require('./ai')
const expect = require('chai').expect

describe('Ai Service', () => {
  describe('"message"', () => {
    it('should export a function', () => {
      expect(ai.message).to.be.a('function')
    }),
    it('should return a promise', () => {
        const messageResult = ai.message('hello')
        expect(messageResult.then).to.be.a('Function')
        expect(messageResult.catch).to.be.a('Function')
    })
  })
})