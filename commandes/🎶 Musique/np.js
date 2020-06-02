const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "np",
    description: "Permet de voir la musique actuellement jouer",
    usage: ``,
    category: "🎶 Musique",
    accessableby: "",
    aliases: [],
    exemple: ""
  },
  run: async (bot, message, args) => {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!serverQueue)
        return message.channel.send({
          embed: { color: 0x1d82b6, description: "Rien n'est jouer actuellement" }
        });
      const duration =
        serverQueue.songs[0].duration.minutes * 60000 +
        (serverQueue.songs[0].duration.seconds % 60000) * 1000;
      const persentase = serverQueue.connection.dispatcher.streamTime / duration;
      const curentDurationMinute =
        Math.floor(serverQueue.connection.dispatcher.streamTime / 60000) < 10
          ? `0${Math.floor(serverQueue.connection.dispatcher.streamTime / 60000)}`
          : Math.floor(serverQueue.connection.dispatcher.streamTime / 60000);
      const currentDurationSeconds =
        Math.floor(
          (serverQueue.connection.dispatcher.streamTime % 60000) / 1000
        ) < 10
          ? `0${Math.floor(
            (serverQueue.connection.dispatcher.streamTime % 60000) / 1000
          )}`
          : Math.floor(
            (serverQueue.connection.dispatcher.streamTime % 60000) / 1000
          );

      const endDurationMinute =
        serverQueue.songs[0].duration.minutes < 10
          ? `0${serverQueue.songs[0].duration.minutes}`
          : serverQueue.songs[0].duration.minutes;
      const endDurationSeconds =
        serverQueue.songs[0].duration.seconds < 10
          ? `0${serverQueue.songs[0].duration.seconds}`
          : serverQueue.songs[0].duration.seconds;
          const a = serverQueue.songs[0].duration;

      const emb = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(
          message.author.tag,
          message.author.avatarURL()
        )
        .setTitle(serverQueue.songs[0].title)
        .setURL(serverQueue.songs[0].url)
        .setDescription(
          `▶ \`[${curentDurationMinute}:${currentDurationSeconds} - ${~~(a / 60) + ":" + a % 60}]\`🔊`
        );

      return message.channel.send("🎶 Actuellement jouer...", { embed: emb });
    } catch (e) {
      message.channel.send(`Erreur \`${e}\``);
    }

  }
}
