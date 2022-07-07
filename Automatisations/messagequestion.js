const Discord = require('discord.js')
const msgquestion = require('../JSON/msgquestion.json')
const fs = require('fs');

function send(channel, chan)
{
    msgquestion[chan] ? channel.messages.fetch(msgquestion[chan]).then(msg => msg.delete()) : null
    

    const Embed = new Discord.MessageEmbed()
        .setColor('#ffa600')
        .setTitle('Message Automatique')
    chan != 'vosmedias' ? Embed.setDescription('⚠️ Seuls les **coachs** et **approuvés** sont autorisés à répondre aux questions dans ce channel sous peine d\'une sanction ⚠️') : Embed.setDescription('⚠️ Pour rappel, ce salon sert uniquement à poster vos vidéos/photos à destination des réseaux sociaux de la communauté. Prière de ne pas discuter ici et de réagir via le salon <#610931002868498435> ⚠️');
    channel.send({ embeds: [Embed] }).then(msg => {
        msgquestion[chan] = msg.id;
        let data = JSON.stringify(msgquestion);
        fs.writeFileSync('/home/raspberry/ZBot/JSON/msgquestion.json', data);
    })
}


module.exports = {
    messagequestion: async function (client, chan, chanId) {
        var target_chan = client.channels.resolve(chanId);
        target_chan.messages.fetch({ limit: 1 }).then(msg => {
            msg.first().id != msgquestion[chan] ? send(target_chan, chan, chanId) : null})
    }
}