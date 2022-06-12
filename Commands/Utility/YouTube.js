const { Client, Util } = require("discord.js");
const RSSParser = require("rss-parser");
const request = new RSSParser();

const config = {
    "YOUTUBER_RSS_LINK": "https://www.youtube.com/feeds/videos.xml?channel_id=UCe4aZIOgGRP0Zfl6r2KvGPA",

    "DISCORD_CHANNEL_ID": "936726390043189318",

    "MESSAGE": "New **{author}** Video\n`{title}`\n{url}"
};

module.exports = {
    name: "ready",
    /**
     * @param {Client} client 
     */
    async execute(client) {

        handleUploads();
        setInterval(handleUploads, 15 * 1000);

        async function handleUploads() {
            if(client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);

            request.parseURL(config.YOUTUBER_RSS_LINK)
            .then(data => {
                if(client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
                else {
                    client.db.push("postedVideos", data.items[0].link);
                    let parsed = data.items[0];
                    let channel = client.channels.cache.get(config.DISCORD_CHANNEL_ID);
                    if(!channel) return;
                    let message = config.MESSAGE
                        .replace(/{author}/g, parsed.author)
                        .replace(/{title}/g, Util.escapeMarkdown(parsed.title))
                        .replace(/{url}/g, parsed.link);
                    channel.send(message);
                }
            });
        }
    }
}