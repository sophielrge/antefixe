import { Routes } from '@angular/router';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';
import { WorkerFormComponent } from './worker/worker-form/worker-form.component';
import { WorkerDetailsComponent } from './worker/worker-details/worker-details.component';
import { ConstructionListComponent } from './construction/construction-list/construction-list.component';
import { ConstructionDetailsComponent } from './construction/construction-details/construction-details.component';

export const routes: Routes = [
  { path: 'workers-list', component: WorkerListComponent },
  { path: 'worker-form', component: WorkerFormComponent },
    { path: 'worker-details', component: WorkerDetailsComponent },
    { path: 'constructions-list', component: ConstructionListComponent },
  { path: 'construction-form', component: ConstructionListComponent },
    { path: 'construction-details', component: ConstructionDetailsComponent },
  { path: '', redirectTo: 'workers-list', pathMatch: 'full' }
];
