const { RichEmbed } = require("discord.js")
const translate = require('google-translate-api');

module.exports = {
    config: {
        name: "traduction",
        description: "Permet de traduire un texte.",
        usage: ``,
        category: "⚙ Utilitaire",
        accessableby: "",
        aliases: ["translate", "traduc"],
        exemple: "Maintenance"
    },
    run: async (bot, message, args) => {
        message.channel.send("Cette commande est en maintenance ! ")
    }
}