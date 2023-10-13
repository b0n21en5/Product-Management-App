import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";
import { handleError } from "../helpers/handleError.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .send({ success: false, message: "Username required!" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email required!" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ success: false, message: "Password required!" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(404)
        .send({ success: false, message: "Email already used!" });
    }

    await new UserModel({ username, email, password: hashedPassword }).save();

    return res
      .status(200)
      .send({ success: true, message: `User ${username} Registered` });
  } catch (error) {
    handleError(res, error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "No User Found!" });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid Password!" });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .send({ user: { username: user.username, email: user.email }, token });
  } catch (error) {
    handleError(res, error);
  }
};
