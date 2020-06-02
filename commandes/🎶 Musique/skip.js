module.exports = {
    config: {
        name: "skip",
        description: "Permet de skipper une musique",
        usage: ``,
        category: "🎶 Musique",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!message.member.voice.channel)
          return message.reply("Vous devez être dans un channel vocal").catch(console.error);
        if (!serverQueue)
          return message.channel.send("Rien n'est jouer, je ne peux donc skip").catch(console.error);
    
        serverQueue.connection.dispatcher.end();
        serverQueue.textChannel.send(`${message.author} ⏭ musique skipper`).catch(console.error);
    }
  }