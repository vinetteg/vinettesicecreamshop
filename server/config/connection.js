const mongoose = require("mongoose");

mongoose.connect(
<<<<<<< HEAD
<<<<<<< HEAD
  process.env.MONGODB_URI || "mongodb://localhost/mernshopping",
=======
  process.env.MONGODB_URI || "mongodb://localhost/safe-island-11025",
>>>>>>> eaef5c883d8985df4f8a132ad7bb36a41c434719
=======
  process.env.MONGODB_URI || "mongodb://localhost/safe-island-11025",
>>>>>>> cc28eee88a992809cd5fdf9c60cd5c1848ff7063
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
