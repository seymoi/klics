module.exports = {
    config: {
        name: "volume",
        description: "Permet de voir la playlist actuelle.",
        usage: ``,
        category: "🎶 Musique",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
      const serverQueue = message.client.queue.get(message.guild.id);

      if (!message.member.voice.channel)
        return message.reply("Vous devez rejoindre un channel vocal.").catch(console.error);
      if (!serverQueue) return message.reply("Rien n'est actuellement jouer").catch(console.error);
  
      if (!args[0])
        return message.reply(`🔊 Le volume actuelle est de: **${serverQueue.volume}%**`).catch(console.error);
      if (isNaN(args[0])) return message.reply("Le volume doit être un nombre.").catch(console.error);
      if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
        return message.reply("Le volume doit être entre 0 - 100.").catch(console.error);
  
      serverQueue.volume = args[0];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  
      return serverQueue.textChannel.send(`Volume mis a: **${args[0]}%**`).catch(console.error);
    }
  };