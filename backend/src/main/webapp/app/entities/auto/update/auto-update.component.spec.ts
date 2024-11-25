import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { AutoService } from '../service/auto.service';
import { IAuto } from '../auto.model';
import { AutoFormService } from './auto-form.service';

import { AutoUpdateComponent } from './auto-update.component';

describe('Auto Management Update Component', () => {
  let comp: AutoUpdateComponent;
  let fixture: ComponentFixture<AutoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let autoFormService: AutoFormService;
  let autoService: AutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AutoUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AutoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AutoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    autoFormService = TestBed.inject(AutoFormService);
    autoService = TestBed.inject(AutoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const auto: IAuto = { id: 456 };

      activatedRoute.data = of({ auto });
      comp.ngOnInit();

      expect(comp.auto).toEqual(auto);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAuto>>();
      const auto = { id: 123 };
      jest.spyOn(autoFormService, 'getAuto').mockReturnValue(auto);
      jest.spyOn(autoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ auto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: auto }));
      saveSubject.complete();

      // THEN
      expect(autoFormService.getAuto).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(autoService.update).toHaveBeenCalledWith(expect.objectContaining(auto));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAuto>>();
      const auto = { id: 123 };
      jest.spyOn(autoFormService, 'getAuto').mockReturnValue({ id: null });
      jest.spyOn(autoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ auto: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: auto }));
      saveSubject.complete();

      // THEN
      expect(autoFormService.getAuto).toHaveBeenCalled();
      expect(autoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAuto>>();
      const auto = { id: 123 };
      jest.spyOn(autoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ auto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(autoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
