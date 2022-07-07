const fs = require('fs');

module.exports = {
    membercount: async function (Discord, client) {
        let guild_count = await client.guilds.resolve('610928463590981634').memberCount;
        var target_chan = client.channels.resolve('905466940917694555');
        console.log(guild_count)
        
        target_chan.setName(`📈 Discord : ${guild_count} Membres`)
    }
}