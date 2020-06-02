const { MessageEmbed } = require("discord.js");
const { redlight } = require("../../couleurs.json");

module.exports = {
    config: {
        name: "ban",
        description: "Permet de ban un utilisateur.",
        usage: "<membre> [raison]",
        category: "🛠 Modération",
        accessableby: "Administrateurs",
        aliases: ["b", "banish"],
        exemple: `ban @Sey#1307 La prochaine fois, tu lira encore mieux le réglement.`
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
            if (!sancmember.banable) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nCette personne ne peux pas être ban.```");
                } catch (e) {
                    console.log(e)
                }
            }
            if (sancmember.id === message.author.id) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nTu ne peux pas te ban toi même.```");
                } catch (e) {
                    console.log(e);
                }
                return message.channel.send(erreurembed);
            }
            if (sancmember.id === bot.user.id) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nJe ne peux pas me ban moi même.```");
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
            if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nVous n'avez pas la permission BAN_MEMBERS.```");
                } catch (e) {
                    console.log(e);
                }
                return message.channel.send(erreurembed);
            }
            if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) {
                try {
                    erreurembed.setDescription("```diff\n- Erreur -\nMes permissions ne sont pas suffisante. (BAN_MEMBERS)```");
                } catch (e) {
                    console.log(e);
                }
                return message.channel.send(erreurembed);
            }
            const logsembed = new MessageEmbed()
                .setColor(redlight)
                .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
                .addField("Moderation:", "ban")
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
                    .setDescription(`Vous avez été ban de \`${message.guild.name}\`. La prochaine fois, comportez vous encore mieux.`)
                    .addField(`Kick par`, `${message.author}(\`${message.author.tag}\`)`, true)
                    .addField("Raison", `${reason}`, true)
                    .setFooter("Ceci est un message automatique.")
                    .setTimestamp()
                await sancmember.send(smemembed)
            } catch (err) {
                console.log("Le déstinataire ne souhaite pas recevoir de message privés ou m'a bloquer.")
            }
            message.guild.members.ban(sancmember, {reason: reason})
                .then(() => {
                    message.channel.send(`${sancmember} a été ban avec succés !`)
                    logschannel.send(logsembed)
                })
                .catch(err => {
                    message.channel.send(`L'utilisateur n'a pas pu être ban : ${err}`)
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

