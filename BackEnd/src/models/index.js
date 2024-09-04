const mongoose = require('mongoose');
const { MONGO_URI } = require('../configs');

mongoose.connect(MONGO_URI, { autoIndex: false });

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error.', ${MONGO_URI}`, {
    ctx: 'MongoDB',
    stack: err.stack,
  });
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB: ${MONGO_URI}`, { ctx: 'MongoDB' });
});
