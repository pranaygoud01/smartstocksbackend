// Import necessary modules
import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import passwordComplexity from "joi-password-complexity";

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

// Define and export UserModel
const UserModel = mongoose.model("users", UserSchema);
export { UserModel };

// Define and export validate function
const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
export { validate };
