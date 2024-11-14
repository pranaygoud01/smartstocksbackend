import { Router } from "express";
import bcrypt from "bcrypt";
import { UserModel, validate } from "../models/users.model.mjs";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await UserModel.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email is already exist" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new UserModel({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User Created Sucessfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
export default router;
