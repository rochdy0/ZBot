const articlejson = require('../JSON/articles.json');

module.exports = {
    article: function (Discord, client) {
        const rnd = Math.floor(Math.random() * articlejson["articles"].length);
        const Embed = new Discord.MessageEmbed()
        .setColor('#ffa600')
        .setTitle('Avez-vous lu cet article sur notre site ? <:LogoEDT:901498744976056381>')
        .setDescription('**' + articlejson["articles"][rnd]["titre"] + '** \nVenez vite lire notre article afin d\'en apprendre plus !!!')
        .setURL(articlejson["articles"][rnd]["lien"])
        .setThumbnail(articlejson["articles"][rnd]["image"])
    
        var target_chan = client.channels.resolve('820968843429150720');
        target_chan.send({ embeds: [Embed] }) 
    }
}
