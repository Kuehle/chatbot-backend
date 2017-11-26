'use strict'
require('dotenv').config()

const intent = require('./intent')
const expect = require('chai').expect

const sampleApiResponse = JSON.parse('{"_text":"hi","entities":{"intent":[{"confidence":1,"value":"hello"}]},"msg_id":"00hepmooan5BpL4U4"}')
const sampleNonsense = {asdf: {asdfa: {asdfasd: 19}}}

describe('Intent Service', () => {
  describe('"handle"', () => {
    it('should export a function', () => {
      expect(intent.handle).to.be.a('function')
    }),
    it('should respond with a text', () => {
      expect(intent.handle(sampleApiResponse)).to.be.a('String')
      expect(intent.handle(sampleNonsense)).to.be.a('String')            
    })
  })
})