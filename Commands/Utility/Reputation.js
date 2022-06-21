const { CommandInteraction, Client, MessageEmbed } = require(`discord.js`);
const DB = require("../../Structures/Schemas/RepDB");

module.exports = {
  name: `reputation`,
  description: `User reputation system.`,
  options: [
    {
      name: "actions",
      type: "SUB_COMMAND",
      description:
        "Choose what you want to do with a user's reputation points.",
      options: [
        {
          name: "user",
          type: "USER",
          description: "Provide a user.",
          required: true,
        },
        {
          name: "give",
          type: "NUMBER",
          description: "Give someone reputation points.",
        },
        {
          name: "take",
          type: "NUMBER",
          description: "Remove someone's reputation points.",
        },
        {
          name: "set",
          type: "NUMBER",
          description: "Set someone's reputation points.",
        },
      ],
    },
    {
      name: "show",
      type: "SUB_COMMAND",
      description: "Shows a user's reputation points.",
      options: [
        {
          name: "member",
          type: "USER",
          description: "Select the user you want to see reputation points of.",
          required: true,
        },
      ],
    },
    {
      name: "reset",
      type: "SUB_COMMAND",
      description: "Resets your guild member's reputation points.",
      options: [
        {
          name: "confirmation",
          type: "STRING",
          description: "Are you sure you want to reset? This cannot be undone.",
          choices:[
            {name: "✅ Yes", value: "yes"},
            {name: "❌ No", value: "no"}
          ]
        }
      ]
    }
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {

    const { options, guild, user } = interaction;
    const userAction = options.getUser("user");
    const pointsGive = options.getNumber("give");
    const pointsTake = options.getNumber("take");
    const pointsSet = options.getNumber("set");
    const userShow = options.getUser("member");
    const repEmbed = new MessageEmbed();

    //Switching on Show, Reset and Actions
    switch (options.getSubcommand()) {
      case "actions": {
        
        //Checks
        if (pointsGive) { 
        if (pointsGive === NaN)
          return interaction.reply({
            content: "The number provided is not a number.",
          });
            //You can change these values
          if(pointsGive > 10) return interaction.reply({content: "You can only give reputation between 1-10."})

          //Incrementing Data
            await DB.findOneAndUpdate(
            { GuildId: guild.id, UserId: userAction.id },
            {$inc: { Points: pointsGive }},
            { new: true, upsert: true }
          ); 
          repEmbed
            .setColor("GREEN")
            .setDescription(
              `Added +${pointsGive} to <@${userAction.id}>'s Reputation.`
            );
          await interaction.reply({ embeds: [repEmbed] });
        }
        
        if(pointsTake){
          //Chekcs
          if (pointsTake === NaN)
            return interaction.reply({
              content: "The number provided is not a number.",
            });

          if (pointsTake > 10)
            return interaction.reply({
              content: "You can only take reputation between 1-10.",
            });
          

          await DB.findOneAndUpdate(
            { GuildId: guild.id, UserId: userAction.id },
            { $inc: { Points: -pointsTake } },
            { new: true, upsert: true }
          );
          repEmbed
            .setColor("GREEN")
            .setDescription(
              `Removed -${pointsTake} from <@${userAction.id}>'s reputation.`
            );
          await interaction.reply({ embeds: [repEmbed] });
        }
        if(pointsSet){

          if (pointsSet === NaN)
            return interaction.reply({
              content: "The number provided is not a number.",
            });

          await DB.findOneAndUpdate(
            { GuildId: guild.id, UserId: userAction.id },
            { Points: pointsSet },
            { new: true, upsert: true }
          );
          repEmbed
            .setColor("GREEN")
            .setDescription(
              `<@${userAction.id}>'s points are now set to ${pointsSet}.`
            );
          await interaction.reply({ embeds: [repEmbed] });
        }
      }
      break;

      case "show": {
        if (userShow) {

          let data = await DB.findOne({
            GuildId: guild.id, UserId: userShow.id
          }, async(err,data)=>{
            if(err) throw err
            if(data){

              if(data.Points < 5){
                repEmbed.setColor("RED").setDescription(`<@${userShow.id}> has ${data.Points} reputation points.`)
                await interaction.reply({embeds: [repEmbed]})

               }else if(data.Points > 5){
                 repEmbed
                   .setColor("GREEN")
                   .setDescription(
                     `<@${userShow ? userShow.id : interaction.user.id}> has ${
                       data.Points
                     } reputation points.`
                   );
                 return interaction.reply({ embeds: [repEmbed] });
               }
             }else if(!data) {
               return interaction.reply({content: "There is no data of this user."})
             }
           }).clone()
        }
      }
      break;

      case "reset": {
        switch (options.getString("confirmation")) {
          case "yes":{
            await DB.deleteMany({ GuildId: guild.id });
            return interaction.reply({content: "Your guild's reputation database has been reset."});
          }   
          case "no":{
              await interaction.reply({content: "Reset process terminated."});
          }
        }
      }
      break;
    }
  }
}