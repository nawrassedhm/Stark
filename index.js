//====================================================================================CONSTANTS REQUIRED ON READY=============================================================================================

const { Client, Collection } = require('discord.js');
const { PREFIX, TOKEN } = require('./config');
const bot = new Client({ disableMentions: 'everyone' });
const fs = require("fs");
const db = require('quick.db');

//============================================================================================================================================================================================================
//====================================================================================COLLECTIONS REQUIRED ON READY===========================================================================================

bot.commands = new Collection();
bot.aliases = new Collection();

//============================================================================================================================================================================================================
//============================================================================================INITIALIZING====================================================================================================

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handler/${handler}`)(bot);
});

//============================================================================================================================================================================================================
//=========================================================================================MENTION SETTINGS===========================================================================================

bot.on('message', async message => {
  let prefix;
  try {
    let fetched = await db.fetch(`prefix_${message.guild.id}`);
    if (fetched == null) {
      prefix = PREFIX
    } else {
      prefix = fetched
    }
  } catch {
    prefix = PREFIX
  };
  try {
    if (message.mentions.has(bot.user.id) && !message.content.includes("@everyone") && !message.content.includes("@here")) {
      message.channel.send(`\nMy Prefix For \`${message.guild.name}\` Is \`${prefix}\` Type \`${prefix}help\` For The List Of Available Commands.`);
    }
  } catch {
    return;
  };
});

//============================================================================================================================================================================================================

bot.login(TOKEN);
