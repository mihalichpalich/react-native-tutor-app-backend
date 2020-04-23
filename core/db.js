const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://miklasfafara:7455718@tutor-2dmoq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(function (err) {
    throw Error(err);
});
