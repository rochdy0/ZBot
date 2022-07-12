const Discord = require('discord.js')
var request = require('request');
let twitchId = require('../JSON/twitch.json');

module.exports = {
    data: {
        "name": 'twsub',
        "type": 1,
        "description": 'Permet d\'obtenir la liste des personne ayant donné un sub sur notre chaîne twitch'
    },
    twsub: async function (interaction) {
        var headers = {
            'Authorization': 'Bearer ' + twitchId['User-Token'],
            'Client-Id': twitchId['Client-Id']
        };

        var options = {
            url: 'https://api.twitch.tv/helix/subscriptions?broadcaster_id=150515266',
            headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var body2 = JSON.parse(body);
                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setURL('https://www.twitch.tv/subs/radiotigre')
                        .setLabel('Soutenir la chaîne Twitch 🟣')
                        .setStyle('LINK'),
                );

                const Embed = new Discord.MessageEmbed()
                    .setColor('#9246ff')
                    .setTitle('Liste des Subs Twitch')
                    .setURL('https://www.twitch.tv/radiotigre')
                    .setThumbnail('https://blog.twitch.tv/assets/uploads/03-glitch.jpg')
                var strdesc = '__Nombre de Subs :__ ' + (body2.data.length - 1) + '\n\n'
                for (let step = 0; step < body2.data.length; step++) {
                    if (body2.data[step].user_name != 'RadioTigre') {
                        if (body2.data[step].is_gift == true) {
                            strdesc = strdesc + '***' + body2.data[step].user_name + '***' + ' Tier ' + body2.data[step].tier / 1000 + ' donné par ' + body2.data[step].gifter_name + '\n'
                        }
                        else {
                            strdesc = strdesc + '***' + body2.data[step].user_name + '***' + ' Tier ' + body2.data[step].tier / 1000 + '\n'
                        }
                    }
                }
                Embed.setDescription(strdesc)
                interaction.reply({ embeds: [Embed], components:[row] })
            }
            else console.log(`Err twsub : ${body}`)
        }
        request(options, callback);
    }
}