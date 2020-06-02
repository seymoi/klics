const { ownerid, prefix } = require("../../botconfig.json");
const { inspect } = require("util")

module.exports = {
    config: {
        name: "eval",
        description: "",
        accessableby: "Sey",
        category: "Staff",
        usage: `[valeur]`,
        aliases: [],
        exemple: ``
    },
    run: async (bot, message, args) => {
        if (message.author.id == ownerid) {
                    let evaled;
                    try {
                      evaled = await eval(args.join(' '));
                      message.channel.send(inspect(evaled));
                      console.log(inspect(evaled));
                    }
                    catch (error) {
                      console.error(error);
                      message.reply('Erreur.');
                    }  

              } else {
            return message.reply("Erreur → Votre id ne correspond pas a celle de Sey").then(msg => msg.delete(5000))
        }
    }
}