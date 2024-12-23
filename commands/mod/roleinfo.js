const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: 'roleinfo',
    description: "shows stats of the mentioned role",
    usage: "@roleinfo <role mention/role id>",
    aliases: ['rinfo', 'rolei']
  },
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send("**Please Enter A Role!**")
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
    if (!role) return message.channel.send("**Please Enter A Valid Role!**");

    const status = {
      false: "No",
      true: "Yes"
    }

    let roleembed = new MessageEmbed()
      .setColor("#6eb6c7")
      .addField("**ID**", `\`${role.id}\``, true)
      .addField("**Name**", role.name, true)
      .addField("**Color**", role.hexColor, true)
      .addField("**Members**", role.members.size, true)
      .addField("**Position**", role.position, true)
      .addField("**Mentionable**", status[role.mentionable], true)

      .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
      .setTimestamp()

    message.channel.send(roleembed);
  }
}