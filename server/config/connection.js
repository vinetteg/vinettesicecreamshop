const mongoose = require("mongoose");

mongoose.connect(
<<<<<<< HEAD

=======
>>>>>>> b19d89709e44ed3313682f1b0ecc5f0e5999ef76
  process.env.MONGODB_URI || "mongodb://localhost/mernshopping",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
