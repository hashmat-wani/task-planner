import Joi from "joi";
import { Sprint } from "../models/index.js";
import { createSlug } from "../utils/createSlug.js";

export const sprintController = {
  async getAllSprints(req, res, next) {
    try {
      const { _id: userId } = req?.user;
      const sprints = await Sprint.find({ user: userId });
      res.status(200).json({ status: "success", data: sprints });
    } catch (err) {
      next(err);
    }
  },

  async addSprint(req, res, next) {
    try {
      const { _id } = req?.user;
      const { name } = req?.body;
      // validation
      const validationSchema = Joi.object({
        name: Joi.string().required(),
      });

      const { error } = validationSchema.validate({ name });

      if (error) {
        return next(error);
      }

      await Sprint.create({
        name,
        slug: createSlug(name),
        user: _id,
      });
      return res
        .status(201)
        .json({ status: "success", message: "Sprint created" });
    } catch (err) {
      return next(err);
    }
  },
};
