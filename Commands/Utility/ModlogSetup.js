const { CommandInteraction } = require("discord.js");
const DB = require("../../Structures/Schemas/Modlog");


module.exports = {
    name: "modlog",
    description: "Set up your message channel for the moderation messages used by /mod.",
    options: [
        {
            name: "channel",
            description: "Select the text channel to log moderation actions.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, options } = interaction;

        try {
            const Channel = options.getChannel("channel");

            await DB.findOneAndUpdate(
                { GuildID: guild.id },
                {
                    ChannelID: Channel.id,
                },
                {
                    new: true,
                    upsert: true,
                }
            );
            interaction.reply({ content: "Modlog channel has been set up.", ephemeral: true });

        } catch (err) {
            console.log(err);
        }
    },
};