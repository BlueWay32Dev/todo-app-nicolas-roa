import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "@environments/environment";
import {CreateTaskDto} from "@core/models/create-task.dto";
import {AuthService} from "@core/services/auth/auth.service";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly authService = inject(AuthService);

  createTask(taskData: CreateTaskDto) {
      return firstValueFrom(
        this.http.post(`${this.apiUrl}/tasks/`, taskData, {
        headers: this.authService.getAuthHeaders()
      })
    );
  }
}
