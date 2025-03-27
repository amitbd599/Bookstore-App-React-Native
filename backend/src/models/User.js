import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

// Encrypting password before saving it in the database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password hasn't changed, skip this step

  // Generate a salt and hash the password
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
