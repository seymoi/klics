const { MessageEmbed } = require("discord.js");
const { redlight } = require("../../couleurs.json");

module.exports = {
    config: {
        name: "unban",
        description: "Permet de déban un utilisateur.",
        usage: "[utilisateur]",
        category: "🛠 Modération",
        accessableby: "Administrateurs",
        aliases: ["ub", "unbanish"],
        exemple: `unban Sey#1307`
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(":x: Vous n'avez pas les permissions nécessaire pour cela")

        let bannedMember = await bot.users.fetch(args[0])
        if (!bannedMember) return message.channel.send(":x: Indiquez un utilisateur a unban")

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "Aucune raison"

        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(":x: Je n'ai pas les permissions nécessaire pour cela") |
            message.delete()
        try {
            message.guild.members.unban(bannedMember, reason)
            message.channel.send(`${bannedMember.tag} a était unbanni du serveur`)
        } catch (e) {
            console.log(e.message)
        }

        let embed = new MessageEmbed()
            .setColor()
            .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
            .addField("Moderation:", "unban")
            .addField("Utilisateur :", `${bannedMember.username} (${bannedMember.id})`)
            .addField("Moderateur:", message.author.username)
            .addField("Raison:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        const logschannel = message.guild.channels.cache.find(c => c.name === "logs");
        if (!logschannel || logschannel.type !== 'text') return message.channel.send("<:KlicsV1:707306089531834500> Aucun channel nommé `logs` trouvé. Veuillez en créer un, ou vous ne pourrez pas utiliser les commandes de modération.")
        logschannel.send(embed)

    }
}