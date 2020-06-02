const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "suggestion",
        description: "Permet de faire une suggestion pour améliorer Klic's!",
        usage: `[suggestion]`,
        category: "⚙ Utilitaire",
        accessableby: "",
        aliases: [],
        exemple: "suggestion Ajouter une commande permetant de..."
    },
    run: async (bot, message, args) => {
        try {
            let suggestion = args.slice(0).join(" ");
            const erreurembed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setColor("RED")
                .setTimestamp()
            try {
                if (!suggestion) {
                    try {
                        erreurembed.setDescription("```diff\n- Erreur -\nVeuillez entrer une suggestion.```");
                    } catch (e) {
                        console.log(`Erreur dans la commande suggestion : ${e}`);
                    }
                    return message.channel.send(erreurembed);
                }
                const suggestembed = new MessageEmbed()
                    .setTitle("Notification")
                    .setColor("GREEN")
                    .addField(`Suggestion nous venant de \`${message.author.tag}\`(\`${message.author.id}\`).`, `${suggestion}`)
                    .setTimestamp()
                bot.guilds.cache.find(x => x.id === "699986425944342619").channels.cache.find(x => x.id === "710559153311187015")
                    .send(suggestembed)
                    .then(m => m.react("✅")
                        .then(() => m.react("🤔"))
                        .then(() => m.react("❎")))
                message.channel.send("Votre suggestion envoyée avec succés, merci !")
            } catch (err) {
                console.log(`Erreur dans la commande suggestion : ${err.message}`);
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