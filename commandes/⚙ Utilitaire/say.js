module.exports = {
    config: {
        name: "say",
        description: "",
        usage: "<message>",
        category: "⚙ Utilitaire",
        accessableby: "Modérateurs",
        aliases: ["acc", "announcement"],
        exemple: ``
    },
    run: async (bot, message, args) => {
        message.delete();
        if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send(":x: Vous ne pouvez pas utiliser cette commande")

        let argsresult;
        if (!argsresult) return;
        let mChannel = message.mentions.channels.first()

        message.delete()
        if (mChannel) {
            argsresult = args.slice(0).join(" ")
            mChannel.send(argsresult)
        } else {
            argsresult = args.join(" ")
            message.channel.send(argsresult)
        }

    }
}
