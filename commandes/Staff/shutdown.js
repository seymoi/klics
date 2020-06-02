const { prefix, ownerid } = require("../../botconfig.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "shutdown",
        description: "Permet de me stopper",
        usage: ``,
        category: "Staff",
        accessableby: "Sey",
        aliases: ["botstop", "shutdown"],
        exemple: ``
    },
    run: async (bot, message, args) => {
        if (message.author.id != ownerid) return message.channel.send("Erreur → Votre id ne correspond pas a celle de Sey").then(msg => msg.delete(5000))
        try {
            const embed = new MessageEmbed()
                .setTitle("Demande d'arrêt.")
                .setDescription("Arrêt en cours! 🛑")
                .setColor("GREEN")
                .setTimestamp()
                .setFooter("Stop")
            message.channel.send(embed)
                .then(msg => msg.react("✔"))
                .then(() => {
                    process.exit()
                })
        } catch (err) {
            console.log("Erreur dans la commande →" + err.message)
        }
    }
}
