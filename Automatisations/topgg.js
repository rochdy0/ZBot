'use strict';

const row = {
    "type": 1,
    "components": [
        {
            "type": 2,
            "url": 'https://top.gg/servers/610928463590981634/vote',
            "label": 'Aller voter',
            "style": 5
        }
    ]
}

const embed = {
    color: 0xffa600,
    description: "<:LogoEDT:901498744976056381> Un *vote* sur notre page **top.gg** est possible toutes les **12h** alors n'hésitez pas afin d'augmenter la *visibilité de notre serveur* <:peaky2:678665593490243635>"
}

module.exports = {
    // Sends the embed and component to the channel.
    topgg: function (client) {
    client.channels.resolve('820968843429150720').send({embeds: [embed], components: [row]})
    }
}