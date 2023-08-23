const Discord = require("discord.js")
const { readdirSync } = require("fs");

module.exports = {
  config: {
    name: "reloadmod",
    description: "Reload command- Dev Only",
    aliases: ['rmod']
  },

  run: async (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
      .setTitle("Reload")
      .setDescription("Sorry, The `reload` Command Can Only Be Executed By The Developer Only.")
      .setColor("#6eb6c7");
    if (message.author.id !== '1119094799803371621') return message.channel.send(embed);

    if (!args[0].toLowerCase()) return message.channel.send("Please Provide A Command Name!")

    let commandName = args[0].toLowerCase()

    try {

      delete require.cache[require.resolve(`./${commandName}.js`)]
      const pull = require(`./${commandName}.js`)
      bot.commands.set(pull.config.name, pull)
      message.channel.send(`Successfully Reloaded | \`${commandName}\``)
    }

    catch (e) {
      console.log(e)
      return message.channel.send(`Could Not Reload Command : ${commandName} From Moderation Module Because | \n${e}`)
    }


  }
} 