const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId;

const UserPreferencesSchema=new Schema({
    user_id: {
        type: ObjectId,
    },
    default_app_language: {
        type: String,
        default: 'english'
    },
    dark_mode: {
        type: Boolean,
        default: false
    },
    notifications_active: {
        type: Boolean,
        default: true
    },
    DND_active: {
        type: Boolean,
        default: false
    }
});


const UserPreference = mongoose.model("UserPreference", UserPreferencesSchema);
module.exports = UserPreference;