module.exports = {
  config: {
    name: "slowmode",
    description: "Set the slowmode for the channel!",
    aliases: ['sm']
  },
  run: async (bot, message, args) => {

    if (!args[0])
      return message.channel.send(
        `You Did Not Specify The Time You Wish To Set This Channel's Slowmode To!`
      );

    if (isNaN(args[0])) return message.channel.send(`That Is Not A Number!`);

    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Set The Slowmode Of This Channel To **${args[0]}**`
    );
  },
};