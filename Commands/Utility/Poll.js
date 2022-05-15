const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    description: "Activates a server poll.",
    options: [
        {
            name: "question",
            description: "Provide a debate query.",
            required: true,
            type: 3,
        },
    ],
    async execute(interaction) {

        const Embed = new MessageEmbed()
            .setTitle(interaction.options.getString("question"))
            .setColor('PURPLE');

        interaction.reply({embeds: [Embed] })
        const message = await interaction.fetchReply();
        message.react('✅');
        message.react('⛔');
    }
};