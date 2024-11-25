import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAuto } from '../auto.model';
import { AutoService } from '../service/auto.service';
import { AutoFormGroup, AutoFormService } from './auto-form.service';

@Component({
  standalone: true,
  selector: 'jhi-auto-update',
  templateUrl: './auto-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AutoUpdateComponent implements OnInit {
  isSaving = false;
  auto: IAuto | null = null;

  protected autoService = inject(AutoService);
  protected autoFormService = inject(AutoFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AutoFormGroup = this.autoFormService.createAutoFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ auto }) => {
      this.auto = auto;
      if (auto) {
        this.updateForm(auto);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const auto = this.autoFormService.getAuto(this.editForm);
    if (auto.id !== null) {
      this.subscribeToSaveResponse(this.autoService.update(auto));
    } else {
      this.subscribeToSaveResponse(this.autoService.create(auto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuto>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(auto: IAuto): void {
    this.auto = auto;
    this.autoFormService.resetForm(this.editForm, auto);
  }
}
