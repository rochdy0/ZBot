const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const Discord = require('discord.js')


const Embed = new Discord.MessageEmbed()

let DEJ;

let userid;

const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('bk2')
            .setPlaceholder('Sélectionnez ')
            .addOptions([
                {
                    label: 'Sèche',
                    description: 'Vous désirez faire une sèche afin de perdre du gras',
                    value: 'seche',
                    emoji: '🍎'
                },
                {
                    label: 'Maintien',
                    description: 'Vous désirez vous maintenir à votre poids actuel',
                    value: 'maintien',
                    emoji: '🍳'
                },
                {
                    label: 'Prise de masse',
                    description: 'Vous désirez prendre du muscle en augmentant votre poids',
                    value: 'pdm',
                    emoji: '🍖'
                }]));



module.exports = {
    data: {
		"name" : 'bk',
		"type" : 1,
		"description" : 'Permet de calculer les besoins caloriques',
		"options" : [
			{
				"name":'sexe',
				"type":3,
				"description":'Saisissez votre sexe :',
                "choices": [
                    {
                        "name": "Homme",
                        "value": "H"
                    },
                    {
                        "name": "Femme",
                        "value": "F"
                    }
                ],
                "required": true
			},
            {
				"name":'poids',
				"type":4,
				"description":'Saisissez votre Poids en Kg :',
                "required": true
			},
            {
				"name":'taille',
				"type":4,
				"description":'Saisissez votre Taille en Centimètres :',
                "required": true
			},
            {
				"name":'age',
				"type":4,
				"description":'Saisissez votre Age :',
                "required": true
			},
            {
				"name":'nap',
				"type":3,
				"description":'Saisissez votre Niveau d`Activié Physique Journalier en dehors du Sport :',
                "choices": [
                    {
                        "name": "Sédentaire",
                        "value": "S"
                    },
                    {
                        "name": "Peu actif",
                        "value": "P"
                    },
                    {
                        "name": "Actif",
                        "value": "A"
                    },
                    {
                        "name": "Très actif",
                        "value": "T"
                    }
                ],
                "required": true
			},
            {
				"name":'temps',
				"type":4,
				"description":'Saisissez votre temps d\'entraînement journalier en minute :',
                "required": true
			},
            {
				"name":'tef',
				"type":4,
				"description":'Saisissez votre TEF, entre 10 et 25. 10 : alimentation transformée, 25 alimentation saine :',
                "required": true
			}
		]
	},


    bk: function (interaction) {

        diconap = {
            "S": {
                "H": 1,
                "F": 1
            },
            "P": {
                "H": 1.11,
                "F": 1.12
            },
            "A": {
                "H": 1.25,
                "F": 1.27
            },
            "T": {
                "H": 1.48,
                "F": 1.45
            }
        }

        let sexe = interaction.options["_hoistedOptions"][0].value
        let poids = interaction.options["_hoistedOptions"][1].value
        let taille = (interaction.options["_hoistedOptions"][2].value) / 100
        let age = interaction.options["_hoistedOptions"][3].value
        let NAP = diconap[interaction.options["_hoistedOptions"][4].value][sexe]
        let RTEE = (0.1 * poids) * (interaction.options["_hoistedOptions"][5].value / 2)
        let TEF = 1 + (interaction.options["_hoistedOptions"][6].value / 100)
        let TMB = 0
        if (sexe == "H") TMB = (13.707 * poids) + (492.3 * taille) - (6.673 * age) + 77.0607
        if (sexe == "F") TMB = (9.74 * poids) + (172.9 * taille) - (4.737 * age) + 667.051

        DEJ = Math.round(((TMB * NAP) + RTEE) * TEF)

        Embed.setThumbnail('https://cdn.discordapp.com/attachments/663888009737011220/967557362355417098/un11known.png')
        Embed.setColor('#ffa600')
        Embed.setTitle('Besoin calorique journalier')
        Embed.setDescription('Veuillez choisir un champ.')
        userid = interaction.user.id;
        interaction.reply({ embeds: [Embed], components: [row] })
    },

    bk2: async function (interaction) {
            if (interaction.user.id == userid) {
                if (interaction.values[0] == 'seche') {
                    Embed.setTitle(`*🍎Tes besoins caloriques pour une __sèche__ sont de :* __**${Math.round(DEJ*0.95)}**__ à __**${Math.round(DEJ*0.8)}**__ **± 100 kcal** *(5% à 20% selon la sèche)*`);
                    Embed.setDescription(`La "sèche" destinée à créer un déficit calorique et éliminer un maximum de masse graisseuse tout en conservant un maximum de masse musculaire. Cette période est définie dans le temps et ne perdure pas ad vitam eternam.`); 
                }
                if (interaction.values[0] == 'maintien') {
                    Embed.setTitle(`*🍳Tes besoins caloriques de __maintien__ sont de :* __**${DEJ}**__ **± 100 kcal**`);
                    Embed.setDescription(`Le "maintien" définit l'apport calorique pour lequel un individu ne prend ni ne perd de poids.`);
                }
                if (interaction.values[0] == 'pdm') {
                    Embed.setTitle(`*🍖Tes besoins caloriques pour une __prise de masse__ sont de :* __**${Math.round(DEJ*1.05)}**__ *à* __**${Math.round(DEJ*1.15)}**__ **± 100 kcal** *(5% à 15% selon la prise de masse)*`);
                    Embed.setDescription(`La "prise de masse" est destinée à créer un excédent calorique permettant de prendre du poids et créer davantage de masse musculaire. `); 
            }
                await interaction.deferUpdate();
                interaction.editReply({ embeds: [Embed], components: []})
            };
    }
}