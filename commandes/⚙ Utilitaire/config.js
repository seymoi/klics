const { MessageEmbed } = require("discord.js")
const config = require("../../botconfig.json")
const fs = require("fs");

module.exports = {
    config: {
        name: "config",
        description: "Changer la configuration de Klic's sur votre serveur",
        usage: "",
        category: "⚙ Utilitaire",
        accessableby: "Administrateurs",
        aliases: [],
        exemple: `config prefix !`
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("MANAGE_GUILD")) return;
            let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
            if (!prefixes[message.guild.id]) {
                prefixes[message.guild.id] = {
                    prefixes: config.prefix
                }
            }
            let prefix = prefixes[message.guild.id].prefixes;
            const settings = args[0];
            const newSetting = args.slice(1).join(" ");
            switch (settings) {
                case 'prefix': {
                    if (!newSetting) {
                        return message.channel.send(`Le prefix actuel est → ${prefix}`)
                    }
                    try {
                        prefixes[message.guild.id] = {
                            prefixes: newSetting
                        }
                        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), err => {
                            if (err) console.log(err);
                        });
                        message.channel.send(`**📍 Configuration**\n  > Prefix changer en \`${newSetting}\``)
                    } catch (err) {
                        message.channel.send(`Erreur → ${err.message}`)
                    }
                    break;
                }
                case 'view': {
                    try {
                        const embed = new MessageEmbed()
                            .setTitle("📍 Configuration →")
                            .setColor("GREEN")
                            .addField("Serveur →", ` ➧ Prefix : \`${prefix}\``)
                            .setTimestamp()
                        message.channel.send(embed)
                    } catch (err) {
                        message.channel.send(`Erreur → ${err.message}`)
                    }

                    break;
                }
                default: {
                    const cembed = new MessageEmbed()
                        .setTitle("📍 Configuration →")
                        .setColor("GREEN")
                        .setDescription("Entrer `view` pour voir les configurations actuelle.")
                        .addField("Prefix →", `➧ \`${prefix}config prefix <configuration>\``)
                        .addField("A venir →", "Bientôt.")
                    message.channel.send(cembed)
                    break;
                }
            }
        } catch {
            const erreurembed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setDescription(`\`\`\`diff\n- Erreur -\n${err.message}\`\`\``)
                .setColor("RED")
                .setTimestamp()
            message.channel.send(erreurembed);
        }
    }
}