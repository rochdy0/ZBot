'use strict';

const articleJSON = require('../JSON/articles.json');
const rnd = Math.floor(Math.random() * articleJSON.length);
const embed = {
    color: 0xffa600,
    title: 'Avez-vous lu cet article sur notre site ? <:LogoEDT:901498744976056381>',
    url: articleJSON[rnd]["lien"],
    description: `**${articleJSON[rnd]["titre"]}** \nVenez vite lire notre article afin d'en apprendre plus !!!`,
    thumbnail: {
        url: articleJSON[rnd]["image"]
    }
}

module.exports = {
    // Sends the embed and component to the channel.
    article: function (client) {
        client.channels.resolve('820968843429150720').send({ embeds: [embed] }) 
    }
}