var request = require('request');
let twitchId = require('./twitch.json');
const fs = require('fs');

module.exports = {
    // twtokenapp: function () {
    //     var options = {
    //         url: 'https://id.twitch.tv/oauth2/token?client_id=hgqt99iww5m60ujmpb3hxucclb2zjs&client_secret=776exomjw87dkfv2133zx38wh00aka&grant_type=client_credentials',
    //         method: 'POST'
    //     };

    //     function callback(error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             var body2 = JSON.parse(body);
    //             twitchId['App-Token'] = body2.access_token
    //             let data = JSON.stringify(twitchId);
    //             fs.writeFileSync('twitch.json', data);
    //             console.log(Date() + ' App Token Rafraichi')
    //         }
    //     }
    //     request(options, callback);
    // },
    twtoken: function () {
        var options = {
            url: 'https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=' + twitchId['Refresh-User-Token'] + '&client_id=' + twitchId['Client-Id'] + '&client_secret=' + twitchId['Client-Secret'],
            method: 'POST'
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var body2 = JSON.parse(body);
                twitchId['User-Token'] = body2.access_token
                twitchId['Refresh-User-Token'] = body2.refresh_token
                let data = JSON.stringify(twitchId);
                fs.writeFileSync('/home/raspberry/ZBot/Automatisations/twitch.json', data);
                console.log(Date() + ' Token Rafraichi')
            }
            
            else 
            {
                console.log('Err twtoken : ')
                console.log(error)
            }
        }
        request(options, callback);
    },
    twitchcount: function (client) {
        var headers = {
            'Authorization': 'Bearer '+ twitchId['User-Token'],
            'Client-Id': twitchId['Client-Id']
        };
        
        var options = {
            url: 'https://api.twitch.tv/helix/users/follows?to_id=150515266',
            headers: headers
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var body2 = JSON.parse(body);
                var target_chan = client.channels.resolve('922649198694920233');
                target_chan.setName(`🟣 Twitch : ${body2.total} Abos`)
            }
            else
            {
                console.log('Err twcount : ')
                console.log(error)
            }
        }
        
        request(options, callback);
    }
}