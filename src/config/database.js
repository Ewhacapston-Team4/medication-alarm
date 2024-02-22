const mongoose = require('mongoose');

const databaseConfig = {
  connectToDatabase: () => {
    mongoose.connect('mongodb://localhost:27017/your_database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to the database');
    });
  },
};

module.exports = databaseConfig;
