const User = require('../models/user');

exports.getUserByUsername = (username) => {
    return User.findOne({username});
};

exports.createUser = (user) => {
    return User.create( {...user} );
};
