import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAuto, NewAuto } from '../auto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAuto for edit and NewAutoFormGroupInput for create.
 */
type AutoFormGroupInput = IAuto | PartialWithRequiredKeyOf<NewAuto>;

type AutoFormDefaults = Pick<NewAuto, 'id'>;

type AutoFormGroupContent = {
  id: FormControl<IAuto['id'] | NewAuto['id']>;
  modelo: FormControl<IAuto['modelo']>;
  km: FormControl<IAuto['km']>;
  hp: FormControl<IAuto['hp']>;
  transmision: FormControl<IAuto['transmision']>;
  precio: FormControl<IAuto['precio']>;
  descripcion: FormControl<IAuto['descripcion']>;
  img: FormControl<IAuto['img']>;
};

export type AutoFormGroup = FormGroup<AutoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AutoFormService {
  createAutoFormGroup(auto: AutoFormGroupInput = { id: null }): AutoFormGroup {
    const autoRawValue = {
      ...this.getFormDefaults(),
      ...auto,
    };
    return new FormGroup<AutoFormGroupContent>({
      id: new FormControl(
        { value: autoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      modelo: new FormControl(autoRawValue.modelo, {
        validators: [Validators.required],
      }),
      km: new FormControl(autoRawValue.km, {
        validators: [Validators.required],
      }),
      hp: new FormControl(autoRawValue.hp, {
        validators: [Validators.required],
      }),
      transmision: new FormControl(autoRawValue.transmision, {
        validators: [Validators.required],
      }),
      precio: new FormControl(autoRawValue.precio, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(autoRawValue.descripcion),
      img: new FormControl(autoRawValue.img),
    });
  }

  getAuto(form: AutoFormGroup): IAuto | NewAuto {
    return form.getRawValue() as IAuto | NewAuto;
  }

  resetForm(form: AutoFormGroup, auto: AutoFormGroupInput): void {
    const autoRawValue = { ...this.getFormDefaults(), ...auto };
    form.reset(
      {
        ...autoRawValue,
        id: { value: autoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AutoFormDefaults {
    return {
      id: null,
    };
  }
}
