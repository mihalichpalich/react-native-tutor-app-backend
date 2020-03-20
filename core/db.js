const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tutor', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(function (err) {
    throw Error(err);
});
