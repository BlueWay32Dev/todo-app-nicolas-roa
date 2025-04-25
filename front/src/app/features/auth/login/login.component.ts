import {Component, inject, ViewEncapsulation} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, MatInputModule, MatButtonModule, MatProgressSpinner, MatCard],
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  }) as FormGroup<{
    email: FormControl<string>;
  }>;

  loading = false;
}
