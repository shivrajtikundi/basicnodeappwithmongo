const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Replace 'mongodb-service' and 'your-database-name' with your actual values
//const mongoURI = 'mongodb://mongodb-service:27017/your-database-name';

const mongoURI = 'mongodb://mongodb-service:27017/admin';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');

  // Define a Mongoose schema for your data
  const dataSchema = new mongoose.Schema({
    name: String,
  });

  // Create a Mongoose model based on the schema
  const Data = mongoose.model('Data', dataSchema);

  app.use(bodyParser.urlencoded({ extended: true }));

  // Serve insertname.html from the project folder
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/insertname.html');
  });

  // Define a route to handle the form submission
  app.post('/submit', async (req, res) => {
    const userName = req.body.name;

    if (!userName) {
      return res.status(400).send('Please provide a name.');
    }

    try {
      const newData = new Data({ name: userName });
      await newData.save();
      console.log('Data saved successfully');
      res.send('Data saved successfully. Thank you, ' + userName + '!');
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
    }
  });

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});

