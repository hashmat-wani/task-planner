import Joi from "joi";
import { Sprint, Task } from "../models/index.js";
import { CustomErrorHandler } from "../services/index.js";
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

  async deleteSprint(req, res, next) {
    try {
      const { sprintId } = req?.params;
      const { _id: userId } = req.user;
      console.log(sprintId, userId);

      const sprints = await Sprint.find({ user: userId });
      if (sprints.length === 1) {
        return next(
          CustomErrorHandler.forbidden("Sorry, you can't delete all sprints")
        );
      }

      // deleting tasks related to this sprint from database
      await Task.deleteMany({ sprint: sprintId });

      // finally deleting Sprint collection
      await Sprint.findByIdAndDelete(sprintId);

      return res
        .status(200)
        .json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      return next(err);
    }
  },

  async editSprint(req, res, next) {
    try {
      const { id } = req?.params;
      const { name } = req?.body;

      const validationSchema = Joi.object({
        name: Joi.string().required(),
      });

      const { error } = validationSchema.validate({ name });

      if (error) {
        return next(error);
      }

      await Sprint.findByIdAndUpdate(id, {
        name,
        slug: createSlug(name),
      });
      return res
        .status(201)
        .json({ status: "success", message: "Edited Successfully" });
    } catch (err) {
      return next(err);
    }
  },
};
