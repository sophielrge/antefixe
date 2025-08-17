
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Worker } from '../../../models/types';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { WorkerFormComponent } from '../worker-form/worker-form.component';


@Component({
  selector: 'app-worker-list',
  imports: [
    TranslateModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzDropDownModule,
    NzMenuModule,
    CommonModule
  ],
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent {

  constructor(private modal: NzModalService, private translateService: TranslateService) {}

  workers: Worker[] = [
    { id: 1, firstName: 'Alice', lastName:'Dupont', job: 'couvreur', age: 18 },
    { id: 2, firstName: 'Bob', lastName:'Martin', job: 'maçon', age: 25 },
  ];

  openWorkerForm(worker?: Worker) {
    this.modal.create({
      nzTitle: worker ? this.translateService.instant('actions.edit') : this.translateService.instant('actions.add'),
      nzContent: WorkerFormComponent,
      nzData: {
        worker: worker
      },
      nzFooter: null,
      nzWidth: 600
    });
  }

  deleteWorker(worker: Worker) {
    this.workers = this.workers.filter(w => w.id !== worker.id);
  }

  viewWorker(worker: Worker) {}

  editWorker(worker: Worker) {}

}
