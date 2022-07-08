'use strict';

module.exports = {
    
    //  Updates the member counter's channel.
    memberCounter: async function (client) {
        let guild_count = await client.guilds.resolve('610928463590981634').memberCount;
        console.log(guild_count)
        client.channels.resolve('905466940917694555').setName(`📈 Discord : ${guild_count} Membres`)
    }
}