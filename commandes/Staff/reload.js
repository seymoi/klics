const { RichEmbed } = require("discord.js")
const { ownerid, prefix } = require("../../botconfig.json");
const { inspect } = require("util")

module.exports = {
    config: {
        name: "reload",
        description: "",
        accessableby: "Sey",
        category: "Staff",
        usage: `[message]`,
        aliases: [],
        exemple: ``
    },
    run: async (bot, message, args) => {
        //check if the user has the same id as the bot owner so only the owner of the bot can use this command
        if(message.author.id !== ownerid) return message.channel.send('Votre id ne correcpond pas a celle de sey');
        try {
        const cmd = args.join(' ').split(' | ')
        //check if there is a specified a folder to check
        if(!cmd[0]) return message.channel.send('Entrer un dossier.');
      
        //check if there is a specified a command name to reload
        if(!cmd[1]) return message.channel.send('Entrer une commande.');

        //set folder name and command name and convert them to lowercase
        let folderName = cmd[0].toLowerCase();
        let commandName = cmd[1].toLowerCase();

        //attempt to reload the command
        try {
            delete require.cache[require.resolve(`../${folderName}/${commandName}.js`)]; //

            bot.commands.delete(commandName);
            
            const req = require(`../${folderName}/${commandName}.js`);
            bot.commands.set(commandName, req);
        } catch (err){
            console.log(err); //log the error if it occurs

            //send a message to the channel asking the user if they typed the wrong command
            return message.channel.send(`Impossible de reload: \`${commandName}\``); //
        }

        //send a message to the channel if the command is successfully reloaded
        message.channel.send(`La commande \`${commandName}\` a été correctement reload.`);
    } catch (err) {
        message.channel.send(err.message)
    }
    },
}