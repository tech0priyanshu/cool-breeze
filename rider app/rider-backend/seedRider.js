const mongoose = require('mongoose');
require('dotenv').config();

const Rider = require('./models/Rider');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const newRider = new Rider({
      email: 'rider1@gmail.com',
      name: 'Rider One'
    });

    await newRider.save();
    console.log('Rider created successfully!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
