const { ownerid, prefix } = require("../../botconfig.json");

module.exports = async bot => {
    console.log(`${bot.user.username} est en ligne`)
    setInterval(function () {
        if (bot.guilds.cache.size > 1) {
            bot.user.setActivity(`${prefix}help • ${bot.guilds.cache.size} serveurs`, { type: "PLAYING" })
        } else {
            bot.user.setActivity(`${prefix}help • ${bot.guilds.cache.size} serveur`, { type: "PLAYING" })
        }
    }, 30000)
}