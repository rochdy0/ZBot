const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    topgg: function (Discord, client) {

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL('https://top.gg/servers/610928463590981634/vote')
                .setLabel('Aller voter')
                .setStyle('LINK'),
        );

        const Embed = new Discord.MessageEmbed()
        .setColor('#ffa600')
        .setDescription("<:LogoEDT:901498744976056381> Un *vote* sur notre page **top.gg** est possible toutes les **12h** alors n'hésitez pas afin d'augmenter la *visibilité de notre serveur* <:peaky2:678665593490243635>")

        var target_chan = client.channels.resolve('820968843429150720');
        target_chan.send({
            embeds: [Embed],
            components:[row]
        }) 
    }
}