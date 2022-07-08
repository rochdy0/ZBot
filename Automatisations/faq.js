'use strict';

const faqJSON = require('../JSON/faq.json');
const rnd = Math.floor(Math.random() * 3);
const embed = {
    color: 0xffa600,
    title: `${faqJSON[rnd]['titre']} <:LogoEDT:901498744976056381>`,
    url: faqJSON[rnd]["lien"],
    description: faqJSON[rnd]['description'],
    thumbnail: {
        url: faqJSON[rnd]["image"]
    }
}

module.exports = {
    // Sends the embed to the channel.
    faq: function (client) {
        client.channels.resolve('820968843429150720').send({ embeds: [embed] }) 
    }
}