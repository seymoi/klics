const Genius = new require("genius-lyrics");
const G = new Genius.Client("U3lct_PRnDXRFEjfk8hTYcQfkWCw4UyFtvcsOs8fmZ8_yXMvnRAJt7Pb0Su_7LcI");
const { MessageEmbed } = require("discord.js")
module.exports = {
    config: {
        name: "lyrics",
        description: "Permet de montrer les parole de la chanson jouer",
        usage: ``,
        category: "🎶 Musique",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {

        const { channel } = message.member.voice;
        if (!channel) {
            return message.channel.send("Vous devez être dans un channel vocal. :/");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.channel.send("Rien n'est jouer");
        }

        let m = await message.channel.send("recherche des paroles.")

        G.tracks.search(serverQueue.songs[0].title)
            .then(results => {
                const song = results[0];
                song.lyrics()
                    .then(lyrics => {
                        if (lyrics.length > 4095) {
                            return message.channel.send("Les paroles sont trop longues")
                        }

                        if (lyrics.length < 2048) {
                            const lyricsEmbed = new MessageEmbed()
                                .setTitle(serverQueue.songs[0].title)
                                .setColor("GREEN")
                                .setDescription(lyrics.trim());
                            return m.edit(lyricsEmbed);
                        }
                        m.delete()

                    })
            }).catch(err => message.channel.send("Lyric's introuvable."));


    }
}