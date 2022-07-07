const Discord = require('discord.js')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');


const Embed = new Discord.MessageEmbed()
Embed.setThumbnail('https://cdn.discordapp.com/attachments/642859384002576395/969303911666176051/carte-regions-francaises.png')
Embed.setColor('#ffa600')
Embed.setTitle('Choisissez votre région !!!')
Embed.setDescription(`*Afin de favoriser les échanges IRL et les entraînements ensemble, vous trouverez ci-dessous une liste de régions. L'occasion de découvrir quels tigres s'entraînent près de chez vous !*`)

const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('selectloca')
            .setPlaceholder('Sélectionnez votre région !!')
            .addOptions([
                {
                    label: 'Auvergne',
                    value: '968925128199131226',
                    emoji: '<:logoauvergnerhonealpes:969391075812843530>'
                },
                {
                    label: 'Rhône-Alpes',
                    value: '968924971256655942',
                    emoji: '<:logoauvergnerhonealpes:969391075812843530>'
                },
                {
                    label: 'Bourgogne',
                    value: '968925793122123816',
                    emoji: '<:logobourgognefranchecomte:969297016897290244>'
                },
                {
                    label: 'Franche-Compté',
                    value: '968925923594354729',
                    emoji: '<:logobourgognefranchecomte:969297016897290244>'
                },
                {
                    label: 'Bretagne',
                    value: '968923522632130591',
                    emoji: '<:logobretagne:969391117495848971>'
                },
                {
                    label: 'Centre',
                    value: '968925607943602296',
                    emoji: '<:logocentrevaldeloire:969391153260667010>'
                },
                {
                    label: 'Corse',
                    value: '968926443188920350',
                    emoji: '<:logocorse:969391177218539541>'
                },
                {
                    label: 'Alsace',
                    value: '968926063822532618',
                    emoji: '<:logograndest:969297069699379370>'
                },
                {
                    label: 'Champagne-Ardenne',
                    value: '968926719811666010',
                    emoji: '<:logograndest:969297069699379370>'
                },
                {
                    label: 'Lorraine',
                    value: '968926173948170310',
                    emoji: '<:logograndest:969297069699379370>'
                },
                {
                    label: 'Nord Pas de Calais',
                    value: '968921954688041000',
                    emoji: '<:logohautsdefrance:969391204678643783>'
                },
                {
                    label: 'Picardie',
                    value: '968922747247939584',
                    emoji: '<:logohautsdefrance:969391204678643783>'
                },
                {
                    label: 'Ile-De-France',
                    value: '968926295335510077',
                    emoji: '<:logoiledefrance:969391233522892810>'
                },
                {
                    label: 'Basse Normandie',
                    value: '968923063469080576',
                    emoji: '<:logonormandie:969391270130761768>'
                },
                {
                    label: 'Haute Normandie',
                    value: '968922880341573662',
                    emoji: '<:logonormandie:969391270130761768>'
                },
                {
                    label: 'Aquitaine',
                    value: '968923987583303720',
                    emoji: '<:logonouvelleaquitaine:969391300568821820>'
                },
                {
                    label: 'Limousin',
                    value: '968925296680116295',
                    emoji: '<:logonouvelleaquitaine:969391300568821820>'
                },
                {
                    label: 'Poitou-Charentes',
                    value: '968923841218899981',
                    emoji: '<:logonouvelleaquitaine:969391300568821820>'
                },
                {
                    label: 'Languedoc-Rousillon',
                    value: '968924625297883147',
                    emoji: '<:logooccitanie:969391326187634758>'
                },
                {
                    label: 'Midi-Pyrénés',
                    value: '968924468279914516',
                    emoji: '<:logooccitanie:969391326187634758>'
                },
                {
                    label: 'Pays de la Loire',
                    value: '968923695391342682',
                    emoji: '<:logopaysdelaloire:969391357393252372>'
                },
                {
                    label: 'Provence-Alpes-Côte-d\'Azur',
                    value: '968924773864312852',
                    emoji: '<:logoprovencealpescotedazur:969391387550310470>'
                },
                {
                    label: 'Autre',
                    value: '968926572604178492',
                    emoji: '🌎'
                }
            ]))



module.exports = {
    checkloca: function (client) {
        let rolechan = client.channels.resolve('857312497089118218');
        rolechan.messages.fetch().then(messagePage => {
            if (messagePage.size < 1) {
                const Embed1 = new Discord.MessageEmbed()
                Embed1.setThumbnail('https://cdn.discordapp.com/attachments/663888009737011220/967557362355417098/un11known.png')
                Embed1.setColor('#ECDC18')
                Embed1.setTitle('⚠️ Attention aux rencontres que vous faites. ⚠️')
                Embed1.setDescription(`
*Le passage du virtuel au réel comporte ses risques.* 
**Si vous êtes mineurs, demandez l'accord de vos parents.** 
 *Informez toujours un proche de vos plans !

Bon training à ceux qui vont se voir !*
                `)
                rolechan.send({ embeds: [Embed1]})
                rolechan.send({ embeds: [Embed], components: [row] })
            }
        })
    },

    giveloca: function (interaction, client) {
        let role = ["968925128199131226", "968924971256655942", "968925793122123816", "968925923594354729", "968923522632130591", "968925607943602296", "968926443188920350", "968926063822532618", "968926719811666010", "968926173948170310", "968921954688041000", "968922747247939584", "968926295335510077", "968926295335510077", "968923063469080576", "968922880341573662", "968923987583303720", "968925296680116295", "968923841218899981", "968924625297883147", "968924468279914516", "968923695391342682", "968924773864312852", "968926572604178492"]
        let cpt = 0;
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
                await interaction.deferUpdate();
                await interaction.editReply({ embeds: [Embed], components: [row] });
            }
            else {
                for (let i = 0; i < role.length; i++) {
                    if (member.roles.cache.has(role[i])) cpt++;
                }
                if (cpt >= 3) {
                    const Embed2 = new Discord.MessageEmbed()
                    Embed2.setTitle('❌ Impossible d\'ajouter une nouvelle région ❌')
                    Embed2.setDescription(`*Vous avez déjà sélectionné 3 régions, veuillez enlever une région afin d'en ajouter une nouvelle.*`)
                    Embed2.setColor('#BC1F1A')
                    await interaction.reply({ embeds: [Embed2], ephemeral: true });
                }
                else {
                    member.roles.add(interaction.values[0]);
                    const Embed3 = new Discord.MessageEmbed()
                    Embed3.setTitle('Rôle ajouté')
                    Embed3.setDescription(`*Vous venez de vous rajouter le rôle <@&${interaction.values[0]}>*`)
                    Embed3.setColor('#10CC38')
                    target_chan.send(`<@${interaction.user.id}>`)
                    target_chan.send({ embeds: [Embed3], ephemeral: true });
                    
                    await interaction.deferUpdate();
                    await interaction.editReply({ embeds: [Embed], components: [row] });
                }
            }
        })
    }
}
