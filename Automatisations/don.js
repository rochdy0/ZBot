const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    don: function (Discord, client, chan) {

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL('https://www.paypal.com/paypalme/ecoledutigre')
                .setLabel('Soutenir ❤️')
                .setStyle('LINK'),
        );

        const Embed = new Discord.MessageEmbed()
        .setColor('#ffa600')
        .setDescription("**L'Ecole du Tigre** s'efforce de proposer un service **bénévole**, pour autant, afin d'atteindre nos ambitions nous avons besoin de votre soutien. \nSi vous le pouvez, n'hésitez pas à nous soutenir **via Paypal**. Un rôle <@&678660325494751242> sera décerné à tous les participants. \nMerci d'avance❤️")
        console.log(chan)
        let target_chan = client.channels.resolve(chan);
        target_chan.send({
            embeds: [Embed],
            components:[row]
        }) 
    }
}