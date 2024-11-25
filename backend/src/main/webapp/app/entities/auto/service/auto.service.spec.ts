import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IAuto } from '../auto.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../auto.test-samples';

import { AutoService } from './auto.service';

const requireRestSample: IAuto = {
  ...sampleWithRequiredData,
};

describe('Auto Service', () => {
  let service: AutoService;
  let httpMock: HttpTestingController;
  let expectedResult: IAuto | IAuto[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AutoService);
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

    it('should create a Auto', () => {
      const auto = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(auto).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Auto', () => {
      const auto = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(auto).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Auto', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Auto', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Auto', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAutoToCollectionIfMissing', () => {
      it('should add a Auto to an empty array', () => {
        const auto: IAuto = sampleWithRequiredData;
        expectedResult = service.addAutoToCollectionIfMissing([], auto);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(auto);
      });

      it('should not add a Auto to an array that contains it', () => {
        const auto: IAuto = sampleWithRequiredData;
        const autoCollection: IAuto[] = [
          {
            ...auto,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAutoToCollectionIfMissing(autoCollection, auto);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Auto to an array that doesn't contain it", () => {
        const auto: IAuto = sampleWithRequiredData;
        const autoCollection: IAuto[] = [sampleWithPartialData];
        expectedResult = service.addAutoToCollectionIfMissing(autoCollection, auto);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(auto);
      });

      it('should add only unique Auto to an array', () => {
        const autoArray: IAuto[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const autoCollection: IAuto[] = [sampleWithRequiredData];
        expectedResult = service.addAutoToCollectionIfMissing(autoCollection, ...autoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const auto: IAuto = sampleWithRequiredData;
        const auto2: IAuto = sampleWithPartialData;
        expectedResult = service.addAutoToCollectionIfMissing([], auto, auto2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(auto);
        expect(expectedResult).toContain(auto2);
      });

      it('should accept null and undefined values', () => {
        const auto: IAuto = sampleWithRequiredData;
        expectedResult = service.addAutoToCollectionIfMissing([], null, auto, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(auto);
      });

      it('should return initial array if no Auto is added', () => {
        const autoCollection: IAuto[] = [sampleWithRequiredData];
        expectedResult = service.addAutoToCollectionIfMissing(autoCollection, undefined, null);
        expect(expectedResult).toEqual(autoCollection);
      });
    });

    describe('compareAuto', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAuto(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAuto(entity1, entity2);
        const compareResult2 = service.compareAuto(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAuto(entity1, entity2);
        const compareResult2 = service.compareAuto(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAuto(entity1, entity2);
        const compareResult2 = service.compareAuto(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
