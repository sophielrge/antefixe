
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

// Define the Worker type locally if the module is inaccessible
export interface Worker {
  id: number;
  firstName: string;
  lastName: string;
  job: string;
}

@Component({
  selector: 'app-worker-list',
  imports: [
    TranslateModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.scss'
})
export class WorkerListComponent {
workers: Worker[] = [
    { id: 1, firstName: 'Alice', lastName:'Dupont', job: 'couvreur' },
    { id: 2, firstName: 'Bob', lastName:'Martin', job: 'maçon' },
  ];

  // URL de l'image par défaut si pas de photo
  defaultPhoto: string = 'assets/images/default-worker.png';

  addWorker() {
    const newId = this.workers.length + 1;
    this.workers.push({ id: newId, firstName: `New`, lastName: `Worker ${newId}`, job: `Unknown` });
  }

  deleteWorker(worker: Worker) {
    this.workers = this.workers.filter(w => w.id !== worker.id);
  }
}
