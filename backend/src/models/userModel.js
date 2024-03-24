import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: [true, "Email Is Already Token"],
    },
    username: {
      type: String,
      required: [true, "Please Enter Your Username"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
    },
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", userSchema);
