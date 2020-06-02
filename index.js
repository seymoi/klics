const { Client, Collection } = require("discord.js");
const Discord = require("discord.js")
const { token, prefix } = require("./botconfig.json");
const { MessageEmbed } = require("discord.js")
const { redlight } = require("./couleurs.json");
const moment = require("moment");
const Enmap = require("enmap");
const bot = new Client();
const fs = require("fs");
const Util = require('util');
const Canvas = require("canvas")

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Je tente de charger : ${eventName}`);
    bot.on(eventName, event.bind(null, bot));
  });
});

bot.commands = new Enmap();
bot.queue = new Map();

fs.readdir("./commandes/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commandes/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Je tente de charger ${commandName}`);
    bot.commands.set(commandName, props);
  });
});


["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "commandes", "event"].forEach(x => require(`./handlers/${x}`)(bot));

fs.readdir("./commandes/", (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const props = require(`./commandes/${file}`);
    const commandName = file.split(".")[0];
    console.log(`Lancement de la commande ${commandName}`);
    bot.commands.set(commandName, props);
  });
});

// const applyText = (canvas, text) => {
// 	const ctx = canvas.getContext('2d');

// 	// Declare a base size of the font
// 	let fontSize = 70;

// 	do {
// 		// Assign the font to the context and decrement it so it can be measured again
// 		ctx.font = `${fontSize -= 10}px sans-serif`;
// 		// Compare pixel width of the text to the canvas minus the approximate avatar size
// 	} while (ctx.measureText(text).width > canvas.width - 300);

// 	// Return the result to use in the actual canvas
// 	return ctx.font;
// };

bot.on("guildMemberAdd", async member => {

  // const canvas = Canvas.createCanvas(700, 250);
	// const ctx = canvas.getContext('2d');

	// const background = await Canvas.loadImage('./assets/img/background.jpg');
	// ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// ctx.strokeStyle = '#74037b';
	// ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// ctx.font = '28px sans-serif';
	// ctx.fillStyle = '#ffffff';
	// ctx.fillText('Nouveau Membre,', canvas.width / 2.5, canvas.height / 3.5);

	// ctx.font = applyText(canvas, `${member.displayName}!`);
	// ctx.fillStyle = '#ffffff';
	// ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	// ctx.beginPath();
	// ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// ctx.closePath();
	// ctx.clip();

	// const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	// ctx.drawImage(avatar, 25, 25, 200, 200);

	// const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

  const guild = member.guild;
  let joinmsg = [
    `${member}(\`\`${member.id}\`\`) vient de rejoindre le serveur.`,
    `Quel est ce pokémon? C'est ${member}(\`\`${member.id}\`\`)!`,
    `${member}(\`\`${member.id}\`\`) nous fait une arrivée fracassante!`,
    `Un tonnerre d'applaudissements pour ${member}(\`\`${member.id}\`\`)!`,
    `Woa mais c'est ${member}(\`\`${member.id}\`\`) !!`,
    `${member}(\`\`${member.id}\`\`) vient juste d'arriver !`
  ]

  if (member.guild.id == "699986425944342619") {
    let msgjoin = joinmsg[Math.floor(Math.random() * joinmsg.length)];
    const timejoin = `[${moment().format("``HH:mm:ss``")}] `;
    if (guild.systemChannel) {
      guild.systemChannel.send(`${timejoin} 🛬 ${msgjoin}`)
      .then(member.roles.add("702243394029748264"));
    } else {
      guild.owner.send("Une personne vient de rejoindre votre serveur!")
        .catch(e => console.log("Les messages privés de cette utilisateur sont désactiver."))
    }
    // const memberRole = member.guild.roles.find(role => role.id == "702243394029748264");
    // member.addRole(memberRole).then(() => {
    //   console.log(" [ SERVEUR JOIN ] " + member.user.tag + " et à reçu le role Membre");
    // }).catch(console.log);
  }

});

bot.on("guildMemberRemove", member => {
  const guild = member.guild;
  let quitmsg = [
    `${member}(\`\`${member.id}\`\`) vient de quitter le serveur.`,
    `${member}(\`\`${member.id}\`\`) vient de sauter dans le vide.`,
    `${member}(\`\`${member.id}\`\`) nous fait perdre une personne!`,
    `${member}(\`\`${member.id}\`\`) s'en va!`,
    `Quel dommage ${member}(\`\`${member.id}\`\`) vient juste de partir.`
  ]
  if (member.guild.id == "699986425944342619") {
    let msgquit = quitmsg[Math.floor(Math.random() * quitmsg.length)];
    const timeleave = `[${moment().format("``HH:mm:ss``")}] `;
    if (guild.systemChannel) {
      guild.systemChannel.send(`${timeleave} 🛫 ${msgquit}`);
    } else {
      guild.owner.send("Une personne vient de quitter votre serveur!")
        .catch(e => console.log("Les messages privés de cette utilisateur sont désactiver."))
    }
  }

});


bot.on("guildCreate", guild => {
  const embed = new MessageEmbed()
    .setColor("GREEN")
    .setThumbnail(guild.iconURL())
    .setTitle(`Klic's vient de rejoindre un serveur.`)
    .addField("✏ Nom →", `➧ \`${guild.name}\``, true)
    .addField("👑 Propriétaire →", `➧ \`${guild.owner.user.username}#${guild.owner.user.discriminator}\``, true)
    .addField("📜 Informations →", `➧ \`${guild.members.cache.size}\` membres. \n➧ ID: \`${guild.id}\`.`)
    .addField("📁 Serveur →", `Numéro **n°${bot.guilds.cache.size}**`)
    .setTimestamp()
  bot.guilds.cache.find(x => x.id === "699986425944342619").channels.cache.find(x => x.name === "【📕】serveurs").send(embed)
  guild.owner.send("Merci de m'avoir ajouter a ton serveur ! \n > **Quelque informations importantes** → \n`Attention, il vous faut aussi un channel nommé \"logs\" sur votre serveur. (Cette option est en cours de changement!!)`\n Merci de votre compréhension. \n • Support → https://discord.gg/gdakXXE •")
});

bot.on("guildDelete", guild => {
  const embed = new MessageEmbed()
    .setColor("RED")
    .setThumbnail(guild.iconURL())
    .setTitle(`Klic's vient de perdre un serveur.`)
    .addField("✏ Nom →", `➧ \`${guild.name}\``, true)
    .addField("👑 Propriétaire →", `➧ \`${guild.owner.user.username}#${guild.owner.user.discriminator}\``, true)
    .addField("📜 Informations →", `➧ \`${guild.members.cache.size}\` membres. \n➧ ID: \`${guild.id}\`.`)
    .addField("📁 Serveur →", `Numéro **n°${bot.guilds.cache.size + 1}**`)
    .setTimestamp()
  bot.guilds.cache.find(x => x.id === "699986425944342619").channels.cache.find(x => x.name === "【📕】serveurs").send(embed)
});

bot.login(token);