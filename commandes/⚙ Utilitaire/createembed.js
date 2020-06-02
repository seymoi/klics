const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "createembed",
        description: "Vous crée un embed",
        usage: `[#channel] | <Titre> | <Couleur> | <Message>`,
        category: "⚙ Utilitaire",
        accessableby: "Modérateur",
        aliases: [],
        exemple: `createembed #annonces Nouveau Staff | GREEN | C'est....`
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(":x: Vous ne pouvez pas utiliser cette commande");
        try {
            const cmd = args.join(' ').split(' | ')
            let channel = message.mentions.channels.first()
            if (channel) {
                let emb = new MessageEmbed()
                    .setTitle(cmd[0])
                    .setColor(cmd[1])
                    .setDescription(cmd[2])
                    .setTimestamp()

                channel.send(emb)
                message.delete();
            } else {
                const cmd = args.join(' ').split(' | ')
                let emb = new MessageEmbed()
                    .setTitle(cmd[0])
                    .setColor(cmd[1])
                    .setDescription(cmd[2])
                    .setTimestamp()

                message.channel.send(emb)
                message.delete();
            }
        } catch (err) {
            const erreurembed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setDescription(`\`\`\`diff\n- Erreur -\n${err.message}\`\`\``)
                .setColor("RED")
                .setTimestamp()
            message.channel.send(erreurembed);
        };
    }
}