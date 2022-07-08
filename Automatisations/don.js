'use strict';

const row = {
    "type": 1,
    "components": [
        {
            "type": 2,
            "url": 'https://www.paypal.com/paypalme/ecoledutigre',
            "label": 'Soutenir ❤️',
            "style": 5
        }
    ]
}
const embed = {
    color: 0xffa600,
    description: "**L'Ecole du Tigre** s'efforce de proposer un service **bénévole**, pour autant, afin d'atteindre nos ambitions nous avons besoin de votre soutien. \nSi vous le pouvez, n'hésitez pas à nous soutenir **via Paypal**. Un rôle <@&678660325494751242> sera décerné à tous les participants. \nMerci d'avance❤️"
}

module.exports = {
    // Sends the embed and component to the channel.
    don: function (client, chan) {
        client.channels.resolve(chan).send({ embeds: [embed], components:[row] }) 
    }
}