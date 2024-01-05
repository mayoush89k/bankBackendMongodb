import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    accountNumber:{
      type: Number,
    },
    cash: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account" , accountSchema)

export default Account