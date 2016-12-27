export function getMiddleSortOrder(firstIndex, secondIndex) {
    const difference = secondIndex - firstIndex;
    const middle = parseInt((difference / 2), 10);
    return firstIndex + middle;
}