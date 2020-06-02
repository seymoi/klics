const { MessageEmbed } = require("discord.js")
const superagent = require("snekfetch");
const errors = require('../../assets/json/errors');

module.exports = {
    config: {
        name: "femdom",
        description: "Commande NSFW",
        usage: ``,
        category: "🔞NSFW",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react("🔞");
            return message.channel.send(errMessage);
        }
        superagent.get('https://nekos.life/api/v2/img/femdom')
            .end((err, response) => {
                const lewdembed = new MessageEmbed()
                    .setTitle("🔞 Hentai")
                    .setDescription(`Si l'image ne s'affiche pas clic [ici](${response.body.url}).`)
                    .setImage(response.body.url)
                    .setColor(`BLUE`)
                    .setFooter(`Tags: femdom`)
                message.channel.send(lewdembed);
            })
    }
}