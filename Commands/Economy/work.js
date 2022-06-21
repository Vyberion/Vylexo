const { Cooldown } = require("cooldown.js/lib/cooldown");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Economy } = require("economy-mongoose")
const { Database } = require('../../Structures/config.json')
module.exports = {
    name: 'work',
    description: 'Work for money.',
    permission: 'SEND_MESSAGES',
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const cooldown = new Cooldown();
        const { guild, member } = interaction

        const user = member.id

        const workCooldown = new cooldown.Command(guild.id,'work')

            const userCooldown = workCooldown.has(member.id)

            if(userCooldown) {
                return interaction.reply('You are still on cooldown, please wait another ' + `\`${userCooldown.minutesleft}\` minute(s) and \`${userCooldown.secondsleft}\`` + ' seconds.');
            }
 
        let opts = [
            ' took care of some little angles and earned',
            ' spent a day helping the homeless and earned',
            ' gave someone their lost wallet back and they gave them',
            ' helped an old lady accross the road and she gave them',
            ' won a lotto ticket worth',
            ' worked at the gas station for the day and earned',
            ' held a car wash for a day and profited',
            ' invested in crypto and profited'
        ]

        let result = Math.floor((Math.random() * opts.length))
        let money = Math.floor(Math.random() * 1001)

        Economy.connect(Database)
            const check = await Economy.getUser(user, guild.id)
        if(!check) {
            Economy.createUser(user, guild.id)
            return interaction.reply('You earned \`0\` for not being in the database yet. Don\'t worry, you\'ve been added now.')
        }

        await Economy.addWallet(member.id, guild.id, money)

        let cd = 1000 * 60 * 5

        const embed = new MessageEmbed()
            .setColor('#f0546e')
            .setDescription(`💠 <@${member.id}>${opts[result]} \`$${money.toLocaleString()}\`.`)

            await interaction.reply({ embeds: [embed], ephemeral: false })
            workCooldown.add(member.id,cd)
    }
}