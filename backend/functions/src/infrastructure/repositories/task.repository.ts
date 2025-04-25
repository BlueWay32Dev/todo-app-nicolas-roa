import { TaskRepository } from "../../domain/interfaces/task.repository";
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDto } from "../../domain/dtos/create-task.dto";
import { db } from "../../infrastructure/firebase/firestore.config";

export class FirestoreTaskRepository implements TaskRepository {
    private collection = db.collection('tasks');


    async create(taskData: CreateTaskDto): Promise<Task> {
        const docRef = await this.collection.add({
            ...taskData,
            createdAt: new Date(),
        });

        const doc = await docRef.get();
        const data = doc.data();

        if(!data){
            throw new Error('No se pudo crear la tarea.');
        }

        return new Task(
            doc.id,
            data.userId,
            data.title,
            data.description,
            data.completed,
            data.createdAt.toDate()
        );

    }
}