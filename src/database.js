import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/apirest-1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
})
    .then(db => console.log('Db is connected'))
    .catch(error=> console.log(error));