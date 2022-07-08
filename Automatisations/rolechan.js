'use strict';

const embedChose = {
    color: 0xffa600,
    title: 'Choisissez vos rôles !!!',
    description: `*Veuillez choisir vos rôles pour avoir accès aux fonctionnalités désirées.*`,
    thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/663888009737011220/967557362355417098/un11known.png',
    }
}

const row = {
    "components": [
        {
            "custom_id": "selectrole",
            "placeholder": "Sélectionnez vos rôles !!",
            "options": [
                {
                    "label": "Go muscu",
                    "value": "644677952243761165",
                    "description": "Vous êtes pratiquants de musculation",
                    "emoji": {
                        "name": "muscle1",
                        "id": "661179088836231181"
                    }
                },
                {
                    "label": "Street workout",
                    "value": "644677228952813578",
                    "description": "Vous pratiquez le street workout",
                    "emoji": {
                        "name": "ZYZZZZ",
                        "id": "890500353399869490"
                    }
                },
                {
                    "label": "Powerlifting",
                    "value": "979347679773622282",
                    "description": "Vous pratiquez le powerlifting",
                    "emoji": {
                        "name": "powerlifting",
                        "id": "979388455022899220"
                    }
                },
                {
                    "label": "Poids du corps",
                    "value": "644677788841803795",
                    "description": "Vous vous entrainez au poids de corps",
                    "emoji": {
                        "name": "DocW",
                        "id": "850756349561274458"
                    }
                },
                {
                    "label": "Home Gym",
                    "value": "690033929863823464",
                    "description": "Vous vous entrainez chez vous",
                    "emoji": {
                        "name": "🏠"
                    }
                },
                {
                    "label": "Perte de poids",
                    "value": "644684323227828225",
                    "description": "Vous désirez perdre du poids",
                    "emoji": {
                        "name": "🍎"
                    }
                },
                {
                    "label": "Prise de masse",
                    "value": "644684622961049600",
                    "description": "Vous désirez prendre du poids",
                    "emoji": {
                        "name": "pdm",
                        "id": "712376079205007432"
                    }
                },
                {
                    "label": "Basic fit",
                    "value": "645581043080101888",
                    "description": "Vous vous entrainez chez Basic Fit",
                    "emoji": {
                        "name": "BF",
                        "id": "850681161428762648"
                    }
                },
                {
                    "label": "Fitness Park",
                    "value": "645580445324541962",
                    "description": "Vous vous entrainez chez Fitness Park",
                    "emoji": {
                        "name": "FP",
                        "id": "850682303008210975"
                    }
                },
                {
                    "label": "Gaming",
                    "value": "768739250614173716",
                    "description": "Vous souhaitez participer aux soirées gaming",
                    "emoji": {
                        "name": "🎮"
                    }
                },
                {
                    "label": "Challenge surprise",
                    "value": "826810504381988874",
                    "description": "Vous souhaitez recevoir des défis sportifs",
                    "emoji": {
                        "name": "🎁"
                    }
                },
                {
                    "label": "Twitch RadioTigre",
                    "value": "876425455337619467",
                    "description": "Pour vous tenir au courant des Live de Radio Tigre",
                    "emoji": {
                        "name": "LogoEDT",
                        "id": "901498744976056381"
                    }
                },
                {
                    "label": "TikTok",
                    "value": "908373814952476673",
                    "description": "Pour suivre notre actualité Tik Tok",
                    "emoji": {
                        "name": "tiktok",
                        "id": "967547439743660042"
                    }
                },
                {
                    "label": "Actu réseaux",
                    "value": "967559456021958656",
                    "description": "Pour suivre l'actualité de tous nos réseaux",
                    "emoji": {
                        "name": "instagram",
                        "id": "967551299438641203"
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
    checkMessageRole: function (client) {
        let channelRole = client.channels.resolve('750724909780697198');
        channelRole.messages.fetch().then(messagePage => {
            messagePage.size < 1 ? channelRole.send({ embeds: [embedChose], components: [row] }) : null;
        })
    },

    // Adds or Removes role depending on the member already have it or not.
    giveRole: function (interaction, client) {
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
        let channelBotMemeSpam = client.channels.resolve('611864040699985931');
        interaction.guild.members.fetch(interaction.user.id).then(async (member) => {
            if (member.roles.cache.has(interaction.values[0])) {
                member.roles.remove(interaction.values[0]),
                channelBotMemeSpam.send({ content:`<@${interaction.user.id}>`, embeds: [embedRemove], ephemeral: true })
            }
            else {
                member.roles.add(interaction.values[0]),
                channelBotMemeSpam.send({ content:`<@${interaction.user.id}>`, embeds: [embedAdd], ephemeral: true })
            }
            await interaction.deferUpdate();
            await interaction.editReply({ embeds: [embedChose], components: [row] });
        })
    }
}