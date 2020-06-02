const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "userinfo",
        description: "Affiche vos informations",
        usage: ``,
        category: "ℹ Informations",
        accessableby: "",
        aliases: ["ui"],
        exemple: ``
    },
    run: async (bot, message, args) => {
        try {
            message.delete({ time: 10000 });
            var create = message.author.createdAt;
            var createdAt = `${create.getDate()}/${create.getMonth() + 1}/${create.getFullYear()}`;
            let uEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("User Informations :")
                .setThumbnail(message.author.displayAvatarURL)
                .setTimestamp()
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
                .addField("**Nom:**", `${message.author.username}`, true)
                .addField("**Hashtag:**", `${message.author.discriminator}`, true)
                .addField("**ID:**", `${message.author.id}`, true)
                .addField("**Statut:**", `${message.author.presence.status}`, true)
                .addField("**Créé Le:**", createdAt, true)
                .setFooter(`Développement Bot`, bot.user.displayAvatarURL);
            message.channel.send(uEmbed);
            message.channel.send("Cette partie est encore en dev.")
        } catch (err) {
            message.channel.send(`Erreur → ${err.message}`)
        }
    }
}




