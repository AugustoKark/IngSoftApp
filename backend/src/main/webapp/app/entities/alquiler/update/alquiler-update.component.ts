import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAuto } from 'app/entities/auto/auto.model';
import { AutoService } from 'app/entities/auto/service/auto.service';
import { IAlquiler } from '../alquiler.model';
import { AlquilerService } from '../service/alquiler.service';
import { AlquilerFormGroup, AlquilerFormService } from './alquiler-form.service';

@Component({
  standalone: true,
  selector: 'jhi-alquiler-update',
  templateUrl: './alquiler-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AlquilerUpdateComponent implements OnInit {
  isSaving = false;
  alquiler: IAlquiler | null = null;

  autosSharedCollection: IAuto[] = [];

  protected alquilerService = inject(AlquilerService);
  protected alquilerFormService = inject(AlquilerFormService);
  protected autoService = inject(AutoService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AlquilerFormGroup = this.alquilerFormService.createAlquilerFormGroup();

  compareAuto = (o1: IAuto | null, o2: IAuto | null): boolean => this.autoService.compareAuto(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alquiler }) => {
      this.alquiler = alquiler;
      if (alquiler) {
        this.updateForm(alquiler);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alquiler = this.alquilerFormService.getAlquiler(this.editForm);
    if (alquiler.id !== null) {
      this.subscribeToSaveResponse(this.alquilerService.update(alquiler));
    } else {
      this.subscribeToSaveResponse(this.alquilerService.create(alquiler));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlquiler>>): void {
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

  protected updateForm(alquiler: IAlquiler): void {
    this.alquiler = alquiler;
    this.alquilerFormService.resetForm(this.editForm, alquiler);

    this.autosSharedCollection = this.autoService.addAutoToCollectionIfMissing<IAuto>(this.autosSharedCollection, alquiler.auto);
  }

  protected loadRelationshipsOptions(): void {
    this.autoService
      .query()
      .pipe(map((res: HttpResponse<IAuto[]>) => res.body ?? []))
      .pipe(map((autos: IAuto[]) => this.autoService.addAutoToCollectionIfMissing<IAuto>(autos, this.alquiler?.auto)))
      .subscribe((autos: IAuto[]) => (this.autosSharedCollection = autos));
  }
}
