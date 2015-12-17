'use strict'

var _ = require('lodash')
var async = require('async')
var faker = require('faker')
var Hub = require('../../models/hub')
var User = require('../../models/user')

// Settings
const HUBS_COUNT = 1000

module.exports = function seedHubs (callback) {
  async.parallel({users: getUsers}, (err, result) => {
    if (err) return callback(err)

    var hubs = _.times(HUBS_COUNT, (n) => getFakeHub(result))

    Hub.create(hubs, callback)
  })
}

function getUsers (callback) {
  User.find().exec(callback)
}

function getFakeHub (result) {
  var user = _.sample(result.users)

  return {
    creator: user._id,
    title: faker.hacker.noun(),
    description: faker.hacker.phrase()
  }
}
