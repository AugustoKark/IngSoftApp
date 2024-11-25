import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IAlquiler } from '../alquiler.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../alquiler.test-samples';

import { AlquilerService } from './alquiler.service';

const requireRestSample: IAlquiler = {
  ...sampleWithRequiredData,
};

describe('Alquiler Service', () => {
  let service: AlquilerService;
  let httpMock: HttpTestingController;
  let expectedResult: IAlquiler | IAlquiler[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AlquilerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Alquiler', () => {
      const alquiler = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(alquiler).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Alquiler', () => {
      const alquiler = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(alquiler).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Alquiler', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Alquiler', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Alquiler', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAlquilerToCollectionIfMissing', () => {
      it('should add a Alquiler to an empty array', () => {
        const alquiler: IAlquiler = sampleWithRequiredData;
        expectedResult = service.addAlquilerToCollectionIfMissing([], alquiler);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alquiler);
      });

      it('should not add a Alquiler to an array that contains it', () => {
        const alquiler: IAlquiler = sampleWithRequiredData;
        const alquilerCollection: IAlquiler[] = [
          {
            ...alquiler,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAlquilerToCollectionIfMissing(alquilerCollection, alquiler);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Alquiler to an array that doesn't contain it", () => {
        const alquiler: IAlquiler = sampleWithRequiredData;
        const alquilerCollection: IAlquiler[] = [sampleWithPartialData];
        expectedResult = service.addAlquilerToCollectionIfMissing(alquilerCollection, alquiler);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alquiler);
      });

      it('should add only unique Alquiler to an array', () => {
        const alquilerArray: IAlquiler[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const alquilerCollection: IAlquiler[] = [sampleWithRequiredData];
        expectedResult = service.addAlquilerToCollectionIfMissing(alquilerCollection, ...alquilerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const alquiler: IAlquiler = sampleWithRequiredData;
        const alquiler2: IAlquiler = sampleWithPartialData;
        expectedResult = service.addAlquilerToCollectionIfMissing([], alquiler, alquiler2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alquiler);
        expect(expectedResult).toContain(alquiler2);
      });

      it('should accept null and undefined values', () => {
        const alquiler: IAlquiler = sampleWithRequiredData;
        expectedResult = service.addAlquilerToCollectionIfMissing([], null, alquiler, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alquiler);
      });

      it('should return initial array if no Alquiler is added', () => {
        const alquilerCollection: IAlquiler[] = [sampleWithRequiredData];
        expectedResult = service.addAlquilerToCollectionIfMissing(alquilerCollection, undefined, null);
        expect(expectedResult).toEqual(alquilerCollection);
      });
    });

    describe('compareAlquiler', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAlquiler(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAlquiler(entity1, entity2);
        const compareResult2 = service.compareAlquiler(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAlquiler(entity1, entity2);
        const compareResult2 = service.compareAlquiler(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAlquiler(entity1, entity2);
        const compareResult2 = service.compareAlquiler(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
