const { MessageEmbed } = require("discord.js")
const { config } = require("../../botconfig.json");
const { purple_dark } = require("../../couleurs.json")
const { annonchan, sondagechan, giveawaychan, welcome, logschan, plainteschan, sansgene } = require("../../channels.json");

module.exports = {
    config: {
        name: "slowmode",
        description: "Permet de définir le cooldown d'un channel.",
        usage: `[channel] [temps]`,
        category: "🛠 Modération",
        accessableby: "Modérateur",
        aliases: ["cooldown"],
        exemple: "slowmode #général 10"
    },
    run: async (bot, message, args) => {
        const erreurembed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor("RED")
        .setTimestamp()
        if (!message.member.hasPermission(["MANAGE_CHANNELS"])) {
            try {
                erreurembed.setDescription("```diff\n- Erreur -\nVous n'avez pas la permission MANAGE_CHANNELS.```");
            } catch (e) {
                console.log(e);
            }
            return message.channel.send(erreurembed);
        }
        if (!message.guild.me.hasPermission(["MANAGE_CHANNELS"])) {
            try {
                erreurembed.setDescription("```diff\n- Erreur -\nMes permissions ne sont pas suffisante. (MANAGE_CHANNELS)```");
            } catch (e) {
                console.log(e);
            }
            return message.channel.send(erreurembed);
        }
        let temps = args[0];
        if(!temps)return message.channel.send(`Vous devez entrer un temps !`)
        if(isNaN(temps))return message.channel.send(`Cela n'est pas un nombre`)
        let reason = args.slice(1).join(" ")
        if(!reason){
            reason=="Aucune raison données"
        }
        message.channel.setRateLimitPerUser(args[0],reason)
        message.channel.send(`Le slowmode est de **${args[0]}**`)
    }
}