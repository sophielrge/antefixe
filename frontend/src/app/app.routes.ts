import { Routes } from '@angular/router';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';
import { ConstructionListComponent } from './construction/construction-list/construction-list.component';

export const routes: Routes = [
  { path: 'workers-list', component: WorkerListComponent },
  { path: 'constructions-list', component: ConstructionListComponent },
  { path: '', redirectTo: 'workers-list', pathMatch: 'full' }
];
