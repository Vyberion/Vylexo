const { MessageEmbed, CommandInteraction } = require("discord.js")
const { Economy } = require("economy-mongoose")
const { Database } = require('../../Structures/config.json')
module.exports = {
    name: 'balance',
    description: 'Check how much money a user has.',
    permission: 'SEND_MESSAGES',
    options: [
        {
            name: "user",
            description: "Provide a user.",
            type: "USER"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
     async execute (interaction) {
        const { options, guild, member} = interaction
        Economy.connect(Database)


        const user = options.getUser('user') || member;
        const target = user.id;


        const bal = await Economy.getUser(target, guild.id)
  
        let total = bal.Wallet + bal.Bank

        if(!bal) {
          Economy.createtarget(target, guild.id)

          const embed = new MessageEmbed()
          .setColor('#f0546e')
          .setDescription(`💠 <@${target}>'s Networth
          \u200b
          🔹Wallet: \`$0\`
          🔹Bank: \`$0\`
          🔸Total: \`$0\``)
           .setTimestamp()
  
          return interaction.reply({ embeds: [embed], ephemeral: false })
        }

        const embed = new MessageEmbed()
        .setColor('#f0546e')
        .setDescription(`💠 <@${target}>'s Networth
        \u200b
        🔹Wallet: \`$${bal.Wallet.toLocaleString()}\`
        🔹Bank: \`$${bal.Bank.toLocaleString()}\`
        🔸Total: \`$${total.toLocaleString()}\``)
         .setTimestamp()

        return interaction.reply({ embeds: [embed], ephemeral: false })
    }
}