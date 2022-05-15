const { model, Schema } = require('mongoose')

module.exports = model("Repuatation", new Schema({
    GuildId: String,
    UserId: String,
    Points: {type: Number, default: 0}
}))
