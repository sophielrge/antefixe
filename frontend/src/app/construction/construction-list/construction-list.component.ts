import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Construction } from 'src/models/types';


@Component({
  selector: 'app-construction-list',
  imports: [
    TranslateModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzDropDownModule,
    NzMenuModule,
    CommonModule,
    DatePipe
  ],
  templateUrl: './construction-list.component.html',
  styleUrl: './construction-list.component.scss'
})
export class ConstructionListComponent {
  constructions: Construction[] = [
    { id: 1, name: 'Chantier 1', address: '123 Rue de Paris', endDate: new Date('2023-12-31') },
    { id: 2, name: 'Chantier 2', address: '456 Rue de Lyon', endDate: new Date('2024-06-30') },
  ];

  addConstruction() {
    const newId = this.constructions.length + 1;
    this.constructions.push({ id: newId, name: `Chantier ${newId}`, address: `Adresse ${newId}`, endDate: new Date() });
  }

  deleteConstruction(construction: Construction) {
    this.constructions = this.constructions.filter(c => c.id !== construction.id);
  }

  viewConstruction(construction: Construction) {}

  editConstruction(construction: Construction) {}

}