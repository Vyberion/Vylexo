const { Database } = require('../../Structures/config.json')
const { Economy } = require("economy-mongoose")
module.exports = {
    name: 'guildMemberRemove',
    on: true,
    async execute(member) {

        Economy.connect(Database)
            const { guild } = member;

            if(member.user.bot) return;
            
                Economy.DeleteUser(member.id, guild.id)
    }

}