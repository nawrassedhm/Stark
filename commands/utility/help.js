var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
  config: {
    name: "help",
    description: "Help",
    usage: "1) m/help \n2) m/help [module name]\n3) m/help [command (name or alias)]",
    example: "1) m/help\n2) m/help ban",
    aliases: ['h']
  },
  run: async (bot, message, args) => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
    try {
      let fetched = await db.fetch(`prefix_${message.guild.id}`);
      if (fetched == null) {
        prefix = PREFIX
      } else {
        prefix = fetched
      }
    } catch (e) {
      console.log(e)
    };

    if (message.content.toLowerCase() === `${prefix}help`) {
      var log = new Discord.MessageEmbed()
      var commandArray = "\n1) Hackban <id>\n2) Unban\n3) Kick\n4) Whois\n5) DM\n6) Warn\n7) Mute\n8) Unmute\n9) Deafen\n10) Undeafen \n11) Voicemove \n12) Purge\n13) Slowmode \n14) Nick \n15) Prefix"
      var commandA2 = "\n16) Roleinfo \n17) Rolememberinfo \n18) Roleadd\n19) Roledel\n20) Setmodlog\n21) Disablemodlog\n22) Setxp\n23) Disablexp\n24) Setmuterole\n25) Disablemuterole\n26) Reloadmod (Accessible only to the developer)\n27) Svr (Change The Server Region)\n28) Lock (Lock the channel)\n29) Unlock (Unlock the channel)\n30) Lockdown (Put the whole server on lockdown mode)"

      pageN1 = "\n`\`\`js\n" + commandArray + "\`\`\`";
      pageN2 = "\n`\`\`js\n" + commandA2 + "\`\`\`";

      let pages = [pageN1, pageN2]
      let page = 1

      var embed = new Discord.MessageEmbed()
        .setTitle('**Stark Commands**')
        .setColor("#6eb6c7")
        .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
        .setDescription(pages[page - 1])

      message.channel.send({ embed }).then(msg => {
        msg.react('⬅').then(r => {
          msg.react('➡')

          // Filters
          const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
          const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

          const backwards = msg.createReactionCollector(backwardsFilter, { timer: 6000 })
          const forwards = msg.createReactionCollector(forwardsFilter, { timer: 6000 })

          backwards.on('collect', (r, u) => {
            if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
            page--
            embed.setDescription(pages[page - 1])
            embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
            msg.edit(embed)
            r.users.remove(r.users.cache.filter(u => u === message.author).first())
          })

          forwards.on('collect', (r, u) => {
            if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
            page++
            embed.setDescription(pages[page - 1])
            embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
            msg.edit(embed)
            r.users.remove(r.users.cache.filter(u => u === message.author).first())
          })


        })
      })
    }

  }

}