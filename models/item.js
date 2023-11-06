import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    title: String,
    description: String,
    categoryId: mongoose.Schema.Types.ObjectId
  },
  {
    timestamps: true,
  }
);

itemSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = mongoose.Types.ObjectId();
  }
  next();
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;
