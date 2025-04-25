import { Routes } from '@angular/router';
import {LoginComponent} from "@features/auth/login/login.component";
import {TaskFormComponent} from "@features/tasks/task-form.component";
import {authGuard} from "@core/guards/auth.guard";
import {noAuthGuard} from "@core/guards/no-auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate:[noAuthGuard]
  },
  {
    path: 'tasks',
    loadComponent: () => import('@features/tasks/task-form.component').then(m => m.TaskFormComponent),
    canActivate: [authGuard],
    pathMatch: 'full'
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
