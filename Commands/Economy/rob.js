const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Economy } = require("economy-mongoose");
const { dataBase } = require('../../config.json')
const { Cooldown } = require("cooldown.js/lib/cooldown");
module.exports = {
    name: 'rob',
    description: 'Rob another user.',
    permission: 'SEND_MESSAGES',
    options: [
        {
            name: 'user',
            description: 'Provide a user.',
            type: 'USER',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const cooldown = new Cooldown();
        Economy.connect(dataBase)
        const { guild, member, options } = interaction
        const target = options.getUser('user');

        const user = target.id;

        const check = await Economy.getUser(user, guild.id)
        if(!check) {
            Economy.createUser(user, guild.id)
            return interaction.reply('They have \`$0\` in their wallet.')
        }
        const check2 = await Economy.getUser(member.id, guild.id)
        if(!check2) {
            Economy.createUser(member.id, guild.id)
            return interaction.reply('You earned \`0\` for not being in the database yet. Don\'t worry, you\'ve been added now.')
        }

        let money = await Economy.getUser(user, guild.id)
            if(!money) return interaction.reply(`<@${user}> does not have any money in their wallet.`)
            if(money.Wallet === 0) return interaction.reply(`<@${user}> does not have any money in their wallet.`)

            const robCooldown = new cooldown.Command(guild.id,'rob')

            const userCooldown = robCooldown.has(member.id)

            if(userCooldown) {
                return interaction.reply('You are still on cooldown, please wait another ' + `\`${userCooldown.minutesleft}\` minute(s) and \`${userCooldown.secondsleft}\`` + ' seconds.');
            }

            function randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
              }

        const result = randomIntFromInterval(1,2)
        
        let msg;
        let amount;
        let endMsg;

        if(result === 2) {
            msg = 'tried robbing'
            amount = Math.floor(Math.random() * -3001)
            endMsg = 'and lost'

        }
        if(result === 1) {
            msg = 'robbed'
            amount = Math.floor(Math.random() * 5001)
            endMsg = 'for'
        }

        let cd = 1000 * 60 * 15

        if(amount > 0) {
            Economy.removeWallet(user, guild.id, amount)
            Economy.addWallet(member.id, guild.id, amount)
        } else if(amount < 0) {
            Economy.addWallet(user, guild.id, amount * -1)
            Economy.removeWallet(member.id, guild.id, amount * -1)
        }

        const embed = new MessageEmbed()
        .setColor('#f0546e')
            .setDescription(`💠 <@${member.id}> ${msg} <@${user}> ${endMsg} \`$${amount.toLocaleString()}\`.`)

            await interaction.reply({ embeds: [embed], ephemeral: false })
            robCooldown.add(member.id,cd)
    }
}