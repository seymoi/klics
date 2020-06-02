const { MessageEmbed } = require("discord.js")
module.exports = {
    config: {
        name: "queue",
        description: "Permet de voir la playlist actuelle.",
        usage: ``,
        category: "🎶 Musique",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!serverQueue) return message.reply("Rien n'est jouer actuellement").catch(console.error);
      const musicqueueembed = new MessageEmbed()
      .setTitle("📃 Queue")
      .setColor("PURPLE")
      .setDescription(`${serverQueue.songs.map((song, index) => index + 1 + ". " + song.title).join("\n")}`)
      .addField("🎧 Actuellement jouer", `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
      .setTimestamp()
      .setFooter("Klic's")
      return message.reply(musicqueueembed)
        .catch(console.error);
    }
  };