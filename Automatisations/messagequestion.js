'use strict';

const messageQuestionJSON = require('../JSON/msgquestion.json')
const fs = require('fs');

// Sends a message to the channel with the appropriate embed.
function sendMessageQuestion(channel, channelName) {
    messageQuestionJSON[channelName] ? channel.messages.fetch(messageQuestionJSON[channelName]).then(msg => msg.delete()) : null
    const embed = {
        color: 0xffa600,
        title: 'Message Automatique',
    }
    embed.description = channelName !== 'vosmedias' ? '⚠️ Seuls les **coachs** et **approuvés** sont autorisés à répondre aux questions dans ce channel sous peine d\'une sanction ⚠️' : '⚠️ Pour rappel, ce salon sert uniquement à poster vos vidéos/photos à destination des réseaux sociaux de la communauté. Prière de ne pas discuter ici et de réagir via le salon <#610931002868498435> ⚠️';
    channel.send({ embeds: [embed] }).then(msg => {
        messageQuestionJSON[channelName] = msg.id;
        fs.writeFileSync('/home/raspberry/ZBot/JSON/msgquestion.json', JSON.stringify(messageQuestionJSON));
    })
};


module.exports = {
    // Checks if the last message is sent by the ZBot, use sendMessageQuestion if not.
    messageQuestion: function (client, channelName, channelId) {
        let targetChannel = client.channels.resolve(channelId);
        targetChannel.messages.fetch({ limit: 1 }).then(msg => {
            msg.first().id !== messageQuestionJSON[channelName] ? sendMessageQuestion(targetChannel, channelName) : null})
    }
}