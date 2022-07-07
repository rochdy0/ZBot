const Discord = require('discord.js')
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db')

module.exports = {
	data: {
		"name": 'ng',
		"type": 1,
		"description": 'Permet de voir l\'avancée d\'un nouveau guerrier',
		"options": [
			{
				"name": 'utilisateur',
				"type": 6,
				"description": 'Saisissez le nom de l\'utilisateur :'
			}
		]
	},

	ng: async function (interaction) {
		const Embed = new Discord.MessageEmbed()

		if (Object.keys(interaction.options["_hoistedOptions"]).length == 0) {
			id = interaction.user.id
			avatar = interaction.user.displayAvatarURL()
		}
		else {
			id = interaction.options["_hoistedOptions"][0].user.id
			avatar = interaction.options["_hoistedOptions"][0].user.displayAvatarURL()
		}

		interaction.guild.members.fetch(id).then(member => {
				db.all(`SELECT id, username, count, date FROM nouveau_guerrier WHERE id = '${member.id}'`, function (err, row) {
					if (err) {console.log(`ng : ${member.id}`);console.log(err)}
					else {
						row = row[0]
						if (row == undefined) {
							Embed.setColor('#BC1F1A')
							Embed.setTitle('Statistique Nouveau Guerrier')
							if (Object.keys(interaction.options["_hoistedOptions"]).length == 0) Embed.setDescription('*Vous n\'êtes pas un Nouveau Guerrier*') 
							else Embed.setDescription('Cette personne n\'est pas un Nouveau Guerrier ou n\'a pas encore envoyé de message')
						}
						else {
							date = new Date(row.date)
							const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

							sdate = date.toLocaleDateString('fr-FR', options)
							datenow = new Date()
							diffdate = Math.round(14 - Math.abs(date.getTime() - datenow.getTime()) / (1000 * 3600 * 24))
							if (diffdate < 0) diffdate = 0;
							Embed.setThumbnail(avatar)
							Embed.setColor('#ffa600')
							Embed.setTitle('Statistique Nouveau Guerrier')
							Embed.setDescription(`*Date du premier message :* **le ${sdate}**\n*Nombre de message :* **${row.count}/300 messages**\n*Temps restant :* **${diffdate} jours**`)
						}
						interaction.reply({ embeds: [Embed] })
					}
				})
		})
	}
}