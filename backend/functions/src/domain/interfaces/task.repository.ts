import { Task } from "../entities/task.entity";
import {CreateTaskDto} from "../dtos/create-task.dto";

export interface TaskRepository {
    create(task: CreateTaskDto): Promise<Task>;
}