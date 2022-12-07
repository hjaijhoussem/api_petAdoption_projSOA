const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const PetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }, 
    adress: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Pet', PetSchema);




