module.exports = {
    config: {
          name: "slowmode",
          description: "Set the slowmode for the channel!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!args[0])
      return message.channel.send(
        `You Did Not Specify The Time In Seconds You Wish To Set This Channel's Slowmode Too!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`That Is Not A Number!`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Set The Slowmode Of This Channel Too **${args[0]}**`
    );
  },
};