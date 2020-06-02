const { play } = require("../../systeme/play.js");
const { YOUTUBE_API_KEY } = require("../../botconfig.json");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
module.exports = {
    config: {
        name: "play",
        description: "Permet de jouer une musique.",
        usage: ``,
        category: "🎶 Musique",
        accessableby: "",
        aliases: [],
        exemple: ""
    },
    run: async (bot, message, args) => {
        const { channel } = message.member.voice;

        if (!args.length) return message.reply("Utilisation: <YouTube URL | nom>").catch(console.error);
        if (!channel) return message.reply("Vous devez rejoindre un channel vocal.").catch(console.error);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT"))
            return message.reply("Je n'est pas les permissions de rejoindre votre channel.");
        if (!permissions.has("SPEAK"))
            return message.reply("Je ne peux pas parler dans ce channel vocal.");

        const search = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
        const url = args[0];
        const urlValid = videoPattern.test(args[0]);

        // Start the playlist if playlist url was provided
        if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
            return message.client.commands.get("playlist").execute(message, args);
        }

        const serverQueue = message.client.queue.get(message.guild.id);
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        };

        let songInfo = null;
        let song = null;

        if (urlValid) {
            try {
                songInfo = await ytdl.getInfo(url);
                song = {
                    title: songInfo.title,
                    url: songInfo.video_url,
                    duration: songInfo.length_seconds,
                };
            } catch (error) {
                if (error.message.includes("copyright")) {
                    return message
                        .reply("⛔ Cette vidéo est copyright, elle ne peut donc être jouée. ⛔")
                        .catch(console.error);
                } else {
                    console.error(error);
                }
            }
        } else {
            try {
                const results = await youtube.searchVideos(search, 1);
                songInfo = await ytdl.getInfo(results[0].url);
                song = {
                    title: songInfo.title,
                    url: songInfo.video_url,
                    duration: songInfo.length_seconds,
                };
            } catch (error) {
                console.error(error);
            }
        }

        if (serverQueue) {
            serverQueue.songs.push(song);
            return serverQueue.textChannel
                .send(`✅ **${song.title}** a été ajoutée a la queue par ${message.author}`)
                .catch(console.error);
        } else {
            queueConstruct.songs.push(song);
        }

        if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

        if (!serverQueue) {
            try {
                queueConstruct.connection = await channel.join();
                play(queueConstruct.songs[0], message);
            } catch (error) {
                console.error(`Je ne peux pas rejoindre votre channel vocal: ${error}`);
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                return message.channel.send(`Je ne peux pas rejoindre votre channel vocal: ${error}`).catch(console.error);
            }
        }
    }
};