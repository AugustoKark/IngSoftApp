import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../alquiler.test-samples';

import { AlquilerFormService } from './alquiler-form.service';

describe('Alquiler Form Service', () => {
  let service: AlquilerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlquilerFormService);
  });

  describe('Service methods', () => {
    describe('createAlquilerFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlquilerFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dias: expect.any(Object),
            precioFinal: expect.any(Object),
            auto: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });

      it('passing IAlquiler should create a new form with FormGroup', () => {
        const formGroup = service.createAlquilerFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dias: expect.any(Object),
            precioFinal: expect.any(Object),
            auto: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });
    });

    describe('getAlquiler', () => {
      it('should return NewAlquiler for default Alquiler initial value', () => {
        const formGroup = service.createAlquilerFormGroup(sampleWithNewData);

        const alquiler = service.getAlquiler(formGroup) as any;

        expect(alquiler).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlquiler for empty Alquiler initial value', () => {
        const formGroup = service.createAlquilerFormGroup();

        const alquiler = service.getAlquiler(formGroup) as any;

        expect(alquiler).toMatchObject({});
      });

      it('should return IAlquiler', () => {
        const formGroup = service.createAlquilerFormGroup(sampleWithRequiredData);

        const alquiler = service.getAlquiler(formGroup) as any;

        expect(alquiler).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlquiler should not enable id FormControl', () => {
        const formGroup = service.createAlquilerFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlquiler should disable id FormControl', () => {
        const formGroup = service.createAlquilerFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
