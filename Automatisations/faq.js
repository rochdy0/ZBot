const faqjson = require('../JSON/faq.json');

module.exports = {
    faq: function (Discord, client) {
        const rnd = Math.floor(Math.random() * 3);
        const Embed = new Discord.MessageEmbed()
        .setColor('#ffa600')
        .setTitle(faqjson[rnd]['titre'] + ' <:LogoEDT:901498744976056381>')
        .setDescription(faqjson[rnd]['description'])
        .setURL(faqjson[rnd]["lien"])
        .setThumbnail(faqjson[rnd]["image"])
    
        var target_chan = client.channels.resolve('820968843429150720');
        target_chan.send({ embeds: [Embed] }) 
    }
}
