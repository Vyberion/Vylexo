const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Responds with a simple message to test response speed.",
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        const Response = new MessageEmbed()
     .setColor("PURPLE")
     .setDescription(`\`PONG!\``)

     interaction.reply({embeds: [Response], ephermeral: false})
    }
}