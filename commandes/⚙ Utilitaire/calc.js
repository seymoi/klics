const math = require('mathjs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: "calc",
    description: "Comme une calculatrice.",
    usage: `<calcul>`,
    category: "⚙ Utilitaire",
    accessableby: "",
    aliases: [],
    exemple: `calc 8x5`
  },
  run: async (bot, message, args, client) => {
    try {
      if (!args[0]) return message.channel.send({
        embed: {
          "description": "Entrer un calcule et attendez que j'y réponde!",
          "color": 0xff2222
        }
      })

      let resp;
      try {
        resp = math.evaluate(args.join(' '));
      } catch (e) {
        return message.channel.send({
          embed: {
            "description": "Hum... je pense que je devrais y arriver",
            "color": 0xff2222
          }
        })
      }

      const embed = new MessageEmbed()
        .setColor(0xffffff)
        .setTitle('Resultat:')
        .addField('Calcul', `\`\`\`js\n${args.join(' ')}\`\`\``)
        .addField('Réponse', `\`\`\`js\n${resp}\`\`\``);
      message.channel.send(embed);
    } catch (err) {
      const erreurembed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`\`\`\`diff\n- Erreur -\n${err.message}\`\`\``)
        .setColor("RED")
        .setTimestamp()
      message.channel.send(erreurembed);
    };
  }
}