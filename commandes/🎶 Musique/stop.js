const discord = require("discord.js");

module.exports = {
    config: {
        name: "stop",
        description: "Permet de stopper une musique",
        usage: ``,
        category: "🎶 Musique",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
      const serverQueue = message.client.queue.get(message.guild.id);

      if (!message.member.voice.channel)
        return message.reply("Vous devez être channel vocal.").catch(console.error);
      if (!serverQueue) return message.reply("Rien n'est jouer actuellement.").catch(console.error);
  
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
      serverQueue.textChannel.send(`${message.author} ⏹ j'ai stopper la musique.`).catch(console.error);
  }
};