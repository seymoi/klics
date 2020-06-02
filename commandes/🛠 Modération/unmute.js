const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../couleurs.json");

module.exports = {
    config: {
        name: "unmute",
        description: "",
        usage: "<user> <reason>",
        category: "🛠 Modération",
        accessableby: "Modérateurs",
        aliases: ["unm", "speak"],
        exemple: ``
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send(":x: Vous n'avez pas les permissions pour utiliser cette commande");

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(":x: Je n'ai pas les permissions necessaire")

        //define the reason and unmutee
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mutee) return message.channel.send(":x: Veuillez indiquez un utilisateur");

        //define mute role and if the mute role doesnt exist then send a message
        let muterole = message.guild.roles.find(r => r.name === "Mute")
        if (!muterole) return message.channel.send(":x: Cette personne n'est pas mute")

        //remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
        mutee.roles.remove(muterole.id).then(() => {
            message.delete()
            mutee.send(`Bonjour, tu peut désormais parler dans ${message.guild.name} pour: ${reason}`).catch(err => console.log(err))
            message.channel.send(`${mutee.user.username} est unmute :white_check_mark:`)
        })

        //send an embed to the modlogs channel
        let embed = new MessageEmbed()
            .setColor(redlight)
            .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
            .addField("Moderation:", "unmute")
            .addField("Utilisateur:", mutee.user.username)
            .addField("Moderateur:", message.author.username)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.cache.find(c => c.name === "logs")
        sChannel.send(embed)

    }

}
