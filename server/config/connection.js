const mongoose = require("mongoose");

mongoose.connect(
<<<<<<< HEAD
  process.env.MONGODB_URI || "mongodb://localhost/mernshopping",
=======
  process.env.MONGODB_URI || "mongodb://localhost/safe-island-11025",
>>>>>>> eaef5c883d8985df4f8a132ad7bb36a41c434719
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
