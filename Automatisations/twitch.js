'use strict';

const request = require('request');
const twitchIdJSON = require('../JSON/twitch.json');
const fs = require('fs');

module.exports = {
    // Refresh the twitch user token used for the twitch counter and the subscribers's twitch list.
    twitchToken: function () {
        let options = {
            url: `https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${twitchIdJSON['Refresh-User-Token']}&client_id=${twitchIdJSON['Client-Id']}&client_secret=${twitchIdJSON['Client-Secret']}`,
            method: 'POST'
        };
        request(options, function (error, response, body) {
            if(!error && response.statusCode == 200){
                body = JSON.parse(body)
                [twitchIdJSON['User-Token'], twitchIdJSON['Refresh-User-Token']] = [body.access_token, body.refresh_token]
                fs.writeFileSync('/home/raspberry/ZBot/JSON/twitch.json', JSON.stringify(twitchIdJSON))
                console.log(Date() + ' Token Rafraichi')
            }
            else console.log('Err twcount\n' + body);
        });
    },

    // Gets the number of twitch's followers using API Request and update Discord channel.
    twitchCounter: function (client) {
        let options = {
            url: 'https://api.twitch.tv/helix/users/follows?to_id=150515266',
            headers: {
                'Authorization': `Bearer ${twitchIdJSON['User-Token']}`,
                'Client-Id': twitchIdJSON['Client-Id']
            }
        };
        request(options, function (error, response, body) {
            !error && response.statusCode == 200 ? client.channels.resolve('922649198694920233').setName(`🟣 Twitch : ${JSON.parse(body).total} Abos`) : console.log('Err twcount\n' + body);
        });
    }
}