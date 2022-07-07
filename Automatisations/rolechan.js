const Discord = require('discord.js')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');


const Embed = new Discord.MessageEmbed()
                Embed.setThumbnail('https://cdn.discordapp.com/attachments/663888009737011220/967557362355417098/un11known.png')
                Embed.setColor('#ffa600')
                Embed.setTitle('Choisissez vos rôles !!!')
                Embed.setDescription(`*Veuillez choisir vos rôles pour avoir accès aux fonctionnalités désirées.*`)

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('selectrole')
                            .setPlaceholder('Sélectionnez vos rôles !!')
                            .addOptions([
                                {
                                    label: 'Go muscu',
                                    description: 'Vous êtes pratiquants de musculation',
                                    value: '644677952243761165',
                                    emoji: '<:muscle1:661179088836231181>'
                                },
                                {
                                    label: 'Street workout',
                                    description: 'Vous pratiquez le street workout',
                                    value: '644677228952813578',
                                    emoji: '<:ZYZZZZ:890500353399869490>'
                                },
                                {
                                    label: 'Powerlifting',
                                    description: 'Vous pratiquez le powerlifting',
                                    value: '979347679773622282',
                                    emoji: '<:powerlifting:979388455022899220>'
                                },
                                {
                                    label: 'Poids du corps',
                                    description: 'Vous vous entrainez au poids de corps',
                                    value: '644677788841803795',
                                    emoji: '<:DocW:850756349561274458>'
                                },
                                {
                                    label: 'Home Gym',
                                    description: 'Vous vous entrainez chez vous',
                                    value: '690033929863823464',
                                    emoji: '🏠'
                                },
                                {
                                    label: 'Perte de poids',
                                    description: 'Vous désirez perdre du poids',
                                    value: '644684323227828225',
                                    emoji: '🍎'
                                },
                                {
                                    label: 'Prise de masse',
                                    description: 'Vous désirez prendre du poids',
                                    value: '644684622961049600',
                                    emoji: '<:pdm:712376079205007432>'
                                },
                                {
                                    label: 'Basic fit',
                                    description: 'Vous vous entrainez chez Basic Fit',
                                    value: '645581043080101888',
                                    emoji: '<:BF:850681161428762648>'
                                },
                                {
                                    label: 'Fitness Park',
                                    description: 'Vous vous entrainez chez Fitness Park',
                                    value: '645580445324541962',
                                    emoji: '<:FP:850682303008210975>'
                                },
                                {
                                    label: 'Gaming',
                                    description: 'Vous souhaitez participer aux soirées gaming',
                                    value: '768739250614173716',
                                    emoji: '🎮'
                                },
                                {
                                    label: 'Challenge surprise',
                                    description: 'Vous souhaitez recevoir des défis sportifs',
                                    value: '826810504381988874',
                                    emoji: '🎁'
                                },
                                {
                                    label: 'Twitch RadioTigre',
                                    description: 'Pour vous tenir au courant des Live de Radio Tigre',
                                    value: '876425455337619467',
                                    emoji: '<:LogoEDT:901498744976056381>'
                                },
                                {
                                    label: 'TikTok',
                                    description: 'Pour suivre notre actualité Tik Tok',
                                    value: '908373814952476673',
                                    emoji: '<:tiktok:967547439743660042>'
                                },
                                {
                                    label: 'Actu réseaux',
                                    description: 'Pour suivre l\'actualité de tous nos réseaux',
                                    value: '967559456021958656',
                                    emoji: '<:instagram:967551299438641203>'
                                }
                            ]))



module.exports = {    
    checkrole: function (client) {
        let rolechan = client.channels.resolve('750724909780697198');
        rolechan.messages.fetch().then(messagePage => {
            if (messagePage.size < 1) {
                rolechan.send({ embeds: [Embed], components: [row] })
            }
        })
    },

    giverole: function (interaction, client) {
        var target_chan = client.channels.resolve('611864040699985931');
        interaction.guild.members.fetch(interaction.user.id).then(async (member) => {
            if (member.roles.cache.has(interaction.values[0])) {
                member.roles.remove(interaction.values[0])
                const Embed3 = new Discord.MessageEmbed()
                Embed3.setTitle('Rôle supprimé')
                Embed3.setDescription(`*Vous venez de vous enlever le rôle <@&${interaction.values[0]}>*`)
                Embed3.setColor('#10CC38')

                target_chan.send(`<@${interaction.user.id}>`)
                target_chan.send({ embeds: [Embed3], ephemeral: true });
            }
            else
            {
                member.roles.add(interaction.values[0])
                const Embed3 = new Discord.MessageEmbed()
                Embed3.setTitle('Rôle ajouté')
                Embed3.setDescription(`*Vous venez de vous rajouter le rôle <@&${interaction.values[0]}>*`)
                Embed3.setColor('#10CC38')

                target_chan.send(`<@${interaction.user.id}>`)
                target_chan.send({ embeds: [Embed3], ephemeral: true });
            }
            await interaction.deferUpdate();
            await interaction.editReply({embeds: [Embed], components: [row]});
        })
    }
}