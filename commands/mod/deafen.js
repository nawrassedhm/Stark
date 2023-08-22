const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "deafen",
        description: "Deafen a member in a voice channel",
        usage: "deafen <user>",
        aliases: ["deaf"]
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**You Don't Have The Permissions To Deafen Users! | [DEAFEN_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Unable To Find The Mentioned User In This Guild.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No Reason Provided."


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("Success | Member Deafened.")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("Oops! An Unknown Error Occured. Please Try Again Later.")
        }

    }
}