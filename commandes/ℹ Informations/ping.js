const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../couleurs.json");

module.exports = {
    config: {
        name: "ping",
        description: "Affiche le ping du bot",
        usage: "",
        category: "ℹ Informations",
        accessableby: "",
        aliases: [],
        exemple: ``
    },
    run: async (bot, message, args) => {
        try {
            message.channel.send("Calcul en cours...").then(m => {
                let ping = m.createdTimestamp - message.createdTimestamp
                const latembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTimestamp()
                    .setTitle("Pong 🏓")
                    .addField("**📶 Latence →**", `***${ping}*** ms.`, true)
                    .addField("**💻API →**", `**${Math.round(bot.ws.ping)}** ms.`, true)
                    .setFooter(bot.user.usernname, bot.user.displayAvatarURL)
                m.edit(latembed)
            })
        } catch (err) {
            const erreurembed = new MessageEmbed()
                .setColor("RED")
                .setAuthor(mmessage.author.username, message.author.displayAvatarURL)
                .setTimestamp()
                .addField("Erreur →", `${err.message}`)
            message.channel.send(erreurembed)
        }
    }
}
