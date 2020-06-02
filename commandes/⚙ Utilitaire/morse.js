const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "morse",
        description: "Permet de traduire un texte un morse ou de traduire du morse en texte.",
        usage: `<texte>`,
        category: "⚙ Utilitaire",
        accessableby: "",
        aliases: [],
        exemple: "morse Coucou ca va ?"
    },
    run: async (bot, message, args) => {
        try {
            let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
            morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
            text = args.join(" ").toUpperCase();
            if (!text) return message.channel.send("Veuillez entrer un message a traduire!")
        while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
            text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
        }
        if (text.startsWith(".") || text.startsWith("-")) {
            text = text.split(" ");
            let length = text.length;
            for (i = 0; i < length; i++) {
                text[i] = alpha[morse.indexOf(text[i])];
            }
            text = text.join("");
        } else {
            text = text.split("");
            let length = text.length;
            for (i = 0; i < length; i++) {
                text [i] = morse[alpha.indexOf(text[i])];
            }
            text = text.join(" ");
        }
        return message.channel.send("```"+text+"```");

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