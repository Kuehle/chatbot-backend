'use strict'
require('dotenv').config()

const ai = require('./ai')
const expect = require('chai').expect

const questions = {
  "category-chicken": "i'd like to get a chicken recipe",
  "category-seafood": "can you give me a fish recipe",
  "area-japanes": "can you give me a recipe from japan",
  "search-saganaki": "do you have a recipe for saganaki",
  "ingredient-garlic": "i'd like to something with garlic",
  "ingredient_without-mushrooms": "i'd prefere a recipe without mushrooms"
  // add mixed queries
}

describe('Ai Service', () => {
  describe('"message"', () => {
    it('should export a function', () => {
      expect(ai.message).to.be.a('function')
    }),
    it('should return a promise', () => {
      const messageResult = ai.message('hello')
      expect(messageResult.then).to.be.a('Function')
      expect(messageResult.catch).to.be.a('Function')
    }),
    it('should recognize hi as hello intent', async () => {
      let aiResponse = await ai.message('hi')
      expect(aiResponse.entities.intent[0].value).to.equal('hello')
    }),
    it('should recognize category chicken', async () => {
      let aiResponse = await ai.message(questions['category-chicken'])
      expect(aiResponse.entities.category[0].value).to.equal('chicken')
    }),
    it('should recognize category seafood', async () => {
      let aiResponse = await ai.message(questions['category-seafood'])
      expect(aiResponse.entities.category[0].value).to.equal('seafood')
    }),
    it('should recognize area japanes', async () => {
      let aiResponse = await ai.message(questions['area-japanes'])
      expect(aiResponse.entities.area[0].value).to.equal('japanese')
    }),
    it('should recognize search saganaki', async () => {
      let aiResponse = await ai.message(questions['search-saganaki'])
      expect(aiResponse.entities.search_query[0].value).to.equal('saganaki')
    }),
    it('should recognize ingredient garlic', async () => {
      let aiResponse = await ai.message(questions['ingredient-garlic'])
      expect(aiResponse.entities.search_query[0].value).to.equal('garlic')
    }),
    it('should recognize without mushroom', async () => {
      let aiResponse = await ai.message(questions['ingredient_without-mushrooms'])
      expect(aiResponse.entities.search_query[0].value).to.equal('mushrooms')
      expect(aiResponse.entities.with_without[0].value).to.equal('without')
    })
  })
})