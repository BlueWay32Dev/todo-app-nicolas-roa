import { Request, Response } from 'express';
import {FirestoreTaskRepository} from "../../infrastructure/repositories/task.repository";
import {TaskService} from "../../application/services/task.service";
import {CreateTaskDto} from "../../domain/dtos/create-task.dto";
import {getUserIdFromRequest} from "../../shared/jwt";

const taskRepo = new FirestoreTaskRepository();
const taskService = new TaskService(taskRepo);

export const createTaskHandler = async (request: Request, response: Response) => {
    try{
        const userId = getUserIdFromRequest(request);
        const { title, description, completed } = request.body as CreateTaskDto;

        if(!userId || !title || !description) {
            console.log(request.body as CreateTaskDto)
            return response.status(400).json({ message: 'Todo los campos son requeridos.' });
        }
        const task = await taskService.createTask({ userId, title, description, completed });

        return response.status(201).json(task);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error interno al crear la tarea.' });
    }
}