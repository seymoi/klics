const config = require("../../botconfig.json");
const fs = require("fs");

module.exports = async (bot, message) => {
    if (message.author.bot || message.channel.type === "dm") return;
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        }
    }

    let prefix = prefixes[message.guild.id].prefixes;
    const prefixMention = new RegExp(`^<@!?${bot.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.channel.send(`${message.author} Sur ce serveur mon prefix est **${prefix}**`).then(msg => msg.delete({ timeout: 10000, reason: 'Console.' }));
    }
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (commandfile) commandfile.run(bot, message, args)
}