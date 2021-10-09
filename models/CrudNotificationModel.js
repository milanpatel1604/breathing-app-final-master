const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId;

const CrudNotiSchema=new Schema({
    user_id: {
        type: ObjectId,
        required: [true, "Please provide user_id for user preference"],
    },
    notification_id: {
        type: [ObjectId]
    },
    message: {
        type: [String]
    },
    related_to:{
        type: [String]
    },
    shown: {
        type: [Boolean],
    },
    date: {
        type: [String]
    },
});


const CrudNotify = mongoose.model("CrudNotify", CrudNotiSchema);
module.exports = CrudNotify;