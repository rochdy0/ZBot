const journaldujourjson = require('../JSON/journaldujour.json');
const fs = require('fs');

module.exports = {
    jdj: function (client) {
        position_chan = journaldujourjson.position_channel
        position_cat = journaldujourjson.position_category
        console.log(journaldujourjson["channels"][position_cat][position_chan])
        console.log(journaldujourjson["category"][position_cat])
        console.log('done1')
        var target_chan = client.channels.resolve(journaldujourjson["channels"][position_cat][position_chan]);
        target_chan.setParent(journaldujourjson["category"][position_cat], { lockPermissions: false }).then(chan => chan.setPosition(position_chan-1))
        
        if (journaldujourjson.position_channel == 0) {
            if (journaldujourjson.position_category == 0) journaldujourjson.position_category = journaldujourjson.position_category.length
            else journaldujourjson.position_category = journaldujourjson.position_category - 1
            journaldujourjson.position_channel = journaldujourjson["channels"][position_cat].length
        }
        else journaldujourjson.position_channel = journaldujourjson.position_channel - 1





        position_chan = journaldujourjson.position_channel
        position_cat = journaldujourjson.position_category
        console.log(journaldujourjson["channels"][position_cat][position_chan])
        console.log(journaldujourjson["category"][position_cat])
        console.log('done2')
        var target_chan2 = client.channels.resolve(journaldujourjson["channels"][position_cat][position_chan]);
        target_chan2.setParent("971148455072378971", { lockPermissions: false })
        client.channels.resolve('766035789439565834').send(`Journal du jour <#${target_chan2.id}>\nau dessus de <#${target_chan.id}>`)
        
        let data = JSON.stringify(journaldujourjson);
        fs.writeFileSync('/home/raspberry/ZBot/JSON/journaldujour.json', data);

// target_chan2.messages.fetch({ limit: 1 }).then(messagePage => {
//     messagePage.forEach(msg => {
//         console.log(msg.auhtor.id)
//         client.channels.resolve('621287119658287124').send(`<@${msg.author.id}> Tu es journal du jour aujourd'hui <:peaky2:678665593490243635>`)
//     });
// });
    }
}