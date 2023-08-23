const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
  config: {
    name: "prefix",
    description: "Change/Know The server's Prefix or the Global Prefix",
    usage: "m/prefix <new prefix/reset>",
    example: "1) m/prefix = \n2) m/prefix reset",
    aliases: ["prefix"]
  },

  run: async (bot, message, args) => {
    let option = args[0];

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("You Are Not Allowed Or Do Not Have Permission To Change Prefix.")
    }

    if (!option) {
      prefix = db.fetch(`prefix_${message.guild.id}`)
      if (!prefix) prefix = PREFIX;
      let prefEmbed = new MessageEmbed()
        .setColor('#6eb6c7')
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**\nMy Prefix For \`${message.guild.name}\`  Is  **` + `  \`${prefix}\` \n**Type \`${prefix}Help\` For Help**`)

      message.channel.send(prefEmbed);
    }

    if (option.toLowerCase() === "reset") {
      db.delete(`prefix_${message.guild.id}`)
      return await message.channel.send("The Prefix Was Reseted Successfully.")
    }

    if (args[1]) {
      return message.channel.send("You Can Not Set Prefix A Double Argument.")
    }

    if (args[0].length > 4) {
      return message.channel.send("You Can Not Send Prefix More Than 4 Characters.")
    }

    if (args.join("") === PREFIX) {
      db.delete(`prefix_${message.guild.id}`)
      return await message.channel.send("The Prefix Was Reseted Successfully.")
    }

    db.set(`prefix_${message.guild.id}`, args[0])
    await message.channel.send(`Done | My Prefix Set ${args[0]}`)


  }

}