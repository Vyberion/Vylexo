//                    if(volume > 100 || volume < 1) || return interaction.reply({content: "⛔ You must specify a value between 1 and 100."});//

const { CommandInteraction, MessageEmbed, Client, Message } = require(`discord.js`);

module.exports = {
    name: "music",
    description: "Complete music system.",
    options: [
        {
            name: "play",
            description: "Play a track.",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Provide a name or a url for the track.", type: "STRING", required: true }]
        },
        {
            name: "volume",
            description: "Alter the volume.",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 = 10%", type: "NUMBER", required: true }]
        },
        {
            name: "settings",
            description: "Select an option.",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Select an option.", type: "STRING", required: true,
            choices: [
                {name: "#️⃣ Queue", value: "queue"},
                {name: "⏭️ Skip", value: "skip"},
                {name: "⏸️ Pause", value: "pause"},
                {name: "▶️ Resume", value: "resume"},
                {name: "⏹️ Stop", value: "stop"},
                {name: "🔀 Shuffle Queue", value: "shuffle"},
                {name: "🔃 Toggle Autoplay Modes", value: "autoplay"},
                {name: "🔁 Toggle Repeat Modes", value: "repeatmode"},
                {name: "*️⃣ Add Related Tracks", value: "relatedtrack"},
            ]}]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction,client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "You must be inside a voice channel to access the music commands."});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `Music is already being played in <#${guild.me.voice.channelId}>.`});

        // if(interaction.user.id !== "815938588230287403")
        // return interaction.reply({content: "⛔ This command is restricted."});

        try {
            switch(options.getSubcommand()) {
                case "play" : {
                    client.distube.play( VoiceChannel, options.getString("query"), { textChannel: channel, member: member } );
                    return interaction.reply({content: "🎵 Request recieved."})
                }
                case "volume" : {
                    const volume = options.getNumber("percent");

                    client.distube.setVolume( VoiceChannel, volume);
                    return interaction.reply({content: `🔉 Volume has been set to \`${volume}\``});
                }
                case "settings" : {
                    const queue = await client.distube.getQueue( VoiceChannel );

                    if(!queue)
                    return interaction.reply({content: "⛔ There is no current queue."});

                    switch(options.getString("options")) {
                        case "skip" :
                            await queue.skip( VoiceChannel );
                            return interaction.reply({content: "⏭️ Track has been skipped."});

                        case "stop" :
                            await queue.stop( VoiceChannel );
                            return interaction.reply({content: "⏹️ Track has been stopped."});

                        case "pause" :
                            await queue.pause( VoiceChannel );
                            return interaction.reply({content: "⏸️ Track has been paused."});

                        case "resume" :
                            await queue.resume( VoiceChannel );
                            return interaction.reply({content: "▶️ Track has been resumed."});

                        case "autoplay" :
                            let Mode = await queue.toggleAutoplay( VoiceChannel );
                            return interaction.reply({content: `🔃 Autoplay has been toggled to ${Mode ? "On" : "Off"}.`});

                        case "shuffle" :
                            await queue.shuffle( VoiceChannel );
                            return interaction.reply({content: "🔀 Tracks have been shuffled."});

                        case "relatedtrack" :
                        await queue.addRelatedSong( VoiceChannel );
                        return interaction.reply({content: "*️⃣ Related track has been added to the queue."});

                        case "repeatmode" :
                            let Mode2 = await client.distube.setRepeatMode(queue);
                            return interaction.reply({content: `🔁 Repeat has been toggled to ${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}.`});

                        case "queue" :
                            return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("PURPLE")
                        .setDescription(`${queue.songs.map((song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)]
                    });
                    }
                    return;
                }

            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Alert: ${e}`)
            return interaction.reply({embeds: [errorEmbed]})
        }
    }
}