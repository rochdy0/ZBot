const { MessageActionRow, MessageSelectMenu } = require('discord.js');



const embedChose = {
    color: 0xffa600,
    title: 'Choisissez votre région !!!',
    description: '*Afin de favoriser les échanges IRL et les entraînements ensemble, vous trouverez ci-dessous une liste de régions. L\'occasion de découvrir quels tigres s\'entraînent près de chez vous !*',
    thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/642859384002576395/969303911666176051/carte-regions-francaises.png',
    }
}
const embedChoseWarn = {
    color: 0xECDC18,
    title: '⚠️ Attention aux rencontres que vous faites. ⚠️',
    description: 
    `*Le passage du virtuel au réel comporte ses risques.* 
    **Si vous êtes mineurs, demandez l'accord de vos parents.** 
    *Informez toujours un proche de vos plans !
    
    Bon training à ceux qui vont se voir !*`,
    thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/663888009737011220/967557362355417098/un11known.png',
    }
}


const row = {
    "components": [
        {
            "custom_id": "selectloca",
            "placeholder": "Sélectionnez votre région !!",
            "options": [
                {
                    "label": "Auvergne",
                    "value": "968925128199131226",
                    "emoji": {
                        "name": "logoauvergnerhonealpes",
                        "id": "969391075812843530"
                    }
                },
                {
                    "label": "Rhône-Alpes",
                    "value": "968924971256655942",
                    "emoji": {
                        "name": "logoauvergnerhonealpes",
                        "id": "969391075812843530"
                    }
                },
                {
                    "label": "Bourgogne",
                    "value": "968925793122123816",
                    "emoji": {
                        "name": "logobourgognefranchecomte",
                        "id": "969297016897290244"
                    }
                },
                {
                    "label": "Franche-Compté",
                    "value": "968925923594354729",
                    "emoji": {
                        "name": "logobourgognefranchecomte",
                        "id": "969297016897290244"
                    }
                },
                {
                    "label": "Bretagne",
                    "value": "968923522632130591",
                    "emoji": {
                        "name": "logobretagne",
                        "id": "969391117495848971"
                    }
                },
                {
                    "label": "Centre",
                    "value": "968925607943602296",
                    "emoji": {
                        "name": "logocentrevaldeloire",
                        "id": "969391153260667010"
                    }
                },
                {
                    "label": "Corse",
                    "value": "968926443188920350",
                    "emoji": {
                        "name": "logocorse",
                        "id": "969391177218539541"
                    }
                },
                {
                    "label": "Alsace",
                    "value": "968926063822532618",
                    "emoji": {
                        "name": "logograndest",
                        "id": "969297069699379370"
                    }
                },
                {
                    "label": "Champagne-Ardenne",
                    "value": "968926719811666010",
                    "emoji": {
                        "name": "logograndest",
                        "id": "969297069699379370"
                    }
                },
                {
                    "label": "Lorraine",
                    "value": "968926173948170310",
                    "emoji": {
                        "name": "logograndest",
                        "id": "969297069699379370"
                    }
                },
                {
                    "label": "Nord Pas de Calais",
                    "value": "968921954688041000",
                    "emoji": {
                        "name": "logohautsdefrance",
                        "id": "969391204678643783"
                    }
                },
                {
                    "label": "Picardie",
                    "value": "968922747247939584",
                    "emoji": {
                        "name": "logohautsdefrance",
                        "id": "969391204678643783"
                    }
                },
                {
                    "label": "Ile-De-France",
                    "value": "968926295335510077",
                    "emoji": {
                        "name": "logoiledefrance",
                        "id": "969391233522892810"
                    }
                },
                {
                    "label": "Basse Normandie",
                    "value": "968923063469080576",
                    "emoji": {
                        "name": "logonormandie",
                        "id": "969391270130761768"
                    }
                },
                {
                    "label": "Haute Normandie",
                    "value": "968922880341573662",
                    "emoji": {
                        "name": "logonormandie",
                        "id": "969391270130761768"
                    }
                },
                {
                    "label": "Aquitaine",
                    "value": "968923987583303720",
                    "emoji": {
                        "name": "logonouvelleaquitaine",
                        "id": "969391300568821820"
                    }
                },
                {
                    "label": "Limousin",
                    "value": "968925296680116295",
                    "emoji": {
                        "name": "logonouvelleaquitaine",
                        "id": "969391300568821820"
                    }
                },
                {
                    "label": "Poitou-Charentes",
                    "value": "968923841218899981",
                    "emoji": {
                        "name": "logonouvelleaquitaine",
                        "id": "969391300568821820"
                    }
                },
                {
                    "label": "Languedoc-Rousillon",
                    "value": "968924625297883147",
                    "emoji": {
                        "name": "logooccitanie",
                        "id": "969391326187634758"
                    }
                },
                {
                    "label": "Midi-Pyrénés",
                    "value": "968924468279914516",
                    "emoji": {
                        "name": "logooccitanie",
                        "id": "969391326187634758"
                    }
                },
                {
                    "label": "Pays de la Loire",
                    "value": "968923695391342682",
                    "emoji": {
                        "name": "logopaysdelaloire",
                        "id": "969391357393252372"
                    }
                },
                {
                    "label": "Provence-Alpes-Côte-d'Azur",
                    "value": "968924773864312852",
                    "emoji": {
                        "name": "logoprovencealpescotedazur",
                        "id": "969391387550310470"
                    }
                },
                {
                    "label": "Autre",
                    "value": "968926572604178492",
                    "emoji": {
                        "name": "🌎"
                    }
                }
            ],
            "type": 3
        }
    ],
    "type": 1
}



