import {Router} from "express";
import {createTaskHandler, getTasksHandler} from "../controllers/task.controller";

export const taskRoutes = Router();

taskRoutes.post('/', createTaskHandler);
taskRoutes.get('/', getTasksHandler);
