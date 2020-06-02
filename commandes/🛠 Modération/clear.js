module.exports = {
    config: {
        name: "clear",
        description: "Supprime des messages",
        usage: "[nombre de message]",
        category: "🛠 Modération",
        accessableby: "Modérateur",
        aliases: ["purge"],
        exemple: `clear 5`
    },

    run: async (bot, message, args) => {
        message.delete();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`J'ai supprimé ***${args[0]} messages*** pour vous.`).then(message => message.delete({ timeout: 5000, reason: "Console." }));

        })
    }
}
