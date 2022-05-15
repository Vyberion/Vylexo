const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Economy } = require("economy-mongoose");
const { dataBase } = require('../../config.json')
module.exports = {
    name: 'pay',
    description: 'Pay a user your cash.',
    permission: 'SEND_MESSAGES',
    options: [
        {
            name: 'user',
            description: 'Provide a user.',
            type: 'USER',
            required: true
        },
        {
            name: 'amount',
            description: 'Provide an amount.',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, options, member } = interaction

        Economy.connect(dataBase)

            const payTo = options.getUser('user')
            const total = options.getString('amount')
            let amount;

            const payer = member.id
            
            const validation = await Economy.getUser(payer, guild.id)
                if(validation.Wallet < amount) {
                    return interaction.reply('Please add cash to your wallet using `/withdraw`.')
                }

                if(total == 'all') {
                    amount = validation.Wallet
                } else {
                    amount = total
                }

            Economy.transfer(payer, payTo.id, guild.id, amount)

            const embed = new MessageEmbed()
            .setColor('#f0546e')
            .setDescription(`💠 <@${payer}> sent \`$${amount.toLocaleString()}\` to <@${payTo}>.`)

            await interaction.reply({ embeds: [embed], ephemeral: false })
    }
}