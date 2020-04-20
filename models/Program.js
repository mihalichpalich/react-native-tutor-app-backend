const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProgramSchema = new Schema(
    {
        id: String,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        user: {type: Schema.Types.ObjectId, ref: "User"}
    },
    {
        timestamps: true
    }
);

const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;