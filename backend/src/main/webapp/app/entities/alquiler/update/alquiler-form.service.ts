import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAlquiler, NewAlquiler } from '../alquiler.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlquiler for edit and NewAlquilerFormGroupInput for create.
 */
type AlquilerFormGroupInput = IAlquiler | PartialWithRequiredKeyOf<NewAlquiler>;

type AlquilerFormDefaults = Pick<NewAlquiler, 'id'>;

type AlquilerFormGroupContent = {
  id: FormControl<IAlquiler['id'] | NewAlquiler['id']>;
  dias: FormControl<IAlquiler['dias']>;
  precioFinal: FormControl<IAlquiler['precioFinal']>;
  auto: FormControl<IAlquiler['auto']>;
};

export type AlquilerFormGroup = FormGroup<AlquilerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlquilerFormService {
  createAlquilerFormGroup(alquiler: AlquilerFormGroupInput = { id: null }): AlquilerFormGroup {
    const alquilerRawValue = {
      ...this.getFormDefaults(),
      ...alquiler,
    };
    return new FormGroup<AlquilerFormGroupContent>({
      id: new FormControl(
        { value: alquilerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dias: new FormControl(alquilerRawValue.dias, {
        validators: [Validators.required],
      }),
      precioFinal: new FormControl(alquilerRawValue.precioFinal, {
        validators: [Validators.required],
      }),
      auto: new FormControl(alquilerRawValue.auto),
    });
  }

  getAlquiler(form: AlquilerFormGroup): IAlquiler | NewAlquiler {
    return form.getRawValue() as IAlquiler | NewAlquiler;
  }

  resetForm(form: AlquilerFormGroup, alquiler: AlquilerFormGroupInput): void {
    const alquilerRawValue = { ...this.getFormDefaults(), ...alquiler };
    form.reset(
      {
        ...alquilerRawValue,
        id: { value: alquilerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AlquilerFormDefaults {
    return {
      id: null,
    };
  }
}
