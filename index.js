const {Collection, Client, Intents} = require('discord.js');
const Discord = require('discord.js')
const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const fs = require('fs');
const schedule = require('node-schedule');
const rolejs = require('./Automatisations/rolechan.js')
const locjs = require('./Automatisations/locchan.js')

client.login(process.env.DISCORD_TOKEN);


// Ajout des SlashCommands sur Discord
const SlashData = [];
const SlashCommands = [];
const commandFiles = fs.readdirSync('./SlashCommands').filter(file => file.endsWith('.js'));
client.commands = new Collection();
for (let file of commandFiles) {
    file = file.replace('.js', '')
	const command = require(`./SlashCommands/${file}.js`);
    SlashCommands[file] = command[file]
    if (command.bk1) SlashCommands.bk1 = command.bk1
    if (command.bk2) SlashCommands.bk2 = command.bk2
	SlashData.push(command.data);
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands('966101200221114419', '610928463590981634'),
			{ body: SlashData },);
		console.log('Application SlashCommands chargées avec succès');
	} catch (error) {
		console.error(error);
	}
})();
// Ajout des SlashCommands sur Discord



client.on("ready", async () => {
    console.log("ZBotV2 démaré, en attente de commandes ....")
    client.user.setStatus('dnd');
    locjs.checkloca(client)
    rolejs.checkrole(client)
    setInterval(function() {require('./Automatisations/messagequestion.js').messagequestion(client, "question", "611706771668729858")}, 3600000);
    setInterval(function() {require('./Automatisations/messagequestion.js').messagequestion(client, "question2", "875783142638759976")}, 3600000);
    setInterval(function() {require('./Automatisations/messagequestion.js').messagequestion(client, "analyseprog", "926511016014139422")}, 3600000);
    setInterval(function() {require('./Automatisations/messagequestion.js').messagequestion(client, "vosmedias", "906274946525843536")}, 3600000);
    setInterval(function() {require('./Automatisations/membercount.js').membercount(Discord, client)}, 300000);
    setInterval(function() {require('./Automatisations/twitch.js').twitchcount(client)}, 300000);
    setInterval(function() {require('./Automatisations/twitch.js').twtoken()}, 7200000);
    // schedule.scheduleJob({hour: 13, minute: 00}, () => {require("./Automatisations/journaldujour.js").jdj(client);});

    schedule.scheduleJob({hour: 18, minute: 15}, () => {require('./Automatisations/don.js').don(Discord, client, '820968843429150720')});
    schedule.scheduleJob({hour: 20, minute: 15}, () => {require('./Automatisations/don.js').don(Discord, client, '820968843429150720')});
    schedule.scheduleJob({hour: 23, minute: 15}, () => {require('./Automatisations/don.js').don(Discord, client, '820968843429150720')});
    schedule.scheduleJob({hour: 15, minute: 00}, () => {require('./Automatisations/don.js').don(Discord, client, '857303824024862750')});
    schedule.scheduleJob({hour: 22, minute: 40}, () => {require('./Automatisations/don.js').don(Discord, client, '857303824024862750')});
    schedule.scheduleJob({hour: 15, minute: 00}, () => {require('./Automatisations/don.js').don(Discord, client, '610931002868498435')});

    schedule.scheduleJob({hour: 11, minute: 00}, () => {require('./Automatisations/topgg.js').topgg(Discord, client)});
    schedule.scheduleJob({hour: 15, minute: 00}, () => {require('./Automatisations/topgg.js').topgg(Discord, client)});
    schedule.scheduleJob({hour: 19, minute: 00}, () => {require('./Automatisations/topgg.js').topgg(Discord, client)});
    schedule.scheduleJob({hour: 23, minute: 40}, () => {require('./Automatisations/topgg.js').topgg(Discord, client)});

    schedule.scheduleJob({hour: 17, minute: 00}, () => {require('./Automatisations/article.js').article(Discord, client)});
    schedule.scheduleJob({hour: 21, minute: 00}, () => {require('./Automatisations/article.js').article(Discord, client)});
    
    schedule.scheduleJob({hour: 10, minute: 00}, () => {require('./Automatisations/faq.js').faq(Discord, client)});
    schedule.scheduleJob({hour: 14, minute: 00}, () => {require('./Automatisations/faq.js').faq(Discord, client)});
    schedule.scheduleJob({hour: 18, minute: 00}, () => {require('./Automatisations/faq.js').faq(Discord, client)});  
});



client.on('interactionCreate', interaction => {
    if (interaction.customId == "selectrole") rolejs.giverole(interaction, client);
    else if (interaction.customId == "selectloca") locjs.giveloca(interaction, client);
    else if (interaction.customId == "bk2") SlashCommands.bk2(interaction);
    else {SlashCommands[interaction.commandName](interaction, client)}
});





client.on('messageCreate', function (message) {
    //Non présenté dans question
    if (message.member.roles.cache.has('965570737861705768') && message.channelId == '611706771668729858')
    {
        message.reply('Les coachs privilégient les membres un minimum impliqués dans la communauté. \nAfin d\'attendre une réponse, merci de te présenter dans <#610934395062190096>')
    }
    
    //Non présenté
    if (message.member.roles.cache.has('965570737861705768') && message.channelId == '610934395062190096' )
    {
        let presReg = new RegExp(`(Bonjour|Hello|Hi|Salut|Je me présente|Bonsoir|Je suis|Je m'appelle|Coucou)[\\S]?[\\s]([\\S]+)[\\s]([\\S]+)[\\s]([\\S]+)[\\s]([\\S]+)[\\s]([\\S]+)[\\s]([\\S]+)[\\s]([\\S]+)[\\s]([\\S]+)[\\s]([\\S]+)([\\s\\S]+)`, 'gmi');
        if (presReg.test(message.content))
        {
            message.member.roles.remove('965570737861705768')
        }
    }
    //Nouveaux guerrier
    (message.member.roles.cache.has('747705073458610197')) ? require('./Automatisations/nouveau_guerrier.js').nouveauGuerrier(Discord, client, message) : null;
});

//Ping dans pour les nouveaux
client.on('guildMemberAdd', function (member) {
    var target_chan = client.channels.resolve('646389555066568709');
    target_chan.send(`<@${member.user.id}>`).then(msg => msg.delete())
});

client.on('rateLimit', function (rateLimitData) {
    console.log('Trop de requête à l\'API discord')
    console.log(rateLimitData)
});