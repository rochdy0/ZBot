module.exports = {
	data: {
		"name" : 'template',
		"type" : 1,
		"description" : 'Permet d\'afficher le lien du template',
	},

    template: function (interaction) {
        interaction.reply('Voici le lien du template : https://docs.google.com/spreadsheets/d/1zhwqxzqUBibLvHbCI0rOi2ZqNU2SzOOBg-KFOwuZvSQ/edit?usp=sharing');
    }
}