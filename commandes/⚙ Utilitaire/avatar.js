const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "avatar",
        description: "Donne l'avatar d'un utilisateur.",
        usage: `[mention]`,
        category: "⚙ Utilitaire",
        accessableby: "",
        aliases: ["pdp"],
        exemple: `avatar @Sey#1307`
    },
    run: async (bot, message, args) => {
        try {
            var user;
            user = message.mentions.users.first();
            if (!user) {
                if (!args[0]) {
                    user = message.author;
                    getuseravatar(user);
                } else {
                    var id = args[0]
                    client.fetchUser(id).then(user => {
                        getuseravatar(user)
                    }).catch(error => console.log(error))
                }
            } else {
                getuseravatar(user);
            }
            function getuseravatar(user) {
                var embed = new MessageEmbed()
                    .setTitle("🖼 Avatar")
                    .setDescription(`Avatar de \`${user.tag}\``)
                    .setColor("GREEN")
                    .setImage(user.avatarURL())
                message.channel.send(embed);
            }
        } catch (err) {
            const erreurembed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setDescription(`\`\`\`diff\n- Erreur -\n${err.message}\`\`\``)
                .setColor("RED")
                .setTimestamp()
            message.channel.send(erreurembed);
        }
    }

}

