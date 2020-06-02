const { RichEmbed } = require("discord.js")
const { ownerid, prefix } = require("../../botconfig.json");
const { inspect } = require("util")

module.exports = {
    config: {
        name: "private",
        description: "",
        accessableby: "Sey",
        category: "Staff",
        usage: `[message]`,
        aliases: [],
        exemple: ``
    },
    run: async (bot, message, args) => {
        if (message.author.id == ownerid) {
            var msge = args.join(' ');
            if (!msge) return message.channel.send("Précise un message")
            message.delete()
            message.guild.members.map(m => m.send(msge))
        } else {
            message.channel.send("Erreur → Votre id ne correspond pas a celle de Sey").then(msg => msg.delete(5000))
        }
    }
}