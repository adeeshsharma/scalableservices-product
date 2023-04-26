const mongoose = require('mongoose');

const connect = () => {
  mongoose.set('strictQuery', true);

  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('mongdb is connected to Products collection');
    }
  );
};

module.exports = connect;
