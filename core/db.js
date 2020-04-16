const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tutor', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(function (err) {
    throw Error(err);
});
