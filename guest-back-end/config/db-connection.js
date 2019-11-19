const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin123@giasudb-m6idv.mongodb.net/test?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => console.log('Connect to db success'))
    .catch(err => console.log(err.message));