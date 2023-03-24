import { Task } from "../models/index.js";

export const taskController = {
  async getSprintTasks(req, res, next) {
    const { sprintId } = req?.params;
    try {
      // const { _id: userId } = req?.user;
      const todo = await Task.find({ sprint: sprintId, status: "to-do" });
      const inProgress = await Task.find({
        sprint: sprintId,
        status: "in-progress",
      });
      const done = await Task.find({ sprint: sprintId, status: "done" });

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
};
