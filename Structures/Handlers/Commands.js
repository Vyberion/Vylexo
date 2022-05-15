const { Perms } = require("../Validation/PermissionNames");
const { Client } = require("discord.js");
/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Commands Loaded");

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "⛔ FAILED", "Missing a name.")

        if (command.type !== "USER" && !command.description) 
        return Table.addRow(command.name, "⛔ FAILED", "Missing a description.")

        if(command.permission) {
        if(Perms.includes(command.permission))
        command.defaultPermission = false;
        else
        return Table.addRow(command.name, "⛔ FAILED", "Permission is invalid.")
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ SUCCESSFUL");

    });

    console.log(Table.toString());

    // Permissions Check //
    // Guild = 916728208991342622 //
    // Test = 865329221508923402 //
    // hh = 974775030183505960 //

    client.on('ready', async () => {
        const mainGuild = await client.guilds.cache.get("916728208991342622");
        mainGuild.commands.set(CommandsArray);
    })};