'use strict'
require('dotenv').config()

const template = require('./template')
const expect = require('chai').expect

const sampleDetailResponse = JSON.parse(`[
  {
      "_index": "bot",
      "_type": "meals",
      "_id": "52803",
      "_score": 0.9860814,
      "_source": {
          "mealId": "52803",
          "name": "Beef Wellington",
          "category": "Beef",
          "area": "British",
          "instructions": "Put the mushrooms into a food processor with some seasoning and pulse to a rough paste. Scrape the paste into a pan and cook over a high heat for about 10 mins, tossing frequently, to cook out the moisture from the mushrooms. Spread out on a plate to cool. Heat in a frying pan and add a little olive oil. Season the beef and sear in the hot pan for 30 secs only on each side. (You don't want to cook it at this stage, just colour it). Remove the beef from the pan and leave to cool, then brush all over with the mustard. Lay a sheet of cling film on a work surface and arrange the Parma ham slices on it, in slightly overlapping rows. With a palette knife, spread the mushroom paste over the ham, then place the seared beef fillet in the middle. Keeping a tight hold of the cling film from the edge, neatly roll the Parma ham and mushrooms around the beef to form a tight barrel shape. Twist the ends of the cling film to secure. Chill for 15-20 mins to allow the beef to set and keep its shape. Roll out the puff pastry on a floured surface to a large rectangle, the thickness of a £1 coin. Remove the cling film from the beef, then lay in the centre. Brush the surrounding pastry with egg yolk. Fold the ends over, the wrap the pastry around the beef, cutting off any excess. Turn over, so the seam is underneath, and place on a baking sheet. Brush over all the pastry with egg and chill for about 15 mins to let the pastry rest. Heat the oven to 200C, 400F, gas 6. Lightly score the pastry at 1cm intervals and glaze again with beaten egg yolk. Bake for 20 minutes, then lower the oven setting to 180C, 350F, gas 4 and cook for another 15 mins. Allow to rest for 10-15 mins before slicing and serving with the side dishes of your choice. The beef should still be pink in the centre when you serve it.",
          "ingredients": [
              {
                  "name": "mushrooms",
                  "measure": "400g"
              },
              {
                  "name": "English Mustard",
                  "measure": "1-2tbsp"
              },
              {
                  "name": "Olive Oil",
                  "measure": "Dash"
              },
              {
                  "name": "Beef Fillet",
                  "measure": "750g piece"
              },
              {
                  "name": "Parma ham",
                  "measure": "6-8 slices"
              },
              {
                  "name": "Puff Pastry",
                  "measure": "500g"
              },
              {
                  "name": "Flour",
                  "measure": "Dusting"
              },
              {
                  "name": "Egg Yolks",
                  "measure": "2 Beaten "
              }
          ],
          "imgUrl": "http://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
          "videoUrl": "none",
          "srcUrl": "http://www.goodtoknow.co.uk/recipes/164868/Gordon-Ramsay-s-beef-Wellington"
      }
  }
]`)

