const { readdirSync } = require("fs")

module.exports = (bot) => {
  const load = dirs => {
    const commands = readdirSync(`./commandes/${dirs}/`).filter(d => d.endsWith('.js'));
    for (let file of commands) {
      let pull = require(`../commandes/${dirs}/${file}`);
      bot.commands.set(pull.config.name, pull);
      if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
    };
  };
  ["ℹ Informations", "⚙ Utilitaire", "🎈 Fun", "🛠 Modération", "Staff", "🔞NSFW", "🎶 Musique", "🔖 Ticket"].forEach(x => load(x));
};