const mongoose = require("mongoose");

mongoose.connect(
<<<<<<< HEAD
  process.env.MONGODB_URI ||
    "mongodb://localhost/calm-atoll-62332.herokuapp.com",
=======
  process.env.MONGODB_URI || "mongodb://localhost/safe-island-11025",
>>>>>>> e8118c3d560d07bf5eb07e930a7d87df7087c8b0
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
