const { PREFIX } = require('../../config');

module.exports = async bot => {
console.log(`${bot.user.username} Is Available Now!`)
bot.user.setPresence({ activity: { name: `music | ${PREFIX}help`, type: 'LISTENING' }, status: `idle` })
};