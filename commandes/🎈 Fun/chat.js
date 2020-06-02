const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../couleurs.json");
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "chat",
        description: "Envoi une image de chat.",
        usage: ``,
        category: "🎈 Fun",
        accessableby: "",
        aliases: ["cat"],
        exemple: ``
    },
    run: async (bot, message, args) => {
        try {
            fetch(`https://some-random-api.ml/img/cat`)
                .then(res => res.json()).then(body => {
                    if (!body) return message.reply(":x: Oups une erreur c'est produite")
                    let cEmbed = new MessageEmbed()
                        .setColor(cyan)
                        .setAuthor(`${bot.user.username} MEOW !`, message.guild.iconURL())
                        .setImage(body.link)
                        .setTimestamp()
                        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                    message.channel.send("Chargement...").then(msg => {
                        msg.edit(cEmbed)
                    })
                })
        } catch (err) {
            const erreurembed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setDescription(`\`\`\`diff\n- Erreur -\n${err.message}\`\`\``)
                .setColor("RED")
                .setTimestamp()
            message.channel.send(erreurembed);
        }
    }
}