const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "trail",
      key: "id",
    },
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
