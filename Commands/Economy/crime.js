const { Cooldown } = require("cooldown.js/lib/cooldown");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Economy } = require("economy-mongoose")
const { dataBase } = require('../../config.json')
module.exports = {
    name: 'crime',
    description: 'Commit a crime for money.',
    permission: 'SEND_MESSAGES',
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const cooldown = new Cooldown();
        const { guild, member } = interaction

        const user = member.id

        const crimeCooldown = new cooldown.Command(guild.id,'crime')

            const userCooldown = crimeCooldown.has(member.id)

            if(userCooldown) {
                return interaction.reply('You are still on a cooldown, please wait another ' + `\`${userCooldown.minutesleft}\` minute(s) and \`${userCooldown.secondsleft}\`` + ' seconds.');
            }
 
        let opts = [
            ' robbed an old man for',
            ' robbed the bank for',
            ' found a wallet on the ground and kept the money, earning',
            ' became a hit man for a day and earned',
            ' ran a crypto scam and earned',
            ' stole from their mum and got'
        ]

        let result = Math.floor((Math.random() * opts.length))
        let money = Math.floor(Math.random() * 3001)

        Economy.connect(dataBase)

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
            crimeCooldown.add(member.id,cd)
    }
}