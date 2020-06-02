const { MessageEmbed } = require("discord.js");
const { redlight } = require("../../couleurs.json");

module.exports = {
    config: {
        name: "kick",
        description: "Permet de kick un utilisateur.",
        usage: "<mention> [raison]",
        category: "🛠 Modération",
        accessableby: "Modérateurs",
        aliases: [],
        exemple: `kick Sey#1307 Lis le réglement!`
    },
    run: async (bot, message, args) => {
        const sancmember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ")
        if (!reason) reason = "Aucune raison"
        const erreurembed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor("RED")
            .setTimestamp()
        try {
            if (!sancmember.kickable) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nCette personne ne peux pas être ban.```");
                } catch (e) {
                    console.log(e)
                }
            if (sancmember.id === bot.user.id) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nJe ne peux pas me kick moi même.```");
                } catch (e) {
                    console.log(e);
                }
                return message.channel.send(erreurembed);
            }
            if (sancmember.id === message.author.id) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nTu ne peux pas te kick toi même.```");
                } catch (e) {
                    console.log(e);
                }
                return message.channel.send(erreurembed);
            }
            if (!sancmember) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nVeuillez mentionner un utilisateur.```");
                } catch (e) {
                    console.log(e);
                }
                return message.channel.send(erreurembed);
            }
            if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nVous n'avez pas la permission KICK_MEMBERS.```");
                } catch (e) {
                    console.log(e);
                }
                return message.channel.send(erreurembed);
            }
            if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nMes permissions ne sont pas suffisante. (KICK_MEMBERS)```");
                } catch (e) {
                    console.log(e);
                }
                return message.channel.send(erreurembed);
            }
            const logsembed = new MessageEmbed()
                .setColor(redlight)
                .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
                .addField("Moderation:", "kick")
                .addField("Utilisateur:", sancmember.user.tag)
                .addField("Moderateur:", message.author.tag)
                .addField("Raison:", reason)
                .addField("Date:", message.createdAt.toLocaleString())

            const logschannel = message.guild.channels.cache.find(c => c.name === "logs");
            if (!logschannel || logschannel.type !== 'text') return message.channel.send("<:KlicsV1:707306089531834500> Aucun channel nommé `logs` trouvé. Veuillez en créer un, ou vous ne pourrez pas utiliser les commandes de modération.")
            try {
                const smemembed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Attention")
                    .setDescription(`Vous avez été kick de ${message.guild.name}. Comportez vous normalement ou vous serez banni de ce serveur.`)
                    .addField(`Kick par`, `${message.author}(\`${message.author.tag}\`)`, true)
                    .addField("Raison", `${reason}`, true)
                    .setFooter("Ceci est un message automatique.")
                    .setTimestamp()
                await sancmember.send(smemembed)
            } catch (err) {
                console.log("Le déstinataire ne souhaite pas recevoir de message privés ou m'a bloquer.")
            }
        }
            sancmember.kick()
                .then(() => {
                    message.channel.send(`${sancmember} a été kick avec succés !`)
                    logschannel.send(logsembed)
                })
                .catch(err => {
                    message.channel.send(`L'utilisateur n'a pas pu être kick : ${err}`)
                })
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