const sampleListResponse = JSON.parse(`[
    {
        "_index": "bot",
        "_type": "meals",
        "_id": "52803",
        "_score": 0.9860814,
        "_source": {
            "mealId": "52803",
            "name": "Beef Wellington",
            "category": "Beef",
            "area": "British",
            "instructions": "Put the mushrooms into a food processor with some seasoning and pulse to a rough paste. Scrape the paste into a pan and cook over a high heat for about 10 mins, tossing frequently, to cook out the moisture from the mushrooms. Spread out on a plate to cool. Heat in a frying pan and add a little olive oil. Season the beef and sear in the hot pan for 30 secs only on each side. (You don't want to cook it at this stage, just colour it). Remove the beef from the pan and leave to cool, then brush all over with the mustard. Lay a sheet of cling film on a work surface and arrange the Parma ham slices on it, in slightly overlapping rows. With a palette knife, spread the mushroom paste over the ham, then place the seared beef fillet in the middle. Keeping a tight hold of the cling film from the edge, neatly roll the Parma ham and mushrooms around the beef to form a tight barrel shape. Twist the ends of the cling film to secure. Chill for 15-20 mins to allow the beef to set and keep its shape. Roll out the puff pastry on a floured surface to a large rectangle, the thickness of a £1 coin. Remove the cling film from the beef, then lay in the centre. Brush the surrounding pastry with egg yolk. Fold the ends over, the wrap the pastry around the beef, cutting off any excess. Turn over, so the seam is underneath, and place on a baking sheet. Brush over all the pastry with egg and chill for about 15 mins to let the pastry rest. Heat the oven to 200C, 400F, gas 6. Lightly score the pastry at 1cm intervals and glaze again with beaten egg yolk. Bake for 20 minutes, then lower the oven setting to 180C, 350F, gas 4 and cook for another 15 mins. Allow to rest for 10-15 mins before slicing and serving with the side dishes of your choice. The beef should still be pink in the centre when you serve it.",
            "ingredients": [
                {
                    "name": "mushrooms",
                    "measure": "400g"
                },
                {
                    "name": "English Mustard",
                    "measure": "1-2tbsp"
                },
                {
                    "name": "Olive Oil",
                    "measure": "Dash"
                },
                {
                    "name": "Beef Fillet",
                    "measure": "750g piece"
                },
                {
                    "name": "Parma ham",
                    "measure": "6-8 slices"
                },
                {
                    "name": "Puff Pastry",
                    "measure": "500g"
                },
                {
                    "name": "Flour",
                    "measure": "Dusting"
                },
                {
                    "name": "Egg Yolks",
                    "measure": "2 Beaten "
                }
            ],
            "imgUrl": "http://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
            "videoUrl": "none",
            "srcUrl": "http://www.goodtoknow.co.uk/recipes/164868/Gordon-Ramsay-s-beef-Wellington"
        }
    },{
        "_index": "bot",
        "_type": "meals",
        "_id": "52803",
        "_score": 0.9860814,
        "_source": {
            "mealId": "52803",
            "name": "Beef Wellington",
            "category": "Beef",
            "area": "British",
            "instructions": "Put the mushrooms into a food processor with some seasoning and pulse to a rough paste. Scrape the paste into a pan and cook over a high heat for about 10 mins, tossing frequently, to cook out the moisture from the mushrooms. Spread out on a plate to cool. Heat in a frying pan and add a little olive oil. Season the beef and sear in the hot pan for 30 secs only on each side. (You don't want to cook it at this stage, just colour it). Remove the beef from the pan and leave to cool, then brush all over with the mustard. Lay a sheet of cling film on a work surface and arrange the Parma ham slices on it, in slightly overlapping rows. With a palette knife, spread the mushroom paste over the ham, then place the seared beef fillet in the middle. Keeping a tight hold of the cling film from the edge, neatly roll the Parma ham and mushrooms around the beef to form a tight barrel shape. Twist the ends of the cling film to secure. Chill for 15-20 mins to allow the beef to set and keep its shape. Roll out the puff pastry on a floured surface to a large rectangle, the thickness of a £1 coin. Remove the cling film from the beef, then lay in the centre. Brush the surrounding pastry with egg yolk. Fold the ends over, the wrap the pastry around the beef, cutting off any excess. Turn over, so the seam is underneath, and place on a baking sheet. Brush over all the pastry with egg and chill for about 15 mins to let the pastry rest. Heat the oven to 200C, 400F, gas 6. Lightly score the pastry at 1cm intervals and glaze again with beaten egg yolk. Bake for 20 minutes, then lower the oven setting to 180C, 350F, gas 4 and cook for another 15 mins. Allow to rest for 10-15 mins before slicing and serving with the side dishes of your choice. The beef should still be pink in the centre when you serve it.",
            "ingredients": [
                {
                    "name": "mushrooms",
                    "measure": "400g"
                },
                {
                    "name": "English Mustard",
                    "measure": "1-2tbsp"
                },
                {
                    "name": "Olive Oil",
                    "measure": "Dash"
                },
                {
                    "name": "Beef Fillet",
                    "measure": "750g piece"
                },
                {
                    "name": "Parma ham",
                    "measure": "6-8 slices"
                },
                {
                    "name": "Puff Pastry",
                    "measure": "500g"
                },
                {
                    "name": "Flour",
                    "measure": "Dusting"
                },
                {
                    "name": "Egg Yolks",
                    "measure": "2 Beaten "
                }
            ],
            "imgUrl": "http://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
            "videoUrl": "none",
            "srcUrl": "http://www.goodtoknow.co.uk/recipes/164868/Gordon-Ramsay-s-beef-Wellington"
        }
    },{
        "_index": "bot",
        "_type": "meals",
        "_id": "52803",
        "_score": 0.9860814,
        "_source": {
            "mealId": "52803",
            "name": "Beef Wellington",
            "category": "Beef",
            "area": "British",
            "instructions": "Put the mushrooms into a food processor with some seasoning and pulse to a rough paste. Scrape the paste into a pan and cook over a high heat for about 10 mins, tossing frequently, to cook out the moisture from the mushrooms. Spread out on a plate to cool. Heat in a frying pan and add a little olive oil. Season the beef and sear in the hot pan for 30 secs only on each side. (You don't want to cook it at this stage, just colour it). Remove the beef from the pan and leave to cool, then brush all over with the mustard. Lay a sheet of cling film on a work surface and arrange the Parma ham slices on it, in slightly overlapping rows. With a palette knife, spread the mushroom paste over the ham, then place the seared beef fillet in the middle. Keeping a tight hold of the cling film from the edge, neatly roll the Parma ham and mushrooms around the beef to form a tight barrel shape. Twist the ends of the cling film to secure. Chill for 15-20 mins to allow the beef to set and keep its shape. Roll out the puff pastry on a floured surface to a large rectangle, the thickness of a £1 coin. Remove the cling film from the beef, then lay in the centre. Brush the surrounding pastry with egg yolk. Fold the ends over, the wrap the pastry around the beef, cutting off any excess. Turn over, so the seam is underneath, and place on a baking sheet. Brush over all the pastry with egg and chill for about 15 mins to let the pastry rest. Heat the oven to 200C, 400F, gas 6. Lightly score the pastry at 1cm intervals and glaze again with beaten egg yolk. Bake for 20 minutes, then lower the oven setting to 180C, 350F, gas 4 and cook for another 15 mins. Allow to rest for 10-15 mins before slicing and serving with the side dishes of your choice. The beef should still be pink in the centre when you serve it.",
            "ingredients": [
                {
                    "name": "mushrooms",
                    "measure": "400g"
                },
                {
                    "name": "English Mustard",
                    "measure": "1-2tbsp"
                },
                {
                    "name": "Olive Oil",
                    "measure": "Dash"
                },
                {
                    "name": "Beef Fillet",
                    "measure": "750g piece"
                },
                {
                    "name": "Parma ham",
                    "measure": "6-8 slices"
                },
                {
                    "name": "Puff Pastry",
                    "measure": "500g"
                },
                {
                    "name": "Flour",
                    "measure": "Dusting"
                },
                {
                    "name": "Egg Yolks",
                    "measure": "2 Beaten "
                }
            ],
            "imgUrl": "http://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
            "videoUrl": "none",
            "srcUrl": "http://www.goodtoknow.co.uk/recipes/164868/Gordon-Ramsay-s-beef-Wellington"
        }
    }
  ]`)
const sampleNonsense = {asdf: {asdfa: {asdfasd: 19}}}

describe('Template Service', () => {
  describe('"build"', () => {
    it('should export a function', () => {
      expect(template.build).to.be.a('function')
    }),
    it('should respond with a text', () => {
      expect(template.build(sampleDetailResponse)).to.be.a('String')
      expect(template.build(sampleListResponse)).to.be.a('String')
      expect(template.build(sampleNonsense)).to.be.a('String')            
    }),
    it('should respond with a different text for a single document than for a list of documents', () => {
      expect(template.build(sampleDetailResponse)).to.not.equal(template.build(sampleListResponse))
    })

  })
})