import {Router} from "express";
import {createTaskHandler} from "../controllers/task.controller";

export const taskRoutes = Router();

taskRoutes.post('/', createTaskHandler);