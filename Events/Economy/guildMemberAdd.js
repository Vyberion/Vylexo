const { Database } = require('../../Structures/config.json')
const { Economy } = require("economy-mongoose")
module.exports = {
    name: 'guildMemberAdd',
    on: true,
    async execute(member) {

        Economy.connect(Database)
            const { guild } = member;

            if(member.user.bot) return;
            
                Economy.createUser(member.id, guild.id)
                await Economy.addWallet(member.id, guild.id, 1000)

        
    }

}