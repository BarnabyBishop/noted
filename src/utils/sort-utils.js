const defaultGap = 100;
export function getMiddleSortOrder(firstIndex, secondIndex) {
    if (!firstIndex && !secondIndex) {
        return 0;
    }
    if (!firstIndex) {
        return secondIndex - defaultGap;
    }
    if (!secondIndex) {
        return firstIndex + defaultGap;
    }
    const difference = secondIndex - firstIndex;
    const middle = parseInt(difference / 2, 10);
    return firstIndex + middle;
}
