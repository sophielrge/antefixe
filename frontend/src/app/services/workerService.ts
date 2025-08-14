import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkerService {
  private apiUrl = '/api/workers';

  constructor(private http: HttpClient) {}

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(this.apiUrl);
  }

  getWorker(id: number): Observable<Worker> {
    return this.http.get<Worker>(`${this.apiUrl}/${id}`);
  }

  addWorker(worker: Omit<Worker, 'id'>): Observable<Worker> {
    return this.http.post<Worker>(this.apiUrl, worker);
  }
}