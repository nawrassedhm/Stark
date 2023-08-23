const { PREFIX } = require('../../config');

module.exports = async bot => {
  console.log(`${bot.user.username} is available now!`)
  bot.user.setActivity(`You S3 | ${PREFIX}help`, { type: "WATCHING" }), 5000

};
