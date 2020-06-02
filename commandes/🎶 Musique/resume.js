module.exports = {
    config: {
        name: "resume",
        description: "Met en marche une musique",
        usage: ``,
        category: "🎶 Musique",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
      const serverQueue = message.client.queue.get(message.guild.id);

      if (!message.member.voice.channel)
        return message.reply("Vous devez être dans un channel vocal.").catch(console.error);
  
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return serverQueue.textChannel.send(`${message.author} ▶ mise en marche!`).catch(console.error);
      }
      return message.reply("Rien n'est jouer actuellement.").catch(console.error);
    }
  }