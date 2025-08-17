import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-worker-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    TranslatePipe,
  ],
  templateUrl: './worker-form.component.html',
  styleUrl: './worker-form.component.scss'
})
export class WorkerFormComponent {
  @Input() worker: any;
  workerForm!: FormGroup;

  constructor(private modal: NzModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.workerForm = this.fb.group({
      lastName: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      job: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.min(18)]],
      email: [null, [Validators.email]]
    });
  }

  submitForm(): void {
    if (this.workerForm.valid) {
      console.log(this.workerForm.value);
      this.modal.destroy(this.workerForm.value);
    }
  }

  cancel() {
    this.modal.destroy();
  }
}
