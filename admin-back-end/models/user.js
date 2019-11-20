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
    facebookID: String
    // gender: String,
    // phone: String,
    // create_date: {
    //     type: Date,
    //     default: Date.now
    // },

});

const User = mongoose.model('User', userSchema);

module.exports = {

    save: (entity, passHash) => {    
            
        var user = new User({
            email : entity.email,
            password: passHash,
            fullName: entity.fullName,
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


