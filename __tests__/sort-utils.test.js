import { getMiddleSortOrder } from '../src/utils/sort-utils'; 

test('sort is in range 100-200', () => {
    const firstIndex = 100;
    const secondIndex = 200;
    const sortIndex = expect(getMiddleSortOrder(firstIndex, secondIndex));
    sortIndex.toBeGreaterThan(firstIndex);
    sortIndex.toBeLessThan(secondIndex);
});

test('sort is in range 10-20', () => {
    const firstIndex = 10;
    const secondIndex = 20;
    const sortIndex = expect(getMiddleSortOrder(firstIndex, secondIndex));
    sortIndex.toBeGreaterThan(firstIndex);
    sortIndex.toBeLessThan(secondIndex);
});

test('sort is in range 0-10', () => {
    const firstIndex = 0;
    const secondIndex = 10;
    const sortIndex = expect(getMiddleSortOrder(firstIndex, secondIndex));
    sortIndex.toBeGreaterThan(firstIndex);
    sortIndex.toBeLessThan(secondIndex);
});

test('sort is in range 1-2', () => {
    const firstIndex = 1;
    const secondIndex = 2;
    const sortIndex = expect(getMiddleSortOrder(firstIndex, secondIndex));
    sortIndex.toBeGreaterThanOrEqual(firstIndex);
    sortIndex.toBeLessThan(secondIndex);
});

test('sort is in range 0-1', () => {
    const firstIndex = 0;
    const secondIndex = 1;
    const sortIndex = expect(getMiddleSortOrder(firstIndex, secondIndex));
    sortIndex.toBeGreaterThanOrEqual(firstIndex);
    sortIndex.toBeLessThan(secondIndex);
});

test('sort is in range 0-2', () => {
    const firstIndex = 0;
    const secondIndex = 2;
    const sortIndex = expect(getMiddleSortOrder(firstIndex, secondIndex));
    sortIndex.toBeGreaterThanOrEqual(firstIndex);
    sortIndex.toBeLessThan(secondIndex);
});

test('sort is in range 100-101', () => {
    const firstIndex = 100;
    const secondIndex = 101;
    const sortIndex = expect(getMiddleSortOrder(firstIndex, secondIndex));
    sortIndex.toBeGreaterThanOrEqual(firstIndex);
    sortIndex.toBeLessThan(secondIndex);
});

test('sort is in range 1000-2000', () => {
    const firstIndex = 1000;
    const secondIndex = 2000;
    const sortIndex = expect(getMiddleSortOrder(firstIndex, secondIndex));
    sortIndex.toBeGreaterThanOrEqual(firstIndex);
    sortIndex.toBeLessThan(secondIndex);
});