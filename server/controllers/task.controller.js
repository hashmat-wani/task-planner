import { Task } from "../models/index.js";

export const taskController = {
  async getSprintTasks(req, res, next) {
    const { sprintId } = req?.params;
    const { userId } = req?.query;
    try {
      const todo = await Task.find({
        sprint: sprintId,
        ...(userId && { assignees: userId }),
        status: "to-do",
      }).populate("assignees", ["firstName", "lastName", "avatar", "_id"]);

      const inProgress = await Task.find({
        sprint: sprintId,
        ...(userId && { assignees: userId }),
        status: "in-progress",
      }).populate("assignees", ["firstName", "lastName", "avatar", "_id"]);

      const done = await Task.find({
        sprint: sprintId,
        ...(userId && { assignees: userId }),
        status: "done",
      }).populate("assignees", ["firstName", "lastName", "avatar", "_id"]);

      res.status(200).json({
        status: "success",
        data: { todo, inProgress, done },
      });
    } catch (err) {
      next(err);
    }
  },

  async addTask(req, res, next) {
    try {
      await Task.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Added Successfully",
      });
    } catch (err) {
      next(err);
    }
  },
  async editTask(req, res, next) {
    try {
      const { id } = req?.params;
      await Task.findByIdAndUpdate(id, req.body);
      return res.status(201).json({
        success: true,
        message: "Edited Successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteTask(req, res, next) {
    try {
      const { id } = req?.params;
      await Task.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      return next(err);
    }
  },
};