module.exports = {
    // Checks if a message already exist, sends a new one if not.
    checkMessageLoca: function (client) {
        let channelLoca = client.channels.resolve('857312497089118218');
        channelLoca.messages.fetch().then(messagePage => {
            messagePage.size < 1 ? channelLoca.send({ embeds: [embedChoseWarn, embedChose], components: [row]}) : null
        })
    },

    // Adds or Removes role depending on the member already have it or not. If the member have 3 roles, send an error.
    giveLoca: function (interaction, client) {
        const embedAdd = {
            color: 0x10CC38,
            title: 'Rôle ajouté',
            description: `*Vous venez de vous rajouter le rôle <@&${interaction.values[0]}>*`
        }
        const embedRemove = {
            color: 0x10CC38,
            title: 'Rôle supprimé',
            description: `*Vous venez de vous enlever le rôle <@&${interaction.values[0]}>*`
        }
        const embedError = {
            color: 0x10CC38,
            title: '❌ Impossible d\'ajouter une nouvelle région ❌',
            description: `*Vous avez déjà sélectionné 3 régions, veuillez enlever une région afin d'en ajouter une nouvelle.*`
        }
        let role = ["968925128199131226", "968924971256655942", "968925793122123816", "968925923594354729", "968923522632130591", "968925607943602296", "968926443188920350", "968926063822532618", "968926719811666010", "968926173948170310", "968921954688041000", "968922747247939584", "968926295335510077", "968926295335510077", "968923063469080576", "968922880341573662", "968923987583303720", "968925296680116295", "968923841218899981", "968924625297883147", "968924468279914516", "968923695391342682", "968924773864312852", "968926572604178492"]
        let cpt = 0;
        var channelBotMemeSpam = client.channels.resolve('611864040699985931');
        interaction.guild.members.fetch(interaction.user.id).then(async (member) => {
            if (member.roles.cache.has(interaction.values[0])) {
                member.roles.remove(interaction.values[0])
                channelBotMemeSpam.send({ content: `<@${interaction.user.id}>`, embeds: [embedRemove], ephemeral: true });
                await interaction.deferUpdate();
                await interaction.editReply({ embeds: [embedChoseWarn, embedChose], components: [row] });
            }
            else {
                for (let i = 0; i < role.length; i++) {
                    if (member.roles.cache.has(role[i])) cpt++;
                }
                if (cpt >= 3) {
                    await interaction.reply({ embeds: [embedError], ephemeral: true });
                }
                else {
                    member.roles.add(interaction.values[0]);
                    channelBotMemeSpam.send({ content: `<@${interaction.user.id}>`, embeds: [embedAdd], ephemeral: true });
                    await interaction.deferUpdate();
                    await interaction.editReply({ embeds: [embedChoseWarn, embedChose], components: [row] });
                }
            }
        })
    }
}
