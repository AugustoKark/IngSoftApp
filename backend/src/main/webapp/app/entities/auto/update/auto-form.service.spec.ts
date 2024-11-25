import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../auto.test-samples';

import { AutoFormService } from './auto-form.service';

describe('Auto Form Service', () => {
  let service: AutoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoFormService);
  });

  describe('Service methods', () => {
    describe('createAutoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAutoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            modelo: expect.any(Object),
            km: expect.any(Object),
            hp: expect.any(Object),
            transmision: expect.any(Object),
            precio: expect.any(Object),
            descripcion: expect.any(Object),
            img: expect.any(Object),
          }),
        );
      });

      it('passing IAuto should create a new form with FormGroup', () => {
        const formGroup = service.createAutoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            modelo: expect.any(Object),
            km: expect.any(Object),
            hp: expect.any(Object),
            transmision: expect.any(Object),
            precio: expect.any(Object),
            descripcion: expect.any(Object),
            img: expect.any(Object),
          }),
        );
      });
    });

    describe('getAuto', () => {
      it('should return NewAuto for default Auto initial value', () => {
        const formGroup = service.createAutoFormGroup(sampleWithNewData);

        const auto = service.getAuto(formGroup) as any;

        expect(auto).toMatchObject(sampleWithNewData);
      });

      it('should return NewAuto for empty Auto initial value', () => {
        const formGroup = service.createAutoFormGroup();

        const auto = service.getAuto(formGroup) as any;

        expect(auto).toMatchObject({});
      });

      it('should return IAuto', () => {
        const formGroup = service.createAutoFormGroup(sampleWithRequiredData);

        const auto = service.getAuto(formGroup) as any;

        expect(auto).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAuto should not enable id FormControl', () => {
        const formGroup = service.createAutoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAuto should disable id FormControl', () => {
        const formGroup = service.createAutoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
