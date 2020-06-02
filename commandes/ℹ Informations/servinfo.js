const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "servinfo",
        description: "Permet de montrer les informations du serveur",
        usage: ``,
        category: "ℹ Informations",
        accessableby: "",
        aliases: ["si", "serverdesc"],
        exemple: ``
    },
    run: async (bot, message, args) => {
        try {
            function checkDays(date) {
                let now = new Date();
                let diff = now.getTime() - date.getTime();
                let days = Math.floor(diff / 86400000);
                return days + (days == 1 ? " day" : " days") + " ago";
            };
            const emojiList = message.guild.emojis.cache.map((e) => (e)).join(", ");
            let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
            let region = {
                "brazil": ":flag_br: Brésil",
                "europe": ":flag_eu: Europe",
                "singapore": ":flag_sg: Singapour",
                "us-central": ":flag_us: U.S. Central",
                "sydney": ":flag_au: Sydney",
                "us-east": ":flag_us: U.S. Est",
                "us-south": ":flag_us: U.S. Sud",
                "us-west": ":flag_us: U.S. West",
                "vip-us-east": ":flag_us: VIP U.S. Est",
                "london": ":flag_gb: Londre",
                "amsterdam": ":flag_nl: Amsterdam",
                "hongkong": ":flag_hk: Hong Kong",
                "russia": ":flag_ru: Russia",
                "southafrica": ":flag_za:  South Africa"
            };
            let sEmbed = new MessageEmbed()
                .setTitle(`Informations du serveur: \`${message.guild.name}\``)
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setThumbnail(message.guild.iconURL())
                .addField("👑 Créateur →", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
                .addField("✏ Informations →", `Bientot.`)
                .addField("Region", region[message.guild.region], true)
                // .addField("Total | Humans | Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
                // .addField("Verification Level", verifLevels[message.guild.verifLevels], true)
                // .addField("Channels", message.guild.channels.cache.size, true)
                // .addField("Roles", message.guild.roles.cache.size, true)
                // .addField("AFK channel", `${message.guild.afkChannelID === null ? 'Aucun.' : bot.channels.get(message.guild.afkChannelID).name}`, true)
                // .addField('AFK Timeout', `${message.guild.afkTimeout / 60} minutes`, true)
                // .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
                // .addField(`📁 Emojis → (\`${message.guild.emojis.cache.size}\`)`, `${emojiList || "\`Aucun\`"}`)
            message.channel.send(sEmbed);
            message.channel.send("Cette partie est encore en dev.")
        } catch (err) {
            const erreurembed = new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
                .addField("Erreur →", `${err.message}`)
            message.channel.send(erreurembed)
        }
    }
}

