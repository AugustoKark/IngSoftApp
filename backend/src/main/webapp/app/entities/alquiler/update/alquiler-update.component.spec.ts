import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAuto } from 'app/entities/auto/auto.model';
import { AutoService } from 'app/entities/auto/service/auto.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IAlquiler } from '../alquiler.model';
import { AlquilerService } from '../service/alquiler.service';
import { AlquilerFormService } from './alquiler-form.service';

import { AlquilerUpdateComponent } from './alquiler-update.component';

describe('Alquiler Management Update Component', () => {
  let comp: AlquilerUpdateComponent;
  let fixture: ComponentFixture<AlquilerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alquilerFormService: AlquilerFormService;
  let alquilerService: AlquilerService;
  let autoService: AutoService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlquilerUpdateComponent],
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
      .overrideTemplate(AlquilerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlquilerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alquilerFormService = TestBed.inject(AlquilerFormService);
    alquilerService = TestBed.inject(AlquilerService);
    autoService = TestBed.inject(AutoService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Auto query and add missing value', () => {
      const alquiler: IAlquiler = { id: 456 };
      const auto: IAuto = { id: 13383 };
      alquiler.auto = auto;

      const autoCollection: IAuto[] = [{ id: 2059 }];
      jest.spyOn(autoService, 'query').mockReturnValue(of(new HttpResponse({ body: autoCollection })));
      const additionalAutos = [auto];
      const expectedCollection: IAuto[] = [...additionalAutos, ...autoCollection];
      jest.spyOn(autoService, 'addAutoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alquiler });
      comp.ngOnInit();

      expect(autoService.query).toHaveBeenCalled();
      expect(autoService.addAutoToCollectionIfMissing).toHaveBeenCalledWith(
        autoCollection,
        ...additionalAutos.map(expect.objectContaining),
      );
      expect(comp.autosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const alquiler: IAlquiler = { id: 456 };
      const user: IUser = { id: 15931 };
      alquiler.user = user;

      const userCollection: IUser[] = [{ id: 29519 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alquiler });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const alquiler: IAlquiler = { id: 456 };
      const auto: IAuto = { id: 6616 };
      alquiler.auto = auto;
      const user: IUser = { id: 14172 };
      alquiler.user = user;

      activatedRoute.data = of({ alquiler });
      comp.ngOnInit();

      expect(comp.autosSharedCollection).toContain(auto);
      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.alquiler).toEqual(alquiler);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlquiler>>();
      const alquiler = { id: 123 };
      jest.spyOn(alquilerFormService, 'getAlquiler').mockReturnValue(alquiler);
      jest.spyOn(alquilerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alquiler });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alquiler }));
      saveSubject.complete();

      // THEN
      expect(alquilerFormService.getAlquiler).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(alquilerService.update).toHaveBeenCalledWith(expect.objectContaining(alquiler));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlquiler>>();
      const alquiler = { id: 123 };
      jest.spyOn(alquilerFormService, 'getAlquiler').mockReturnValue({ id: null });
      jest.spyOn(alquilerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alquiler: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alquiler }));
      saveSubject.complete();

      // THEN
      expect(alquilerFormService.getAlquiler).toHaveBeenCalled();
      expect(alquilerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlquiler>>();
      const alquiler = { id: 123 };
      jest.spyOn(alquilerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alquiler });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alquilerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAuto', () => {
      it('Should forward to autoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(autoService, 'compareAuto');
        comp.compareAuto(entity, entity2);
        expect(autoService.compareAuto).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
