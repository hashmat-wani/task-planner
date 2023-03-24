import { Task } from "../models/index.js";

export const taskController = {
  async getSprintTasks(req, res, next) {
    const { sprintId } = req?.params;
    try {
      // const { _id: userId } = req?.user;
      const todo = await Task.find({
        sprint: sprintId,
        status: "to-do",
      }).populate("assignees");

      const inProgress = await Task.find({
        sprint: sprintId,
        status: "in-progress",
      }).populate("assignees");

      const done = await Task.find({
        sprint: sprintId,
        status: "done",
      }).populate("assignees");

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
      console.log(req.body);
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
