import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { CreateTaskDto } from '@core/models/create-task.dto';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('debería crear una tarea correctamente', async () => {
    localStorage.setItem('access-token', 'fake-token');

    const mockTask: CreateTaskDto = {
      title: 'Nueva tarea',
      description: 'Descripción de tarea',
      completed: false
    };

    const promise = service.createTask(mockTask);
    const req = httpMock.expectOne((request) => request.url.includes('/tasks'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTask);
    req.flush({});

    expect(await promise).toEqual({});
  });
});
