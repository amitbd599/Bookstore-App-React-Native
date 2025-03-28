import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
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

// Checking if entered password matches the hashed password in the database

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
