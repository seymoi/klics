const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "mute",
        description: "",
        usage: "<mute> <user> [reason]",
        category: "🛠 Modération",
        accessableby: "Modérateurs",
        aliases: ["m", "chut"],
        exemple: ``
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send(":x: Vous n'avez pas les permissions necessaire pour effectuer cela");

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(":x: Je n'ai pas les permissions requise pour effectuer ceci")

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mutee) return message.channel.send(":x: Veuillez indiquer un utilisateur!");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Aucune raison"

        let muteRole = message.guild.roles.cache.find(r => r.name === "Mute")

        if (!muteRole) {
            try {
                muteRole = await message.guild.createRole({
                    name: "Mute",
                    color: "#080808",
                    permissions: [0]
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    })
                })

            } catch (e) { console.log(e.stack) };
        }
        await mutee.roles.add(muteRole.id);
        mutee.roles.add(muteRole.id).then(() => {
            message.delete()
            mutee.send(`Tu à été mute sur ${message.guild.name} pour: ${reason}`).catch(err => console.log(err))
            message.channel.send(`${mutee.user.username} a été mute. 👍`)
        })

        let embed = new MessageEmbed()
            .setColor()
            .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
            .addField("Moderation:", "mute")
            .addField("Utilisateur:", mutee.user.tag)
            .addField("Moderateur:", message.author.tag)
            .addField("Raison:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
            const logschannel = message.guild.channels.cache.find(c => c.name === "logs");
            if (!logschannel || logschannel.type !== 'text') return message.channel.send("<:KlicsV1:707306089531834500> Aucun channel nommé `logs` trouvé. Veuillez en créer un, ou vous ne pourrez pas utiliser les commandes de modération.")
        logschannel.send(embed)
    }
}

