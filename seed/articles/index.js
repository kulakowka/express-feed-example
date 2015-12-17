'use strict'

var _ = require('lodash')
var Article = require('../../models/article')
var async = require('async')
var faker = require('faker')
var Hub = require('../../models/hub')
var User = require('../../models/user')

// Settings
const ARTICLES_COUNT = 100
const HUBS_PER_ARTICLE_COUNT = 6

module.exports = function seedArticles (callback) {
  async.parallel({users: getUsers, hubs: getHubs}, (err, result) => {
    if (err) return callback(err)

    var articles = _.times(ARTICLES_COUNT, (n) => getFakeArticle(result))

    Article.create(articles, callback)
  })
}

function getUsers (callback) {
  User.find().exec(callback)
}

function getHubs (callback) {
  Hub.find().exec(callback)
}

function getFakeArticle (result) {
  var user = _.sample(result.users)
  var hubs = _.sample(result.hubs, HUBS_PER_ARTICLE_COUNT).map(hub => hub._id)

  return {
    hubs: hubs,
    creator: user._id,
    title: faker.name.title(),
    summary: faker.lorem.paragraph(),
    content: faker.lorem.paragraphs()
  }
}

