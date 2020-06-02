const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "liens",
        description: "Donne tout les liens relatif a Klic's",
        usage: ``,
        category: "⚙ Utilitaire",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
        try {
            let embed = new MessageEmbed()
                .setColor("BLUE")
                .setTitle("Liens")
                .addField("`Lien d'invitation`", `[Clique ici](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=805314622) pour m'inviter a rejoindre ton serveur.`)
                .addField("`Support`", `[Clique ici](https://discord.gg/gdakXXE) pour rejoindre mon serveur support.`)
                .setTimestamp()
                .setFooter("Klic's 2020.")
            message.channel.send(embed)
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