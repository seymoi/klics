const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const fs = require("fs")

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commande"],
        usage: `[commande]`,
        category: "⚙ Utilitaire",
        description: "Affiche la liste des commandes disponible.",
        accessableby: "",
        exemple: `help ping`
    },
    run: async (bot, message, args) => {
        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if (!prefixes[message.guild.id]) {
            prefixes[message.guild.id] = {
                prefixes: config.prefix
            }
        }
        let prefix = prefixes[message.guild.id].prefixes;
        const embed = new MessageEmbed()
            .setColor("#2ac07")
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL())
        if (!args[0]) {
            const categories = readdirSync("./commandes/")
            embed.setTitle("❯ 📍 Menu d'aide")
            embed.setDescription(`Total des commandes: \`${bot.commands.size}\``)
            // embed.setImage(url='https://cdn.discordapp.com/attachments/704311947226513488/706275110645923920/MvMxQ1a.gif')
            embed.setTimestamp();
            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`${capitalise} (\`${dir.size}\`):`, dir.map(c => `\`${c.config.name}\``).join(", "))
                } catch (e) {
                    console.log(e)
                }
            })
            embed.addField("**Liens utile 📎**", `[Invite moi](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=805314622) 󠀀󠀀• [Support](https://discord.gg/gdakXXE)`)
            return message.channel.send(embed)
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle(":x: Commande introuvable.").setDescription(`Faites \`${prefix}help\` pour afficher la liste des commandes.`))
            command = command.config
            embed.setTitle(stripIndents`Menu de la commande: \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\``)
            embed.setDescription(`\`<>\` → Obligatoire | \`[]\` → Optionnel.`)
            embed.addField("🔧Alias →", `-\`${command.aliases.join(", ") || "Aucun."}\``, true)
            embed.addField("⚙ Utilisation →", `-\`${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "Aucun usage défini."}\``, true)
            embed.addField("👉 Accessible pour →", `-\`${command.accessableby || "Tout le monde."}\``, true)
            embed.addField("✏ Description →", `-\`${command.description || "Aucune description."}\``)
            embed.addField("🤷‍♂️ Exemple →", `-\`${prefix}${command.exemple || "Aucun exemple."}\``)
            return message.channel.send(embed)
        }
    }
}