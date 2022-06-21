const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Economy } = require("economy-mongoose")
const { Database } = require('../../Structures/config.json')
module.exports = {
    name: 'withdraw',
    description: 'Withdraw money from your bank.',
    permission: 'SEND_MESSAGES',
    options: [
        {
            name: 'amount',
            description: 'Provide an amount you want to withdraw.',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, member, options } = interaction
        Economy.connect(Database)

        const total = options.getString('amount')
        let amount;

        const user = await Economy.getUser(member.id, guild.id)
            if(!user) return interaction.reply('You don\'t have any money in your bank.')
            if(user.Bank < amount) return interaction.reply('You don\'t have enough money in your bank.')
            
            if(total == 'all') {
                amount = user.Bank
            } else {
                amount = total
            }

        Economy.Withdraw(member.id,guild.id,amount)

        const embed = new MessageEmbed()
            .setColor('#f0546e')
            .setDescription(`💠 \`$${amount.toLocaleString()}\` withdrawn from your bank.`)

            return interaction.reply({ embeds: [embed], ephemeral: false })
    }
}