const { MessageEmbed } = require('discord.js');

const eightBallResponses = ['Oui', 'Non', 'Certainement', 'Mon petit doigt me dit.... OUI', 'Essai plus tard', "J'ai un doute....", 'Je ne pense pas pouvoir te répondre', "Je ne pense pas", "Bien sûr", "Hummm..."]

module.exports = {
	config: {
		name: "8ball",
		description: "Posez lui une question, il vous répondra",
		usage: `[question]`,
		category: "🎈 Fun",
		accessableby: "",
		aliases: [],
		exemple: `8ball Est ce que Sey va bien ?`
	},
	run: async (bot, message, args) => {
		try {
			var question = args.join(' ');
			var answers = await eightBallResponses;
			if (!question.endsWith('?')) return message.reply("Veuillez posez une question.");
			var a = Math.floor(Math.random() * answers.length);
			let ballembed = new MessageEmbed()
				.setAuthor(`${message.guild.name}`, message.guild.iconURL)
				.setColor("#2ac075")
				.addField("Question:", question)
				.addField("Réponse:", answers[a])
				.setFooter(message.author.tag);
			message.channel.send(ballembed);
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