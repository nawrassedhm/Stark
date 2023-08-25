const { PREFIX } = require('../../config');

module.exports = async bot => {
console.log(`${bot.user.username} Is Available Now!`)
bot.user.setPresence({ activity: { name: `Manifest S1 | ${PREFIX}help`, type: 'WATCHING' }, status: `dnd` })
};