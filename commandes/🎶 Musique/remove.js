module.exports = {
    config: {
        name: "remove",
        description: "Permet de voir la playlist actuelle.",
        usage: ``,
        category: "🎶 Musique",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
      if (!args.length) return message.reply("Usage: remove <Queue Number>");
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!serverQueue) return message.channel.send("Il n'y a pas de musique.").catch(console.error);
  
      const song = serverQueue.songs.splice(args[0] - 1, 1);
      serverQueue.textChannel.send(`${message.author} ❌ enlevée **${song[0].title}** de la queue.`);
    }
  };