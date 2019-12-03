var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Setup schema
var userSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: String,
    status: {
        type: String
    },
    avatar: String,
    role: {
        type: String,
        required: true
    }

});

const User = mongoose.model('User', userSchema);

module.exports = {

    save: (entity, passHash) => {    
            
        var user = new User({
            email : entity.email,
            password: passHash,
            fullName: entity.fullName,
            role: entity.role
        });
        
        return user.save();    
    },

    findOneEmail: (email) => {
        return User.findOne({email: email}).exec();
    },

    findById: (id) => {
        return User.findById({_id:id}).exec();
    },

    findOneFacebookID: (facebookID) => {
        return User.findOne({facebookID: facebookID}).exec();
    },

    saveAccountFacebook: (entity) => {    
            
        var user = new User({
            email : entity.email,
            password: entity.password,
            fullName: entity.fullName,
            facebookID: entity.facebookID
        });
        
        return user.save();    
    },
}


