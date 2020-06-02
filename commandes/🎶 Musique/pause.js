module.exports = {
  config: {
    name: "pause",
    description: "Permet de mettre en pause une musique.",
    usage: ``,
    category: "🎶 Musique",
    accessableby: "",
    aliases: [],
    exemple: ""
  },
  run: async (bot, message, args) => {
    if (!message.member.voice.channel)
      return message.reply("Vous devez être dans un channel vocal pour cela.").catch(console.error);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true);
      return serverQueue.textChannel.send(`${message.author} ⏸ La musique a été mise en pause.`).catch(console.error);
    }
    return message.reply("There is nothing playing.").catch(console.error);
  }
}