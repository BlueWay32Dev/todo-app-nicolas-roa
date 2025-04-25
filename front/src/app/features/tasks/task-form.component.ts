import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {Router} from "@angular/router";
import {AuthService} from "@core/services/auth.service";

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
  private router = inject(Router);

  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    completed: [false]
  }) as FormGroup<{
    title: FormControl<string>,
    description: FormControl<string>,
    completed: FormControl<boolean>
  }>;

  loading = false;

  onSubmit(): void {
    if(this.form.invalid) return;
    try{
      console.log('Tarea enviada:', this.form.value);
    }catch (error){
      console.error('Error al enviar la tarea: ', error);
    } finally {
      this.loading = false;
    }
  }

  goToLogin(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
