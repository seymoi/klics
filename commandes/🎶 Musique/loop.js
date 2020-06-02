module.exports = {
    config: {
        name: "loop",
        description: "Permet de jouer une musique en boucle.",
        usage: ``,
        category: "🎶 Musique",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.reply("Vous devez rejoindre un channel vocal.").catch(console.error);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.reply("Rien n'est jouer actuellement").catch(console.error);

        // toggle from false to true and reverse
        serverQueue.loop = !serverQueue.loop;
        return serverQueue.textChannel
            .send(`La loop est désormais ${serverQueue.loop ? "**activée**" : "**désactivée**"}`)
            .catch(console.error);
    }
}