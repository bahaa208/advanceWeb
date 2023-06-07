const mongoose = require('mongoose');
const url = 'mongodb+srv://bahaa2000:Iu9lRjO71MbJ67mA@data.jjm3s7p.mongodb.net/mydatabase?retryWrites=true&w=majority';
//const usl2 = 'mongodb+srv://bahaa2000:rEF6giBWvpbtQIEi@data.jjm3s7p.mongodb.net/?retryWrites=true&w=majority';
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove the following options as they are no longer supported
      // useFindAndModify: false,
      // useCreateIndex: true
    });

    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

mongoose.set('strictQuery', false);

module.exports = connectDB;
