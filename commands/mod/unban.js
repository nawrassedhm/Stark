const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
  config: {
    name: "unban",
    description: "Unban a user from the guild!",
    usage: "[name | tag | mention | ID] <reason> (optional)",
    aliases: ["ub", "unbanish"],
  },
  run: async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You Don't Have The Permissions To Unban Someone! | [BAN_MEMBERS]**")

    if (!args[0]) return message.channel.send("**Please Enter A Name!**")

    let bannedMemberInfo = await message.guild.fetchBans()

    let bannedMember;
    bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
    if (!bannedMember) return message.channel.send("**Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned!**")

    let reason = args.slice(1).join(" ")

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**I Don't Have Permissions To Unban Someone! | [BAN_MEMBERS]**")
    try {
      if (reason) {
        message.guild.members.unban(bannedMember.user.id, reason)
        var sembed = new MessageEmbed()
          .setColor("#6eb6c7")
          .setDescription(`**${bannedMember.user.tag} Has Been Unbanned For | ${reason}**`)
        message.channel.send(sembed)
      } else {
        message.guild.members.unban(bannedMember.user.id, reason)
        var sembed2 = new MessageEmbed()
          .setColor("#6eb6c7")
          .setDescription(`**${bannedMember.user.tag} Has Been Unbanned**`)
        message.channel.send(sembed2)
      }
    } catch {

    }

    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (!channel) return;

    let embed = new MessageEmbed()
      .setColor("#6eb6c7")
      .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .addField("**Moderation**", "unban")
      .addField("**Unbanned**", `${bannedMember.user.username}`)
      .addField("**ID**", `${bannedMember.user.id}`)
      .addField("**Moderator**", message.author.username)
      .addField("**Reason**", `${reason}` || "**No Reason**")
      .addField("**Date**", message.createdAt.toLocaleString())
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(embed)
  }
}