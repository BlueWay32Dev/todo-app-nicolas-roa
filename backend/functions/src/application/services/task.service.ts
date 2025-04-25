import { CreateTaskDto } from "../../domain/dtos/create-task.dto";
import { TaskRepository } from "../../domain/interfaces/task.repository";
import { Task } from "../../domain/entities/task.entity";

export class TaskService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async createTask(data: CreateTaskDto):Promise<Task>{
        return this.taskRepository.create(data);
    }
}