const Discord = require('discord.js')
const PDFDocument = require('pdfkit');
const fs = require('fs')
const fetch = require('node-fetch');
const doc = new PDFDocument;
const request = require('request');
const wait = require('node:timers/promises').setTimeout;


function writePDF(message, document, size, font)
{
    let text = [...message]
    for (let i = 0; i < text.length; i++) {
        if (text[i] != '*') {
            if(/[0-9]/u.test(text[i])) {
                text[i] == '\n' ? document.font(font).fontSize(size).text(text[i]) : document.font(font).fontSize(size).text(text[i], { continued: true });
            }
            else if (/\p{Emoji}/u.test(text[i])) {
                document.font('Noto Emoji').fontSize(size).text(text[i], { continued: true });
            }
            else {
                text[i] == '\n' ? document.font(font).fontSize(size).text(text[i]) : document.font(font).fontSize(size).text(text[i], { continued: true });
            }
        }
    }
    document.font('Noto Sans').text(('\n'));
}
module.exports = {
    data: {
        "name": 'save',
        "type": 1,
        "description": 'Commande qui permet de sauvegarder un journal',
        "options": [
            {
                "name": 'journal',
                "type": 7,
                "description": 'Choisissez un journal',
                "required": true
            },
        ]
    },

    save: async function (interaction) {
        if (interaction.options._hoistedOptions[0].channel.parentId != '787261880208588860' && interaction.options._hoistedOptions[0].channel.parentId != '865963213325991956' && interaction.options._hoistedOptions[0].channel.parentId != '679090062461239306' && interaction.options._hoistedOptions[0].channel.parentId != '617767210601152522') {
            const Embed = new Discord.MessageEmbed()
                .setColor('#BC1F1A')
                .setTitle('Sauvegarde Journal')
                .setDescription('*Ce channel n\'est pas un journal*')
            interaction.reply({ embeds: [Embed] })
        }
        else {
            doc.pipe(fs.createWriteStream('/home/raspberry/ZBot/journalTemp.pdf'));
            doc.registerFont('Noto Sans', 'NotoSans-Regular.ttf');
            doc.registerFont('Noto Sans Bold', 'NotoSans-Bold.ttf');
            doc.registerFont('Noto Emoji', 'NotoEmoji-VariableFont_wght.ttf');
            // doc.rect(0, 0, doc.page.width, doc.page.height).fill('#283747');
            let channel = interaction.options._hoistedOptions[0].channel
            console.log(channel)
            let channel_name = channel.name.replace(/-/g, ' ')
            writePDF("Journal de : " + channel_name, doc, 25, 'Noto Sans Bold')
            // doc.font('Noto Sans Bold').fontSize(25).text("Journal de : " + channel.name, {align: 'center'});
            let list_msg = []
            let message = await channel.messages
                .fetch({ limit: 1 })
                .then(messagePage => messagePage.size === 1 ? messagePage.at(0) : null);

            
            while (message) {
                await wait(250);
                await channel.messages
                    .fetch({ limit: 100, before: message.id })
                    .then(messagePage => {
                        messagePage.forEach(async msg => {
                            list_msg.push(msg)
                        });
                        message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
                        // Update our message pointer to be last message in page of messages    
                    });
            }
            console.log(list_msg.length)
            for (let j=list_msg.length-1; j>-1;j--)
            {

                var date = new Date(list_msg[j].createdTimestamp)
                doc.font('Noto Sans Bold').fontSize(18).text("\nDate: " + date.getDate() +
                    "/" + (date.getMonth() + 1) +
                    "/" + date.getFullYear() +
                    " " + date.getHours() +
                    ":" + date.getMinutes());
                    if(list_msg[j].attachments.size > 0)
                    {
                        // list_msg[j].attachments.forEach(photo => {
                        //     console.log('test')
                            
                        //         // /([\s\S]+).(jpeg|jpg|png|gif|svg|webp|tiff)/u.test(photo.name) ? doc.image(`./savejournal/${photo.name}`,{scale: 0.0625}) : null;
                        //     console.log('test2')
                        //     request(photo.attachment).pipe(fs.createWriteStream(`./savejournal/${photo.name}`))
                        //     doc.image(`./savejournal/${photo.name}`,{scale: 0.0625})
                        //     console.log('test3')
                        // })
                    }
                    if(list_msg[j].mentions.users.size > 0)
                    {
                        list_msg[j].mentions.users.forEach(mention=>{
                            list_msg[j].content = list_msg[j].content.replace(`<@${mention.id}>`, mention.username)
                        })
                    }
                    writePDF(list_msg[j].content, doc, 18, 'Noto Sans')

            }
            console.log('done')
            doc.end();
            interaction.channel.send({
                files: [{
                    attachment: "/home/raspberry/ZBot/journalTemp.pdf"
                }]
            })



        }
    }
}