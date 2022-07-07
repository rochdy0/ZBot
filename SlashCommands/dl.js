const Discord = require('discord.js')
const wait = require('node:timers/promises').setTimeout;
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db')


module.exports = {
	data: {
		"name": 'dl',
		"type": 1,
		"description": 'Commande réservée aux membres du Staff',
		"options": [
			{
				"name": 'channel',
				"type": 7,
				"description": 'Saisissez un channel :',
				"required": true
			},
		]
	},
	dl: function (interaction, client) {
		const Embed = new Discord.MessageEmbed()
		console.log("Analyse en cours ...")
		let channel = interaction.options["_hoistedOptions"][0].channel
		Embed.setColor('#ffa600')
		Embed.setTitle('Delete')
		Embed.setDescription(`*Analyse en cours ...*`)
		interaction.reply("Lancement de l'Analyse")
		interaction.channel.send({ embeds: [Embed] }).then(async msgEmb => {
			const liste_mots = `pd
			pute
			fdp
			connasse
			connard
			enculé
			foutre
			nique
			bite
			tarlouze
			salope
			ntm
			nique ta mere
			poufiasse
			teub
			nique ta mère
			chatte
			pétass
			connase
			pédé
			tarlouz
			tarlouse
			négro
			negro
			nezgro
			negre
			netgro
			nez gros
			né gros
			gay
			branle
			branlette
			nique tes morts
			baisé
			baise
			foutrer
			sperme
			éjacule
			bougnoul
			suce
			chienne
			fils de pute
			juif
			nazi
			hitler
			reich
			djihadiste
			djiadiste
			encule`.split(`
			`)
			var liste_mots_cpt = []
			for (let k = 0; k < liste_mots.length; k++) liste_mots_cpt[k] = 0;
			let cpt = 0
			var cptm = 0
			let reg
			let message = await channel.messages
				.fetch({ limit: 1 })
				.then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));


			while (message) {
				await wait(250);
				await channel.messages
					.fetch({ limit: 100, before: message.id })
					.then(messagePage => {
						messagePage.forEach(async msg => {
							for (let i = 0; i < liste_mots.length; i++) {
								reg = new RegExp(`${liste_mots[i]}`)
								if (reg.test(msg.content)) {
									try{
										cptm += 1;
										liste_mots_cpt[i] += 1;
										await wait(5000);
										msg.delete()
									}
									catch(err)
									{
										console.log(err)
									}
								}
							}
							cpt += 1;
						});
						message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;

						// Update our message pointer to be last message in page of messages    
						try {
							Embed.setDescription(`*Analyse en cours ...
									${cptm} messages trouvés sur ${cpt} messages*`)
							msgEmb.edit({ embeds: [Embed] })
						}
						catch {
							Embed.setDescription(`*Une erreur est survenue pendant l'analyse : ${cptm}-${cpt}*`)
							msgEmb.edit({ embeds: [Embed] })
						}
					});
			}
			let str = ''
			for (let j = 0; j < liste_mots.length; j++) {
				liste_mots_cpt[j] > 0 ? str = str + `**${liste_mots_cpt[j]}** : *${liste_mots[j]}*\n` : null;
			}
			try {
				Embed.setDescription(`**${cptm}**/**${cpt}**mots *ont bien étés supprimés dans le channel <#${channel.id}>*`)
				msgEmb.edit({ embeds: [Embed] })
				cptm != 0 ? msgEmb.channel.send(str) : null;

			}
			catch(err) {
				console.log(err)
				Embed.setDescription(`*Une erreur est survenue après l'analyse : ${cptm}-${cpt}*`)
				msgEmb.edit({ embeds: [Embed] })
				cptm != 0 ? msgEmb.channel.send(str) : null;
			}
		})
	}
}