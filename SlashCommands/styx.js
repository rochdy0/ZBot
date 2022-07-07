const styxjson = require('../JSON/styx.json');
const fs = require('fs');
const Discord = require('discord.js')

const Embed = new Discord.MessageEmbed()
Embed.setColor('#10CC38')
module.exports = {
    data: {
        "name": "Styx",
        "type": 2,
    },
    styx: function (interaction) {
        id = interaction.options["_hoistedOptions"][0].user.id
        let useris = false
        let indice;
        for (let i = 0; i < styxjson.length; i++) {
            if (styxjson[i]['name'] == interaction.options["_hoistedOptions"][0].user.username) {
                useris = true; 
                indice = i;
            }
        }
        if (useris) {
                interaction.guild.members.fetch(id).then(member => {
                    for (let j = 0; j < styxjson[indice].role.length ; j++){
                        member.roles.add(styxjson[indice].role[j])
                    }

                    Embed.setTitle('Styx Enlevé')
                    Embed.setDescription(`*Vous venez d'enlever* **${member.user.username}** *du Styx*`)      
                    interaction.reply({ embeds: [Embed], ephemeral: true });
                    member.roles.remove('678031463433895986')
                    styxjson.splice(indice, 1);
                    let data = JSON.stringify(styxjson);
                    fs.writeFileSync('/home/raspberry/ZBot/JSON/styx.json', data);
                })


        }
        else {
            let role = []
            interaction.guild.members.fetch(id).then(member => {
                member.roles.cache.forEach(element => {
                    if (element.id != '610928463590981634')
                    {
                    role.push(element.id)
                    member.roles.remove(element.id)
                    }
                })
                member.roles.add('678031463433895986')
                styxjson.push({
                    name: member.user.username,
                    role: role
                })
                Embed.setTitle('Styx Ajouté')
                Embed.setDescription(`*Vous venez d'envoyer* **${member.user.username}** *au Styx*`)      
                interaction.reply({ embeds: [Embed], ephemeral: true });
                let data = JSON.stringify(styxjson);
                fs.writeFileSync('/home/raspberry/ZBot/JSON/styx.json', data);
            })
        }
    }
}