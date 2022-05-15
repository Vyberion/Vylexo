const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Economy } = require("economy-mongoose");
const { dataBase } = require('../../config.json')
module.exports = {
    name: 'deposit',
    description: 'Deposit your money into the bank.',
    permission: 'SEND_MESSAGES',
    options: [
        {
            name: 'amount',
            description: 'Provide an amount you want to deposit.',
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
        Economy.connect(dataBase)

        const total = options.getString('amount')
        let amount
        
        const user = await Economy.getUser(member.id, guild.id)
            if(!user) return interaction.reply('You don\'t have any money in your wallet.')
            if(user.Wallet < amount) return interaction.reply('You don\'t have enough money in your wallet.')
        
        if(total == 'all') {
            amount = user.Wallet
        } else {
            amount = total
        }

        Economy.Deposit(member.id,guild.id,amount)

        const embed = new MessageEmbed()
            .setColor('#f0546e')
            .setDescription(`💠 \`$${amount.toLocaleString()}\` deposited into your bank.`)

            return interaction.reply({ embeds: [embed], ephemeral: false })
    }
}