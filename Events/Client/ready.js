const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");
const osUtils = require("os-utils");
const ms = require("ms");
const DB = require('../../Structures/Schemas/ClientDB');

module.exports = {
  name: "ready",
  once: false,
  async execute(client) {
    console.log("The client has now started.");
    client.user.setActivity("you.", { type: "WATCHING" });

    if (!Database) return;
    mongoose
      .connect(Database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("The client is now connected to the database.");
      })
      .catch((err) => {
        console.log(err);
      });


    let memArray = [];

    setInterval(async () => {

      memArray.push((osUtils.totalmem() - osUtils.freemem()) / 1024);

      if (memArray.length >= 14) {
        memArray.shift();
      }

      // Store in Database
      await DB.findOneAndUpdate({
          Client: true,
        }, {
          Memory: memArray,
        }, {
          upsert: true,
        });
    }, ms("5s"));
  },
};