const { ownerID } = require('../../owner.json')

module.exports = {
  config: {
    name: "dm",
    description: "DM a user in the guild",
    aliases: ['pm']
  },
  run: async (bot, message, args) => {

    if (!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !ownerID.includes(message.author.id)) return;

    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send(
        `You Did Not Mention A User, Or Gave an ID.`
      );
    if (!args.slice(1).join(" "))
      return message.channel.send("You Did Not Specify Your Message.");
    user.user
      .send(args.slice(1).join(" "))
      .catch(() => message.channel.send("That User Could Not Be DMed!"))
      .then(() => message.channel.send(`Sent A Message To ${user.user.tag}!`));
  },
};