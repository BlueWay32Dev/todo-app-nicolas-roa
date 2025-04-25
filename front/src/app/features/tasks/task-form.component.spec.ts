import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TaskFormComponent } from './task-form.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {AuthService} from "@core/services/auth.service";

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        TaskFormComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule
      ],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el formulario inválido si no se completa', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('debería ser válido si se completan título y descripción', () => {
    component.form.setValue({
      title: 'Título de prueba',
      description: 'Descripción de prueba',
      completed: false
    });
    expect(component.form.valid).toBeTrue();
  });

  it('debería llamar a console.log al hacer submit válido', () => {
    spyOn(console, 'log');

    component.form.setValue({
      title: 'Tarea Test',
      description: 'Detalles de tarea',
      completed: true
    });

    component.onSubmit();

    expect(console.log).toHaveBeenCalledWith('Tarea enviada:', {
      title: 'Tarea Test',
      description: 'Detalles de tarea',
      completed: true
    });
  });

  it('no debería llamar a console.log si el formulario es inválido', () => {
    spyOn(console, 'log');

    component.form.setValue({
      title: '',
      description: '',
      completed: false
    });

    component.onSubmit();

    expect(console.log).not.toHaveBeenCalled();
  });

  it('debería navegar a /login cuando se llama goToLogin()', () => {
    component.goToLogin();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
