import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

categorySchema.pre('save', function (next) {
  if (!this._id) {
    this._id = mongoose.Types.ObjectId();
  }
  next();
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
