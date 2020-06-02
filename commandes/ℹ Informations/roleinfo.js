const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "roleinfo",
        description: "",
        usage: `<role>`,
        category: "ℹ Informations",
        accessableby: "",
        aliases: ["ri"],
        exemple: ""
    },
    run: async (bot, message, args) => {
        let inline = true
        let role = args.join(" ");
        if (!role) return message.reply("Veuillez entrer un rôle");
        let gRole = message.guild.roles.cache.find(r => r.name == role) || message.guild.roles.cache.find(r => r.id == role) || message.mentions.roles.first();
        if (!gRole) return message.reply("Rôle introuvable.");
        const status = {
            false: "Non",
            true: "Oui"
        }
        let roleemebed = new MessageEmbed()
            .setTitle(`ℹ Infomartion du rôle : ${gRole.name}.`)
            .setColor("GREEN")
            .addField("🆔 ID", gRole.id, inline)
            .addField("🗣 Mention", `\`<@${gRole.id}>\``, inline)
            .addField("🖌 Couleur", gRole.hexColor, inline)
            .addField("📄 Membres", gRole.members.size, inline)
            .addField("↨ Position", gRole.position, inline)
            .addField("🤔 Mentionnable", status[gRole.mentionable], inline)

        message.channel.send(roleemebed);
    }
}