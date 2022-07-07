const paginationEmbed = require('discordjs-button-pagination')
const Discord = require('discord.js')


module.exports = {
    data: {
        "name": 'loca',
        "type": 1,
        "description": 'Permet de voir les guerriers qui se trouvent dans la région désirée',
        "options": [
            {
                "name": 'région',
                "type": 3,
                "description": 'Saisissez la région souhaitée :',
                "required": true,
                "choices": [
                    {
                        "name": "Auvergne",
                        "value": "968925128199131226"
                    },
                    {
                        "name": "Rhône-Alpes",
                        "value": "968924971256655942"
                    },
                    {
                        "name": "Bourgogne",
                        "value": "968925793122123816"
                    },
                    {
                        "name": "Franche-Compté",
                        "value": "968925923594354729"
                    },
                    {
                        "name": "Bretagne",
                        "value": "968923522632130591"
                    },
                    {
                        "name": "Centre",
                        "value": "968925607943602296"
                    },
                    {
                        "name": "Corse",
                        "value": "968926443188920350"
                    },
                    {
                        "name": "Alsace",
                        "value": "968926063822532618"
                    },
                    {
                        "name": "Champagne-Ardenne",
                        "value": "968926719811666010"
                    },
                    {
                        "name": "Lorraine",
                        "value": "968926173948170310"
                    },
                    {
                        "name": "Nord Pas de Calais",
                        "value": "968921954688041000"
                    },
                    {
                        "name": "Picardie",
                        "value": "968922747247939584"
                    },
                    {
                        "name": "Ile-De-France",
                        "value": "968926295335510077"
                    },
                    {
                        "name": "Basse Normandie",
                        "value": "968923063469080576"
                    },
                    {
                        "name": "Haute Normandie",
                        "value": "968922880341573662"
                    },
                    {
                        "name": "Aquitaine",
                        "value": "968923987583303720"
                    },
                    {
                        "name": "Limousin",
                        "value": "968925296680116295"
                    },
                    {
                        "name": "Poitou-Charentes",
                        "value": "968923841218899981"
                    },
                    {
                        "name": "Languedoc-Rousillon",
                        "value": "968924625297883147"
                    },
                    {
                        "name": "Midi-Pyrénés",
                        "value": "968924468279914516"
                    },
                    {
                        "name": "Pays de la Loire",
                        "value": "968923695391342682"
                    },
                    {
                        "name": "Provence-Alpes-Côte-d\'Azur",
                        "value": "968924773864312852"
                    },
                    {
                        "name": "Autre",
                        "value": "968926572604178492"
                    }
                ],
            }
        ]
    },
    loca: async function (interaction) {
        await interaction.guild.members.fetch()
        interaction.guild.roles.fetch(interaction.options._hoistedOptions[0].value).then(role => {
            let nb = 0
            let pseudo = []
            let id = []
            const page = []
            role.members.map(m => { nb = nb + 1; 
                pseudo.push(m.user.username); id.push(m.user.id) })
            for (let i = 0; i < (nb / 10); i++) {
                let description = ""
                if (pseudo.length < 10) {
                    for (let j = 0; j < pseudo.length; j++) { description = description + pseudo[j] + ' : <@' + id[j] + '>' + '\n' }
                }
                else {
                    for (let j = 0; j < 10; j++) { description = description + pseudo[j] + ' : <@' + id[j] + '>' + '\n' }
                    pseudo.splice(0, 10);
                    id.splice(0, 10);
                }
                let det
                if (RegExp(`^(a|e|i|o|u|y)`, 'mi').test(role.name)) det = ' d\''
                else det = ' de '

                const Embed = new Discord.MessageEmbed()
                    .setTitle("Liste des Tigres" + det + role.name)
                    .setDescription(description)
                    .setColor(`#${(role.color).toString(16)}`)
                page.push(Embed)
            }
            const button1 = new Discord.MessageButton()
                .setCustomId("previousbtn")
                .setLabel("⏪")
                .setStyle("SECONDARY");

            const button2 = new Discord.MessageButton()
                .setCustomId("nextbtn")
                .setLabel("⏩")
                .setStyle("SECONDARY");
            const buttonList = [button1, button2];
            const timeout = 20000
            paginationEmbed(interaction, page, buttonList, timeout);
        })
    }
}