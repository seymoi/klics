const ms = require('ms')
const{MessageEmbed}=require('discord.js')
const{Timers}=require('../../variable')

module.exports = {
    config: {
        name: "timer",
        description: "un timer ",
        usage: `<#d/h/m>`,
        category: "⚙ Utilitaire",
        accessableby: "",
        aliases: [],
        exemple: "timer 1d 2h 5s"
    },
    run:async(bot,message,args)=>{
        if(!args[0]){
            return message.channel.send(`Vous devez entrer un temps (exemple 1h = 1 heure)`)
        }
        if(!args[0].endsWith("d")){
            if(!args[0].endsWith("h")){
                if(!args[0].endsWith("m")){
                    return message.channel.send(`<#d/h/m>`)
                }
            }
        }
        if(isNaN(args[0][0])){
            return message.channel.send(`C'est pas un nombre`)
        }
        Timers.set(message.author.id+" G "+message.guild.name,{
            Guild:message.guild.name,
            Author:{
                Tag:message.author.tag,
                ID:message.author.id
            },
            Time:ms(args[0])
        })
        message.channel.send(`${message.author.tag} Votre timer est de ${args[0]} (${ms(args[0])}MS)`)
        setTimeout(() => {
            let Embed = new MessageEmbed()
            .setTitle(`Timer finished in guild ${message.guild.name}..`)
            .setDescription(`Votre timer de ${args[0]} (${ms(args[0])}MS) est fini`)
            .setColor(`GREEN`)
            message.author.send(Embed)
            Timers.delete(message.author.id+" G "+message.guild.name)
        }, ms(args[0]));
    }
}