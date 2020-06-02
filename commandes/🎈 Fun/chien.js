const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../couleurs.json");
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "chien",
        description: "Envoi une photo de chien",
        usage: ``,
        category: "🎈 Fun",
        accessableby: "",
        aliases: ["dog", "puppy"],
        exemple: ``
    },
    run: async (bot, message, args) => {
        try {
            fetch(`https://some-random-api.ml/img/dog`)
                .then(res => res.json()).then(body => {
                    if (!body) return message.reply(":x: Oups, je n'est pas pu charger l'image")

                    let dEmbed = new MessageEmbed()
                        .setColor(cyan)
                        .setAuthor(`${bot.user.username} WOAF!`, message.guild.iconURL())
                        .setImage(body.link)
                        .setTimestamp()
                        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
                    message.channel.send("Chargement...").then(msg => {
                        msg.edit(dEmbed)
                    });
                });
        } catch {
            const erreurembed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setDescription(`\`\`\`diff\n- Erreur -\n${err.message}\`\`\``)
                .setColor("RED")
                .setTimestamp()
            message.channel.send(erreurembed);
        }
    }
};