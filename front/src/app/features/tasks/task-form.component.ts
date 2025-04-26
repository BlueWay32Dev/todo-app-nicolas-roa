import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {Router} from "@angular/router";
import {AuthService} from "@core/services/auth/auth.service";
import {CreateTaskDto} from "@core/models/create-task.dto";
import {TaskService} from "@core/services/task/task.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatCard],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private taskService = inject(TaskService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    completed: [false]
  }) as FormGroup<{
    title: FormControl<CreateTaskDto['title']>,
    description: FormControl<CreateTaskDto['description']>,
    completed: FormControl<CreateTaskDto['completed']>
  }>;

  async onSubmit(): Promise<void> {
    if(this.form.invalid) return;
    try{
      await this.taskService.createTask(this.form.value);
      this.snackBar.open('Tarea creada correctamente.','Cerrar',{duration: 3000});
      this.form.reset({ completed: false });
    }catch (error){
      console.error('Error al enviar la tarea: ', error);
      this.snackBar.open('Error al crear la tarea. Intente nuevamente..','Cerrar',{duration: 3000});
    }
  }

  goToLogin(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
