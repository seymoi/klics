const weather = require('weather-js');
const { MessageEmbed } = require("discord.js");
const { prefix, ownerid } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "meteo",
    description: "Permet d'afficher la méteo.",
    usage: `${prefix}meteo [region]`,
    category: "ℹ Informations",
    accessableby: "",
    aliases: [],
    exemple: `meteo paris`
  },
  run: async (bot, message, args) => {
    try {
      weather.find({
        search: args.join(" "),
        degreeType: 'C'
      }, function(err, result) {
        if (err) console.log(err);
        if (result === undefined || result.lenght === 0) {
            const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor("RED")
            .setDescription("```diff\n- Erreur -\nVeuillez entrer une région, ou la région entrer est introuvable.```")
            .setTimestamp()
            message.channel.send(embed)
        }
        var current = result[0].current;
        var location = result[0].location;
        const embed = new MessageEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Météo pour ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor("GREEN")
          .addField('⏱Fuseau horaire', `UTC${location.timezone}`, true)
          .addField('Type de degré', location.degreetype, true)
          .addField('🌡Température', `${current.temperature} Degrés`, true)
          .addField('Resentit', `${current.feelslike} Degrés`, true)
          .addField('🌪Vents', current.winddisplay, true)
          .addField('💧Humidité', `${current.humidity}%`, true)
        message.channel.send({
          embed
        });
      })
    } catch (err) {
			const erreurembed = new MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL)
				.setDescription(`\`\`\`diff\n- Erreur -\n${err.message}\`\`\``)
				.setColor("RED")
				.setTimestamp()
			message.channel.send(erreurembed);
    }
  }
}