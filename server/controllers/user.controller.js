import Joi from "joi";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import { CustomErrorHandler } from "../services/index.js";

export const userController = {
  async me(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -updatedAt"
      );

      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      res.status(200).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  },

  async changePassword(req, res, next) {
    // validation
    const validationSchema = Joi.object({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    });

    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const { _id: userId } = req.user;
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(userId);
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        return next(
          CustomErrorHandler.invalidCredentials("Wrong old password!")
        );
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(userId, { password: hashedPassword });

      return res.status(201).json({
        success: true,
        message: "Password changed successfully. Please login again..!",
      });
    } catch (err) {
      return next(err);
    }
  },

  async resetPassword(req, res, next) {
    // validation
    const { newPassword } = req.body;
    const validationSchema = Joi.object({
      newPassword: Joi.string().required(),
    });

    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const reset_token = req?.cookies?.reset_token;
      if (!reset_token) {
        return next(CustomErrorHandler.unAuthorised("Invalid Link!"));
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findOneAndUpdate(
        {
          "resetToken.token": reset_token,
          "resetToken.expiresIn": { $gt: Date.now() },
        },
        { password: hashedPassword, resetToken: null },
        { new: true }
      );
      if (!user) {
        return next(CustomErrorHandler.invalidCredentials("Link has expired."));
      }

      return res
        .status(201)
        .clearCookie("reset_token", {
          sameSite: "None",
          secure: true,
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Password changed successfully..!",
        });
    } catch (err) {
      return next(err);
    }
  },
};
